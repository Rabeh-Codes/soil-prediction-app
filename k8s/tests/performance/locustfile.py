import os
from locust import HttpUser, task, between, tag, events
import random
import logging
import json
from datetime import datetime

# Set up logging
logger = logging.getLogger("soil-prediction-loadtest")
logger.setLevel(logging.INFO)
handler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)

class SoilPredictionUser(HttpUser):
    wait_time = between(1, 5)  # More realistic wait times
    host = os.getenv("LOCUST_HOST", "https://staging.soil-prediction.nasa.gov")
    
    # Externalized test data
    SOIL_SAMPLES = []
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.load_test_data()
        
    def load_test_data(self):
        """Load test data from external file"""
        try:
            with open("test_data/soil_samples.json", "r") as f:
                self.SOIL_SAMPLES = json.load(f)
            logger.info(f"Loaded {len(self.SOIL_SAMPLES)} soil samples")
        except FileNotFoundError:
            # Fallback to default samples
            self.SOIL_SAMPLES = [
                {"location": "36.7783,-119.4179", "sensors": [0.12, 0.34, 0.56, 0.78, 0.90]},
                {"location": "34.0522,-118.2437", "sensors": [0.23, 0.45, 0.67, 0.89, 0.10]},
                {"location": "40.7128,-74.0060", "sensors": [0.34, 0.56, 0.78, 0.90, 0.12]},
                {"location": "41.8781,-87.6298", "sensors": [0.45, 0.67, 0.89, 0.10, 0.23]},
                {"location": "29.7604,-95.3698", "sensors": [0.56, 0.78, 0.90, 0.12, 0.34]}
            ]
            logger.warning("Using default soil samples")

    def on_start(self):
        """Authenticate user with credentials from environment variables"""
        username = os.getenv("TEST_USER", "test_user")
        password = os.getenv("TEST_PASSWORD", "test_password")
        
        with self.client.post(
            "/auth/login", 
            json={"username": username, "password": password},
            catch_response=True
        ) as response:
            if response.status_code == 200:
                self.token = response.json().get("token")
                self.headers = {
                    "Authorization": f"Bearer {self.token}",
                    "X-Request-ID": f"req-{random.randint(10000, 99999)}"
                }
                logger.info(f"User {username} authenticated successfully")
            else:
                response.failure(f"Login failed: {response.status_code}")
                logger.error(f"Login failed for {username}: {response.text}")
                self.stop(True)  # Stop this user

    @tag("prediction")
    @task(5)
    def predict_soil(self):
        """Submit soil prediction request"""
        sample = random.choice(self.SOIL_SAMPLES)
        with self.client.post(
            "/api/v1/predict", 
            json=sample,
            headers=self.headers,
            name="/api/predict",
            catch_response=True
        ) as response:
            if response.status_code != 200:
                response.failure(f"Prediction failed: {response.status_code}")
                logger.error(f"Prediction failed: {response.text}")

    @tag("dashboard")
    @task(3)
    def view_dashboard(self):
        """View user dashboard"""
        with self.client.get(
            "/dashboard", 
            headers=self.headers,
            name="/dashboard",
            catch_response=True
        ) as response:
            if response.status_code != 200:
                response.failure(f"Dashboard failed: {response.status_code}")

    @tag("history")
    @task(2)
    def view_prediction_history(self):
        """View prediction history"""
        params = {
            "page": random.randint(1, 10),
            "limit": random.choice([10, 25, 50])
        }
        with self.client.get(
            "/api/v1/predictions/history", 
            headers=self.headers,
            params=params,
            name="/api/history",
            catch_response=True
        ) as response:
            if response.status_code != 200:
                response.failure(f"History failed: {response.status_code}")

    @tag("map")
    @task(1)
    def view_soil_map(self):
        """View soil map with random bounding box"""
        bbox = [
            random.uniform(-180, 180),
            random.uniform(-90, 90),
            random.uniform(-180, 180),
            random.uniform(-90, 90)
        ]
        with self.client.get(
            "/api/v1/soil-map", 
            headers=self.headers,
            params={"bbox": ",".join(map(str, bbox))},
            name="/api/soil-map",
            catch_response=True
        ) as response:
            if response.status_code != 200:
                response.failure(f"Soil map failed: {response.status_code}")

    @tag("heavy")
    @task(1)
    def heavy_computation(self):
        """Request complex analysis"""
        samples = random.sample(self.SOIL_SAMPLES, k=random.randint(1, 5))  # Reduced load
        with self.client.post(
            "/api/v1/complex-analysis", 
            json={"samples": samples},
            headers=self.headers,
            name="/api/complex-analysis",
            catch_response=True
        ) as response:
            if response.status_code != 202:  # Assuming async processing
                response.failure(f"Heavy computation failed: {response.status_code}")


class HighTrafficUser(SoilPredictionUser):
    wait_time = between(0.1, 1)  # More aggressive users
    weight = 3  # 30% of traffic

class NormalUser(SoilPredictionUser):
    wait_time = between(2, 8)  # More realistic for normal users
    weight = 7  # 70% of traffic

# Custom event hooks for monitoring
@events.request.add_listener
def on_request(request_type, name, response_time, response_length, exception, **kwargs):
    if exception:
        logger.error(f"Request failed: {name} | Exception: {exception}")
    elif response_time > 5000:  # Alert for slow requests (>5s)
        logger.warning(f"Slow request: {name} took {response_time}ms")

@events.test_start.add_listener
def on_test_start(**kwargs):
    logger.info("🚀 Starting soil prediction load test")
    logger.info(f"Target environment: {os.getenv('LOCUST_HOST', 'https://staging.soil-prediction.nasa.gov')}")