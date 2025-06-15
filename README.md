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
│ ├── sockets/ # Basic room/socket handling logic
│
├── frontend/ # React + Zustand + Pixi.js + Howler.js frontend
│ ├── pages/ # Lobby, GameSolo, Leaderboards, Profile
│ ├── navbar/ # Navigation bar and its styling
│ ├── store/ # Zustand auth/game state
│ ├── auth/ # AuthPage component (Login/Signup)
│ ├── sounds/ # Sound assets (shoot.wav, hit.wav, etc.)
│ ├── GameSolo.jsx # Solo game logic with Pixi.js canvas
│ ├── routes.jsx # App routing config
│
├── docker-compose.yml
├── .env files (frontend & backend)

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

## 🎮 Phase 3: Solo Mode (Playable Game)

### 🧱 Game Rendering

- **Pixi.js** canvas rendered inside `GameSolo.jsx`
- Player and enemy are rendered using `PIXI.Graphics`

### 🎮 Controls & Mechanics

- Player movement: `WASD` or arrow keys
- Fire bullets with `Space` key
- Clamp player inside canvas
- Bullet collision detection
- Health system (player & enemy)

### 🧠 Basic Enemy AI

- Enemy auto-chases player
- Enemy damages player on collision
- Enemy HP system and destruction with explosion animation

### 🔊 Sound Effects (Howler.js)

- `shoot.wav` for bullet fire
- `hit.wav` for bullet/enemy or enemy/player collision
- `explosion.wav` on enemy kill
- `gameover.wav` and `win.wav` on loss/win
- Sounds loaded from `public/sounds/`

---

## 🚀 Running the Project

### Prerequisites

- Docker & Docker Compose
- `.env` files in both `frontend/` and `backend/`


Build & Run (Docker Compose)
docker-compose up --build
Frontend: http://localhost:3000
Backend: http://localhost:5000

