#!/usr/bin/env python3
"""
NASA Soil Prediction App - Diagnostic & Monitoring Tool
------------------------------------------------------
Advanced diagnostic tool for troubleshooting and monitoring 
existing containers without rebuilding or removing images.
"""

import os
import sys
import subprocess
import json
import time
import psutil
import argparse
from datetime import datetime

# Configuration
CONFIG = {
    "dev_container": "soil-prediction-dev",
    "prod_container": "soil-prediction-prod",
    "dev_port": 3000,
    "prod_port": 80,
    "max_log_lines": 500,
    "health_check_timeout": 30
}

def print_header(title):
    """Print formatted header"""
    print("\n" + "="*50)
    print(f"🔧 {title}")
    print("="*50)

def check_container_status(container_name):
    """Check if container is running and healthy"""
    print_header(f"Container Status: {container_name}")
    
    cmd = f"docker inspect --format='{{\{{.State.Status}}}}|{{\{{.State.Health.Status}}}}' {container_name}"
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, check=True)
        status, health = result.stdout.strip().split('|')
        
        print(f"Status: {status.upper()}")
        print(f"Health: {health.upper()}")
        
        if status != "running" or health != "healthy":
            print(f"\n❌ Problem detected with {container_name}!")
            return False
        return True
    except subprocess.CalledProcessError:
        print(f"Container {container_name} not found or error occurred")
        return False

def analyze_logs(container_name, num_lines=100):
    """Analyze container logs for errors"""
    print_header(f"Log Analysis: {container_name}")
    
    cmd = f"docker logs --tail={num_lines} {container_name} 2>&1"
    try:
        logs = subprocess.run(cmd, shell=True, capture_output=True, text=True, check=True).stdout
        
        # Look for common error patterns
        error_patterns = [
            "error", "fail", "exception", "crash", "timeout", 
            "econnrefused", "eaddrinuse", "cannot find module"
        ]
        
        errors = []
        for line in logs.split('\n'):
            if any(pattern in line.lower() for pattern in error_patterns):
                errors.append(line)
        
        if errors:
            print("🚨 Found errors in logs:")
            for error in errors[:10]:  # Show first 10 errors
                print(f" - {error}")
        else:
            print("✅ No critical errors found in recent logs")
            
        return logs
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to retrieve logs: {e.stderr}")
        return ""

def check_resource_usage(container_name):
    """Check container resource utilization"""
    print_header(f"Resource Usage: {container_name}")
    
    try:
        # Get container stats
        cmd = f"docker stats {container_name} --no-stream --format '{{\{{.MemUsage}}}}|{{\{{.CPUPerc}}}}'"
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, check=True)
        mem_usage, cpu_perc = result.stdout.strip().split('|')
        
        print(f"Memory Usage: {mem_usage}")
        print(f"CPU Usage: {cpu_perc}")
        
        # Check for high resource usage
        if '%' in cpu_perc:
            cpu_value = float(cpu_perc.replace('%', ''))
            if cpu_value > 90:
                print(f"⚠️ High CPU usage detected: {cpu_perc}")
        
        if 'MiB' in mem_usage:
            mem_value = float(mem_usage.split('MiB')[0].strip())
            if mem_value > 500:  # Adjust based on your expected usage
                print(f"⚠️ High memory usage detected: {mem_usage}")
    except Exception as e:
        print(f"❌ Failed to check resources: {str(e)}")

def run_health_check(container_name, port):
    """Perform custom health check"""
    print_header(f"Health Check: {container_name}")
    
    # First try container health endpoint if available
    try:
        cmd = f"docker exec {container_name} curl -sSf http://localhost:{port}/health"
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=10)
        
        if result.returncode == 0:
            print("✅ Container health endpoint OK")
            print(result.stdout)
            return True
    except Exception:
        pass  # Fall through to basic check
    
    # Basic connectivity check
    try:
        cmd = f"docker exec {container_name} curl -sSf http://localhost:{port} > /dev/null"
        subprocess.run(cmd, shell=True, check=True, timeout=10)
        print(f"✅ Basic connectivity to port {port} OK")
        return True
    except subprocess.TimeoutExpired:
        print(f"❌ Timeout connecting to port {port}")
    except subprocess.CalledProcessError:
        print(f"❌ Failed to connect to port {port}")
    
    return False

