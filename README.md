# Fleet Apps

Fleet Apps is a system designed to manage vehicle fleets, including geofencing, location tracking, and more. This guide provides step-by-step instructions to set up and run the application.

---

## Prerequisites

1. **Git**: Ensure Git is installed on your machine. You can verify by running:
   ```bash
   git --version
   ```
   If not installed, follow the [Git installation guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

2. **Docker and Docker Compose**: Ensure Docker and Docker Compose are installed. Verify by running:
   ```bash
   docker --version
   docker-compose --version
   ```
   If not installed, follow the [Docker installation guide](https://docs.docker.com/get-docker/) and [Docker Compose installation guide](https://docs.docker.com/compose/install/).

---

## Setup Instructions

### 1. Clone the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/nafifurqon/fleet-apps.git
```

Navigate to the project directory:
```bash
cd fleet-apps
```

---

## Branch

This project uses the `main` branch. Ensure you are on the `main` branch when working with this repository.

---

### 2. Configure Environment Variables
1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Open the [`.env`](.env ) file:
   ```bash
   nano .env
   ```

3. Set the `DB_PASSWORD` variable to a secure password of your choice, for example:
   ```plaintext
   DB_PASSWORD=PassWord2025
   ```

Save and close the file.

---

### 3. Build and Run the Application
Run the following command to build and start all services:
```bash
docker-compose up --build -d
```

This will start all the necessary services, including PostgreSQL, MQTT broker, RabbitMQ, and the application services.

---

### 4. Run Database Migrations
Run the following command to create the required tables in the PostgreSQL database:
```bash
docker-compose exec fleet-api npm run migrate:up
```

---

### 5. Import Postman Collection
1. Open Postman.
2. Import the file [`fleet-apps.postman_collection.json`](fleet-apps.postman_collection.json ) located in the project directory.
3. Use the imported collection to test the API endpoints.

---

## Additional Notes

- If you encounter any issues, ensure Docker and Docker Compose are properly installed and running.
- For detailed logs, you can monitor the services using:
  ```bash
  docker-compose logs -f
  ```

---

## Troubleshooting

- **Docker Not Installed**: Follow the [Docker installation guide](https://docs.docker.com/get-docker/).
- **Database Connection Issues**: Ensure the `DB_PASSWORD` in the [`.env`](.env ) file matches the password set in the PostgreSQL service.

---

With these steps, you should have the Fleet Apps system up and running. Happy coding! 🚀

---

## Contact

If you have any questions or need further assistance, feel free to reach out via email: [nafifurqon@gmail.com](mailto:nafifurqon@gmail.com).