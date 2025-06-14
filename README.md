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
│ ├── models/ # Mongoose models
│ ├── routes/ # Express route handlers
│ ├── controllers/ # Controller logic
│
├── frontend/ # React + Zustand + Pixi.js + Howler.js frontend
│ ├── pages/ # Lobby, Leaderboards, Profile, etc.
│ ├── navbar/ # Navigation bar and its styling
│ ├── store/ # Zustand stores
│ ├── auth/ # AuthPage component
│ ├── routes.jsx # App routing config
│
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

## 🧩 Phase 2 Features

### 🧭 Navigation (NavBar)

- Global NavBar shown on all pages except `/`
- Hamburger menu with:
  - `View Profile`
  - `Leaderboards`
  - `Logout`

### 👤 View & Edit Profile

- Dedicated **View Profile** page
- Fields added to user profile:
  - `username`
  - `bio`
  - `avatarUrl`
  - `country`
  - `favoriteGameMode`
- Fetch and update user info from database
- CSS module styling with responsive layout

### 🧪 Lobby Page

- `/lobby` replaces `/dashboard` as main page post-login
- Includes "Play vs AI" and "Play with Friend" buttons
- Central game hub for upcoming features
- Implementing Socket.io in basic way for 'createRoom', 'joinRoom' and 'disconnect' in backend
---

## 🚀 Running the Project

### Prerequisites

- Docker & Docker Compose
- `.env` files in both `frontend/` and `backend/`


Build & Run (Docker Compose)
docker-compose up --build
Frontend: http://localhost:300
Backend: http://localhost:5000

