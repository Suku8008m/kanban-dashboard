const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { v4: uuid } = require("uuid");

const app = express();
const server = http.createServer(app);

// Use dynamic port for Render
const PORT = process.env.PORT || 5000;

const io = new Server(server, {
  cors: { origin: "*" }, // keep original logic
});


let tasks = [];

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
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
      file: cardData.file || "",
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
    console.log(tasks.length);
    tasks = tasks.filter((t) => t.id !== id);
    console.log(tasks.length);
    io.emit("task:deleted", id);
  });

  // 📎 Attach file (simulated)
  socket.on("task:attach", ({ id, fileUrl }) => {
    tasks = tasks.map((t) =>
      t.id === id ? { ...t, attachments: [...t.attachments, fileUrl] } : t
    );
    io.emit("task:attached", { id, fileUrl });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Listen on dynamic port
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

