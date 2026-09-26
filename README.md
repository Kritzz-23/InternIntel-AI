# 🚀 InternIntel-AI

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-10B981?style=for-the-badge&logo=github)](https://kritzz-23.github.io/InternIntel-AI/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)](https://react.dev)

> 🚀 **Interactive Live Application:** [https://kritzz-23.github.io/InternIntel-AI/](https://kritzz-23.github.io/InternIntel-AI/)

### AI-Powered Internship Intelligence Platform

InternIntel-AI is an AI-driven internship intelligence platform designed to help students discover, manage, and track internship opportunities efficiently. The platform provides internship search, authentication, and role-based access control for students and recruiters.

---

## ✨ Features

### 🔐 Authentication & Security

* User registration and login system
* JWT-based authentication
* Password hashing using bcrypt
* Secure API endpoints

### 👥 Role-Based Access Control (RBAC)

* **Student Role**

  * View available internships
  * Explore internship opportunities
  * Manage profile

* **Recruiter Role**

  * Create internship listings
  * Manage internship data
  * Access recruiter-specific routes

### 💼 Internship Management

* Add internship opportunities
* View internship listings
* Search internships using filters:

  * Company
  * Role
  * Location

### ⚡ Backend API

* RESTful APIs built with FastAPI
* Automatic API documentation using Swagger UI
* SQL database integration using SQLAlchemy

---

## 🛠️ Tech Stack

### Backend

* Python
* FastAPI
* SQLAlchemy
* SQLite
* Pydantic

### Authentication

* JWT Authentication
* Passlib
* bcrypt

### Development Tools

* VS Code
* Git & GitHub
* Uvicorn

---

## 📂 Project Structure

```
InternIntel-AI/
│
├── backend/
│   ├── app/
│   │   ├── auth/
│   │   │   └── security.py
│   │   │
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   └── internship.py
│   │   │
│   │   ├── schemas/
│   │   │   ├── user.py
│   │   │   └── internship.py
│   │   │
│   │   ├── routers/
│   │   │   └── user.py
│   │   │
│   │   └── database/
│   │       └── database.py
│   │
│   ├── main.py
│   └── requirements.txt
│
└── README.md
```

---

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone https://github.com/Kritzz-23/InternIntel-AI.git
```

### Navigate to Backend

```bash
cd InternIntel-AI/backend
```

### Create Virtual Environment

```bash
python -m venv venv
```

Activate:

Windows:

```bash
venv\Scripts\activate
```

---

### Install Dependencies

```bash
pip install -r requirements.txt
```

---

## ▶️ Run Application

Start FastAPI server:

```bash
uvicorn main:app --reload
```

Application will run at:

```
http://127.0.0.1:8000
```

Swagger Documentation:

```
http://127.0.0.1:8000/docs
```

---

## 🔑 API Endpoints

### Authentication

| Method | Endpoint         | Description                 |
| ------ | ---------------- | --------------------------- |
| POST   | `/auth/register` | Register new user           |
| POST   | `/auth/login`    | Login and receive JWT token |

### Internships

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| POST   | `/internships` | Create internship |
| GET    | `/internships` | View internships  |

---

## 🏗️ Future Improvements

* AI-based internship recommendation system
* Internship scraping automation
* Resume matching using NLP
* Email notifications for new opportunities
* React frontend dashboard
* Deployment with cloud services

---

## 👩‍💻 Author

**Kritika Giri**
B.Tech CSE (AI & ML) Student

GitHub:
https://github.com/Kritzz-23

---

⭐ If you find this project useful, consider giving it a star!
