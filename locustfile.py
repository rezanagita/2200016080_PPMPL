from locust import HttpUser, task, between
import os

class FlaskAPITestUser(HttpUser):
    # Atur URL host, bisa langsung di-hardcode atau menggunakan environment variable
    host = os.getenv("LOCUST_HOST", "http://127.0.0.1:5000")  # Gunakan localhost:5000 sebagai default
    wait_time = between(5, 10)  # Menunggu 1-5 detik antara setiap request

    @task
    def get_books(self):
        self.client.get("/buku")  # Menguji endpoint GET /buku

    @task
    def post_book(self):
        self.client.post("/buku", data={
            "penulis": "Penulis Test",
            "judul": "Judul Test",
            "tema": "Tema Test"
        })  # Menguji endpoint POST /buku

    @task
    def get_book_by_id(self):
        self.client.get("/buku/5")  # Menguji endpoint GET /buku/<id> (misal ID 5)

    @task
    def put_book_by_id(self):
        self.client.put("/buku/1", data={
            "penulis": "Penulis Updated",
            "judul": "Judul Updated",
            "tema": "Tema Updated"
        })  # Menguji endpoint PUT /buku/<id> (misal ID 1)

    @task
    def delete_book_by_id(self):
        self.client.delete("/buku/4")  # Menguji endpoint DELETE /buku/<id> (misal ID 4)
