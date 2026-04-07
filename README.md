# 🚀 Dockerized Node.js Application with CI/CD on AWS EC2

## 📌 Project Overview

This project demonstrates how to build, containerize, and deploy a Node.js application using Docker, automate deployment using CI/CD, and run a multi-container setup using Docker Compose on AWS EC2.

# 🧱 Tech Stack

* Node.js
* Docker
* Docker Compose
* Git & GitHub
* AWS EC2
* GitHub Actions (CI/CD)

---

# 📁 Project Structure

```
my-docker-app/
│
├── app.js
├── Dockerfile
├── docker-compose.yml
├── README.md
│
└── .github/
    └── workflows/
        └── deploy.yml
```

---

# 🟢 PART 1: Create Node.js App (Local)

## Step 1: Create app.js

```javascript
const http = require('http');

http.createServer((req, res) => {
  res.end("Hello from Docker Project!");
}).listen(3000);

console.log("Server running on port 3000");
```

## Step 2: Run locally

```bash
node app.js
```

Open browser:

```
http://localhost:3000
```

---

# 🐳 PART 2: Dockerize Application

## Step 1: Create Dockerfile

```dockerfile
FROM node:18
WORKDIR /app
COPY . .
CMD ["node", "app.js"]
```

## Step 2: Build Docker Image

```bash
docker build -t myapp .
```

## Step 3: Run Container

```bash
docker run -d -p 3000:3000 myapp
```

Open:

```
http://localhost:3000
```

---

# ☁️ PART 3: Push Code to GitHub

```bash
git init
git add .
git commit -m "initial commit"

git remote add origin <repo-url>
git push -u origin master
```

---

# ☁️ PART 4: AWS EC2 Setup

## Step 1: Launch EC2

* OS: Ubuntu 22.04
* Instance: t2.micro
* Open Ports:

  * 22 (SSH)
  * 3000 (App)

## Step 2: Connect via SSH (MobaXterm)

## Step 3: Install Docker & Git

```bash
sudo apt update
sudo apt install docker.io git -y
sudo systemctl start docker
```

## Step 4: Clone Repo

```bash
git clone <repo-url>
cd my-docker-app
```

## Step 5: Run Docker App

```bash
sudo docker build -t myapp .
sudo docker run -d -p 3000:3000 myapp
```

Open:

```
http://<EC2-IP>:3000
```

---

# ⚙️ PART 5: CI/CD using GitHub Actions

## Step 1: Add Secrets in GitHub

* EC2_HOST
* EC2_USER
* EC2_SSH_KEY

## Step 2: Create Workflow File

Path:

```
.github/workflows/deploy.yml
```

## deploy.yml

```yaml
name: Deploy to EC2

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Deploy to EC2
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USER }}
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            cd my-docker-app
            git pull origin master
            sudo docker stop $(sudo docker ps -q) || true
            sudo docker rm $(sudo docker ps -aq) || true
            sudo docker build -t myapp .
            sudo docker run -d -p 3000:3000 myapp
```

---

# 🧩 PART 6: Docker Compose (Multi-Container)

## Step 1: Create docker-compose.yml

```yaml
version: '3'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - mongo

  mongo:
    image: mongo
    ports:
      - "27017:27017"
```

## Step 2: Run Locally

```bash
docker compose up --build
```

---

# ☁️ PART 7: Docker Compose on EC2

## Step 1: Install Docker Compose

```bash
sudo apt install docker-compose -y
```

## Step 2: Navigate to Project

```bash
cd ~/my-docker-app
```

## Step 3: Pull Latest Code

```bash
git pull origin master
```

## Step 4: Stop Old Containers

```bash
sudo docker stop $(sudo docker ps -q)
sudo docker rm $(sudo docker ps -aq)
```

## Step 5: Run Docker Compose

```bash
sudo docker-compose up -d --build
```

## Step 6: Verify

```bash
sudo docker ps
```

Open:

```
http://<EC2-IP>:3000
```

---

# 🎯 Final Outcome

* Application successfully deployed on AWS EC2
* Automated deployment using CI/CD
* Multi-container setup using Docker Compose

---

# 🎤 Interview Summary

“I built a Dockerized Node.js application, deployed it on AWS EC2, automated deployment using GitHub Actions, and used Docker Compose to manage multiple containers including a database.”

---

# 🔥 Key Learnings

* Docker basics
* Containerization
* CI/CD automation
* AWS deployment
* Multi-container orchestration

---

# 🏗️ Architecture Diagram

```
[ Developer (Local Machine) ]
            │
            ▼
     (Git Push Code)
            │
            ▼
      [ GitHub Repository ]
            │
            ▼
   (GitHub Actions CI/CD)
            │
            ▼
        [ AWS EC2 Instance ]
            │
     ┌───────────────┐
     │ Docker Engine │
     └───────────────┘
            │
            ▼
   ┌─────────────────────┐
   │  Docker Compose     │
   │---------------------│
   │  Node.js App        │
   │  MongoDB Database   │
   └─────────────────────┘
            │
            ▼
     [ Browser Access ]
   http://<EC2-IP>:3000
```


# 🙌 Author
# YASHASWINI NAG J
