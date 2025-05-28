from locust import HttpUser, TaskSet, task, between
import json

class CompraUsuario(TaskSet):
    def on_start(self):
        """Autentica e salva os dados do usuário"""
        login_payload = {
            "usernameOrEmail": "vinilimacm201@gmail.com",
            "password": "vlcm1515"
        }

        with self.client.post("/auth/login", json=login_payload, catch_response=True) as response:
            if response.status_code == 200:
                self.user_data = response.json()
                self.user_id = self.user_data.get("id", "a918f569-d0d6-4978-a0f7-1847a8ee747b")
                self.headers = {"Content-Type": "application/json"}
            else:
                response.failure("Falha no login")

    @task
    def fluxo_de_compra(self):
        carta_id = "34459dda-1754-4e04-9b9c-e4ff5841603c"

        # 1. Verifica se a carta está disponível (GET)
        self.client.get(f"/api/carta/{carta_id}", headers=self.headers)

        # 2. Tenta bloquear a carta (POST)
        self.client.post(f"/api/carta/lock/{carta_id}", headers=self.headers)

        # 3. Realiza o pagamento (POST)
        pagamento_payload = {
            "type": "creditcard",
            "param": [
                self.user_data.get("name", "Locust Testador"),
                "123",
                "1234123412341234",
                "05/27"
            ]
        }
        self.client.post("/api/pagamento", headers=self.headers, data=json.dumps(pagamento_payload))

        # 4. Confirma a compra (POST)
        self.client.post(f"/api/compras/{carta_id}/{self.user_id}", headers=self.headers)

        # 5. Desbloqueia a carta ao final (caso necessário)
        self.client.post(f"/api/carta/unlock/{carta_id}", headers=self.headers)

class UsuarioSimulado(HttpUser):
    tasks = [CompraUsuario]
    wait_time = between(1, 5)
