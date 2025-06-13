# DuelZone 🕹️🔥

A fullstack multiplayer game platform supporting solo, friend, and AI matches. Built with MERN + WebSocket stack. This README covers **Phase 1**: Authentication, environment setup, Dockerization, and deployment readiness.

---
## 🌐 Live URL

> _Coming Soon_ 
---

## 📁 Folder Structure
duelzone/
│
├── backend/ # Node.js + Express + MongoDB backend
├── frontend/ # React + Zustand + Pixi.js + Howler.js frontend
├── docker-compose.yml

---

## ✅ Phase 1 Features Implemented

### 🔐 Authentication

- **Signup/Login with JWT** (Local auth)
- **Google OAuth2 Signup/Login**
- Passwords hashed using `bcrypt`
- JWT issued only on successful login

### 🧠 Zustand Auth Store (Frontend)

- Persistent login state (localStorage)
- Zustand used for global auth state
- Toast notifications for success/error

### 🔄 API Integration

- Fetch API handles token injection
- Toast feedback integrated into login/signup flows
- Form validations and error messages

### 🐳 Dockerized Setup

- `Dockerfile` and `.dockerignore` for **both frontend and backend**
- `docker-compose.yml` with:
  - Volumes
  - Environment file support (`.env`)
  - Custom run commands (`npm start`)
- Runs locally with `docker-compose up --build`

### 📱 Cross-Platform Readiness
- Designed for both desktop and mobile usage

---

## 🚀 Running the Project

### Prerequisites

- Docker & Docker Compose
- `.env` files in both `frontend/` and `backend/`


Build & Run (Docker Compose)
docker-compose up --build
Frontend: http://localhost:300
Backend: http://localhost:5000

