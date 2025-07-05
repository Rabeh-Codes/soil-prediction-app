from locust import HttpUser, task, between, tag
import random

class SoilPredictionUser(HttpUser):
    wait_time = between(1, 3)
    host = "https://staging.soil-prediction.nasa.gov"
    
    # بيانات تربة نموذجية
    SOIL_SAMPLES = [
        {"location": "36.7783,-119.4179", "sensors": [0.12, 0.34, 0.56, 0.78, 0.90]},
        {"location": "34.0522,-118.2437", "sensors": [0.23, 0.45, 0.67, 0.89, 0.10]},
        {"location": "40.7128,-74.0060", "sensors": [0.34, 0.56, 0.78, 0.90, 0.12]},
        {"location": "41.8781,-87.6298", "sensors": [0.45, 0.67, 0.89, 0.10, 0.23]},
        {"location": "29.7604,-95.3698", "sensors": [0.56, 0.78, 0.90, 0.12, 0.34]}
    ]
    
    def on_start(self):
        """تسجيل دخول المستخدم"""
        response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_password"
        })
        self.token = response.json().get("token")
        self.headers = {"Authorization": f"Bearer {self.token}"}
    
    @tag("prediction")
    @task(5)
    def predict_soil(self):
        """طلب توقع خصائص التربة"""
        sample = random.choice(self.SOIL_SAMPLES)
        self.client.post(
            "/api/v1/predict", 
            json=sample,
            headers=self.headers
        )
    
    @tag("dashboard")
    @task(3)
    def view_dashboard(self):
        """عرض لوحة التحكم"""
        self.client.get("/dashboard", headers=self.headers)
    
    @tag("history")
    @task(2)
    def view_prediction_history(self):
        """عرض سجل التوقعات"""
        self.client.get("/api/v1/predictions/history", headers=self.headers)
    
    @tag("map")
    @task(1)
    def view_soil_map(self):
        """عرض خريطة التربة"""
        self.client.get("/api/v1/soil-map", headers=self.headers)
    
    @tag("heavy")
    @task(1)
    def heavy_computation(self):
        """طلب حساب ثقيل"""
        self.client.post(
            "/api/v1/complex-analysis", 
            json={"samples": random.choices(self.SOIL_SAMPLES, k=10)},
            headers=self.headers
        )

# إعدادات إضافية لاختبار الحمل
class HighTrafficUser(SoilPredictionUser):
    wait_time = between(0.1, 0.5)
    weight = 3  # 30% من المستخدمين

class NormalUser(SoilPredictionUser):
    wait_time = between(1, 3)
    weight = 7  # 70% من المستخدمين