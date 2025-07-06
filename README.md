# 🌱 NASA Soil Prediction App

A production-ready web application for visualizing soil-related data from NASA APIs. Built using **React + TypeScript + Vite** and deployed via **Kubernetes**, this project includes CI/CD, performance testing, and best practices in modern frontend development.

---

## 🚀 Features

- 📦 Lightweight frontend using **Vite**
- 📊 Live soil data visualizations via **NASA APIs**
- 🌍 Interactive map with coordinate tracking
- 🧪 Unit testing, linting, formatting, and performance testing
- 🐳 Dockerized & Kubernetes-ready
- 🔁 CI/CD pipeline with **GitHub Actions**

---

## 🧰 Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **Build Tool**: Vite
- **Deployment**: Kubernetes (with Ingress, HPA, PDB)
- **CI/CD**: GitHub Actions
- **Performance Testing**: Locust
- **Containerization**: Docker (GHCR & DockerHub)

---

## 🐳 Docker Images

The application is automatically built and published to:

- GHCR: `ghcr.io/rabeh-codes/soil-prediction-app-soil-app:latest`
- DockerHub: `docker.io/rabeh-codes/soil-prediction-app-soil-app:latest`

### 📥 Pull Image

```bash
# GHCR
docker pull ghcr.io/rabeh-codes/soil-prediction-app-soil-app:latest

# DockerHub
docker pull docker.io/YOUR_DOCKERHUB_USERNAME/soil-prediction-app-soil-app:latest

⚙️ Setup
1. Install dependencies
bash
Copy
Edit
npm install
2. Run development server
bash
Copy
Edit
npm run dev
🧪 Testing & Formatting
bash
Copy
Edit
npm run test       # Unit tests
npm run lint       # ESLint
npm run format     # Prettier
npm run format:check  # Check formatting
📈 Performance Testing (Locust)
bash
Copy
Edit
locust -f tests/performance/loadtest.py \
  --host https://staging.soil-prediction.nasa.gov \
  --users 1000 \
  --spawn-rate 100 \
  --run-time 300s \
  --headless \
  --csv=loadtest_results
☁️ Deployment
The app is deployed via GitHub Actions:

Staging: On every push to dev branch

Production: On tag push like v1.0.0

🔐 Kubernetes Secrets
The CI/CD pipeline expects the following secrets to be provided:

STAGING_KUBECONFIG: Kubeconfig file for the staging environment.

PRODUCTION_KUBECONFIG: Kubeconfig file for the production environment.

These should be added to GitHub Actions secrets by the deployment administrator.

🧠 Project Structure
bash
Copy
Edit
.
├── src/                   # React source code
├── public/                # Static assets
├── k8s/
│   ├── production/        # Deployment files for production
│   └── staging/           # Deployment files for staging
├── tests/performance/     # Load testing via Locust
├── .github/workflows/     # CI/CD pipeline
├── Dockerfile             # Docker build file
└── README.md
📄 License
© 2025 NASA Soil Prediction Project. All rights reserved.

yaml
Copy
Edit
