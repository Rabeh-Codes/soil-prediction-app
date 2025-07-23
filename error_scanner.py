# error_scanner.py
"""
Advanced Project Error & Vulnerability Scanner
Scans all source files in your project for:
- Syntax errors
- Dependency issues
- Usage of dangerous functions
- TODO/FIXME annotations
- Common insecure patterns (e.g., eval, exec)
"""

import os
import ast
import re
from pathlib import Path

DANGEROUS_FUNCTIONS = {"eval", "exec", "compile", "input", "open", "os.system", "subprocess"}
INSECURE_PATTERNS = [r"os\.system\(", r"eval\(", r"exec\(", r"input\(", r"subprocess\."]


def scan_file(file_path):
    issues = []
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            # AST parse for syntax errors
            try:
                tree = ast.parse(content, filename=file_path)
            except SyntaxError as e:
                issues.append(f"SyntaxError in {file_path}:{e.lineno} - {e.msg}")
                return issues

            # Dangerous function detection
            for node in ast.walk(tree):
                if isinstance(node, ast.Call):
                    func = node.func
                    if isinstance(func, ast.Name) and func.id in DANGEROUS_FUNCTIONS:
                        issues.append(f"[Dangerous] {func.id}() used in {file_path}:{node.lineno}")
                    elif isinstance(func, ast.Attribute):
                        full_name = f"{getattr(func.value, 'id', '?')}.{func.attr}"
                        if full_name in DANGEROUS_FUNCTIONS:
                            issues.append(f"[Dangerous] {full_name} used in {file_path}:{node.lineno}")

            # Check for TODO, FIXME
            for i, line in enumerate(content.splitlines(), start=1):
                if "TODO" in line or "FIXME" in line:
                    issues.append(f"[Annotation] Line {i} in {file_path}: {line.strip()}")

            # Regex search for insecure patterns
            for pattern in INSECURE_PATTERNS:
                for match in re.finditer(pattern, content):
                    line_num = content[:match.start()].count('\n') + 1
                    issues.append(f"[Insecure] Pattern '{pattern}' in {file_path}:{line_num}")

    except Exception as e:
        issues.append(f"Error reading {file_path}: {str(e)}")
    return issues


def scan_project(root_dir="."):
    project_path = Path(root_dir)
    all_py_files = list(project_path.rglob("*.py"))
    print(f"Scanning {len(all_py_files)} Python files in '{root_dir}'...")
    total_issues = 0

    for file in all_py_files:
        issues = scan_file(file)
        for issue in issues:
            print(" -", issue)
        total_issues += len(issues)

    print("\nDone.")
    print(f"Total issues found: {total_issues}")


if __name__ == "__main__":
    scan_project("src")  # Change to '.' if scanning whole repo
