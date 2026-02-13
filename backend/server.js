const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { v4: uuid } = require("uuid");

const app = express();
const server = http.createServer(app);
require("dotenv").config();

// Use dynamic port for Render
const PORT = process.env.PORT || 5000;

const io = new Server(server, {
  origin: process.env.FRONTEND_URL,
  maxHttpBufferSize: 20 * 1024 * 1024, // 20MB
});

let tasks = [];

io.on("connection", (socket) => {
  // 🔁 Send existing tasks to new client
  socket.emit("sync:tasks", tasks);

  // ➕ Create task
  socket.on("task:create", (cardData) => {
    const newTask = {
      id: uuid(),
      title: cardData.title,
      description: cardData.description || "",
      status: cardData.status,
      priority: cardData.priority,
      category: cardData.category,

      // ✅ Proper file handling
      file: cardData.file ? Buffer.from(cardData.file) : null,
      fileType: cardData.fileType || null,
      fileName: cardData.fileName || null,
    };
    tasks.push(newTask);

    io.emit("task:created", newTask);
  });

  // ✏️ Update task
  socket.on("task:update", ({ id, updates }) => {
    tasks = tasks.map((t) => (t.id === id ? { ...t, ...updates } : t));
    io.emit("task:updated", { id, updates });
  });

  // 🔀 Move task between columns
  socket.on("task:move", ({ id, status }) => {
    tasks = tasks.map((task) => (task.id === id ? { ...task, status } : task));
    io.emit("task:moved", { id, status });
  });

  // 🗑 Delete task
  socket.on("task:delete", (id) => {
    tasks = tasks.filter((t) => t.id !== id);
    io.emit("task:deleted", id);
  });

  // 📎 Attach file (simulated)
  socket.on("task:attach", ({ id, fileUrl }) => {
    tasks = tasks.map((t) =>
      t.id === id ? { ...t, attachments: [...t.attachments, fileUrl] } : t,
    );
    io.emit("task:attached", { id, fileUrl });
  });

  socket.on("disconnect", () => {});
});

// Listen on dynamic port
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
