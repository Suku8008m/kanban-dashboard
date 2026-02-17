# 📝 WebSocket‑Powered Kanban Board

A real‑time Kanban board application built as part of an internship assignment to demonstrate proficiency in **React**, **WebSockets (Socket.IO)**, and **modern testing practices** using **Vitest** and **Playwright**.

---

## 🚀 Live Demo

🔗 **Application:** [https://project-kanban-dashboard.onrender.com/](https://project-kanban-dashboard.onrender.com/)

> ⚠️ Note: The app is hosted on Render (free tier). The first load may take ~30 seconds if the service is waking up.

---

## 💻 Source Code

🔗 **GitHub Repository:** [https://github.com/Suku8008m/submission](https://github.com/Suku8008m/submission)

---

## 📌 Project Overview

This project implements a **real‑time Kanban board** where multiple users can collaboratively manage tasks. Any change made by one user (create, update, move, or delete a task) is instantly reflected for all connected users using WebSockets.

The project was built to closely follow the assignment specification and to showcase clean architecture, real‑time communication, and strong testing coverage.

---

## 🏗 Tech Stack

### Frontend

* React
* Socket.IO Client
* React DnD (Drag & Drop)
* Chart.js / Recharts (Task Progress Visualization)
* Vitest + React Testing Library
* Playwright (E2E Testing)

### Backend

* Node.js
* Express.js
* Socket.IO
* In‑memory task storage (can be extended to MongoDB)

---

## ✅ Features Implemented

### 🗂 Kanban Board

* Three columns:

  * **To Do**
  * **In Progress**
  * **Done**
* Drag and drop tasks between columns
* Real‑time synchronization across multiple clients

### 📝 Task Management

* Create, update, and delete tasks
* Assign **Priority**: Low / Medium / High
* Assign **Category**: Bug / Feature / Enhancement

### 📎 File Uploads

* Upload attachments (images / documents)
* Image preview for supported formats
* File URL stored in application state (simulated backend storage)

### 📊 Task Progress Visualization

* Live chart showing:

  * Number of tasks in each column
  * Percentage of completed tasks
* Graph updates instantly as tasks move or change

---

## 🔌 WebSocket Events

The following Socket.IO events are implemented:

* `sync:tasks` → Sends all tasks to newly connected clients
* `task:create` → Create a new task
* `task:update` → Update task details (title, priority, category, attachments)
* `task:move` → Move task between columns
* `task:delete` → Delete a task

All events are broadcast to ensure real‑time consistency across clients.

---

## 🧪 Testing Strategy

### Unit Tests (Vitest)

* Core task operations (add, update, delete)
* WebSocket client logic

### Integration Tests (Vitest + React Testing Library)

* State synchronization via WebSockets
* Drag‑and‑drop interactions

### End‑to‑End Tests (Playwright)

* Create, move, and delete tasks
* Real‑time UI updates across sessions
* Priority & category dropdown selection
* File upload and validation
* Dynamic graph updates

---

## ▶️ Running the Project Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Suku8008m/submission.git
cd submission
```

### 2️⃣ Start the backend

```bash
cd backend
npm install
npm start
```

### 3️⃣ Start the frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Running Tests

### Unit & Integration Tests

```bash
cd frontend
npm test
```

### End‑to‑End Tests

```bash
npx playwright test
```

---

## 📊 Evaluation Alignment

This project aligns with all evaluation criteria:

* ✅ Real‑time WebSocket communication
* ✅ Clean React component structure
* ✅ Comprehensive testing (unit, integration, E2E)
* ✅ Maintainable, readable code
* ✅ Responsive and intuitive UI

---

## 👤 Author

**Sukumar Kamapalli**
Final‑year B.Tech student | Aspiring Full‑Stack Developer

---

Thank you for reviewing this submission. I would be happy to walk through the implementation or provide a short demo video if required. 🚀