def analyze_network(container_name):
    """Check network connectivity"""
    print_header(f"Network Analysis: {container_name}")
    
    tests = [
        ("DNS Resolution", "nslookup google.com"),
        ("External Connectivity", "curl -I https://google.com"),
        ("Internal Connectivity", "curl -I http://localhost")
    ]
    
    all_success = True
    for test_name, test_cmd in tests:
        try:
            cmd = f"docker exec {container_name} {test_cmd}"
            subprocess.run(cmd, shell=True, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            print(f"✅ {test_name} - SUCCESS")
        except subprocess.CalledProcessError:
            print(f"❌ {test_name} - FAILED")
            all_success = False
    
    return all_success

def check_dependencies(container_name):
    """Check for missing dependencies in container"""
    print_header(f"Dependency Check: {container_name}")
    
    # Check Node.js dependencies
    try:
        cmd = f"docker exec {container_name} npm ls --depth=0 --prod"
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        
        if "UNMET DEPENDENCY" in result.stdout or "missing" in result.stdout:
            print("❌ Missing dependencies detected:")
            print(result.stdout)
            return False
        else:
            print("✅ All dependencies are properly installed")
            return True
    except Exception as e:
        print(f"❌ Failed to check dependencies: {str(e)}")
        return False

def full_diagnostic():
    """Run comprehensive diagnostic on all containers"""
    results = {}
    
    for container, port in [
        (CONFIG["dev_container"], CONFIG["dev_port"]),
        (CONFIG["prod_container"], CONFIG["prod_port"])
    ]:
        container_results = {}
        print(f"\n{'='*30} DIAGNOSING {container} {'='*30}")
        
        # Run checks
        container_results["status"] = check_container_status(container)
        container_results["logs"] = analyze_logs(container)
        container_results["resources"] = check_resource_usage(container)
        container_results["health"] = run_health_check(container, port)
        container_results["network"] = analyze_network(container)
        container_results["dependencies"] = check_dependencies(container)
        
        results[container] = container_results
    
    # Generate diagnostic report
    report = {
        "timestamp": datetime.utcnow().isoformat(),
        "system": {
            "host": os.uname().nodename,
            "os": os.uname().sysname,
            "load_avg": psutil.getloadavg()
        },
        "containers": results
    }
    
    # Save report
    report_path = "diagnostic_report.json"
    with open(report_path, "w") as f:
        json.dump(report, f, indent=2)
    
    print_header("Diagnostic Complete")
    print(f"✅ Full diagnostic report saved to: {report_path}")

def continuous_monitoring():
    """Continuous monitoring mode"""
    print_header("Continuous Monitoring Mode")
    print("Press Ctrl+C to stop monitoring...")
    
    try:
        while True:
            for container in [CONFIG["dev_container"], CONFIG["prod_container"]]:
                print(f"\n📊 Monitoring {container} - {datetime.now().strftime('%H:%M:%S')}")
                check_container_status(container)
                check_resource_usage(container)
            time.sleep(30)  # Check every 30 seconds
    except KeyboardInterrupt:
        print("\nMonitoring stopped")

def main():
    parser = argparse.ArgumentParser(description="NASA Soil App Diagnostic Tool")
    parser.add_argument("--diagnose", action="store_true", help="Run full diagnostic")
    parser.add_argument("--monitor", action="store_true", help="Continuous monitoring")
    parser.add_argument("--logs", type=int, nargs="?", const=100, 
                       help="Show logs (optional: number of lines)")
    parser.add_argument("--container", choices=["dev", "prod"], default="dev",
                       help="Specify container to check")
    
    args = parser.parse_args()
    
    if not any([args.diagnose, args.monitor, args.logs]):
        parser.print_help()
        sys.exit(1)
    
    container_name = CONFIG["dev_container"] if args.container == "dev" else CONFIG["prod_container"]
    
    try:
        if args.diagnose:
            full_diagnostic()
        
        elif args.monitor:
            continuous_monitoring()
        
        elif args.logs:
            num_lines = args.logs if args.logs > 0 else 100
            analyze_logs(container_name, num_lines)
    
    except KeyboardInterrupt:
        print("\nOperation cancelled by user")
    except Exception as e:
        print(f"❌ Critical error: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()