from locust import HttpUser, task, between
import json

class WebsiteUser(HttpUser):
    wait_time = between(1, 5)  # Tunggu antara 1 hingga 5 detik sebelum request selanjutnya

    @task
    def get_users(self):
        self.client.get("/users")

    @task
    def get_user_by_id(self):
        user_id = 1  # Contoh user ID
        self.client.get(f"/users/{user_id}")