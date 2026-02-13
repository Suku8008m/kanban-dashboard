// Context.jsx

import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

const AppContext = createContext(null);
const socket = io(import.meta.env.VITE_API_URL);
const defaultCategories = {
  bug: "Bug",
  feature: "Feature",
  enhancement: "Enhancement",
};

const defaultPriority = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

const defaultStatus = {
  todo: "Todo",
  inprogress: "In Progress",
  done: "Done",
};

// ---------- Provider ----------
export const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Form State
  const [newTask, setNewTask] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(defaultCategories.bug);
  const [priority, setPriority] = useState(defaultPriority.low);
  const [status, setStatus] = useState(defaultStatus.todo);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLight, setIsLight] = useState(false);

  // ---------- Create Task ----------
  const submitForm = async (e) => {
    e.preventDefault();

    const currentTask = newTask.trim();

    if (!currentTask) return;

    const isTaskAvailable = tasks.some((item) => item.title === currentTask);

    if (isTaskAvailable) {
      toast.error(`Task name '${currentTask}' already exists`);
      return;
    }

    let fileData = null;
    let fileType = null;
    let fileName = null;

    if (file) {
      fileData = await file.arrayBuffer();
      fileType = file.type;
      fileName = file.name;
    }
    console.log(
      currentTask,
      description,
      category,
      priority,
      status,
      fileData,
      fileType,
      fileName,
    );

    socket.emit("task:create", {
      title: currentTask,
      description,
      category,
      priority,
      status,
      file: fileData,
      fileType,
      fileName,
    });

    // Reset Form
    setNewTask("");
    setDescription("");
    setCategory(defaultCategories.bug);
    setPriority(defaultPriority.low);
    setStatus(defaultStatus.todo);
    setFile(null);
    setPreview(null);
  };

  // ---------- Update ----------
  const updateForm = (id) => {
    socket.emit("task:update", {
      id,
      updates: { description, category, priority, status },
    });
  };

  // ---------- Move ----------
  const move = ({ id, status }) => {
    socket.emit("task:move", { id, status });
  };

  // ---------- Delete ----------
  const deleteForm = (id) => {
    socket.emit("task:delete", id);
  };

  // ---------- Socket Listeners ----------
  useEffect(() => {
    socket.on("sync:tasks", (serverTasks) => {
      setTasks(serverTasks);
    });

    socket.on("task:created", (task) => {
      toast.success("Task added Successfully");
      setTasks((prev) => [...prev, task]);
    });

    socket.on("task:updated", ({ id, updates }) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updates } : t)),
      );
    });

    socket.on("task:moved", ({ id, status }) => {
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
    });

    socket.on("task:deleted", (id) => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    });

    return () => {
      socket.off("sync:tasks");
      socket.off("task:created");
      socket.off("task:updated");
      socket.off("task:moved");
      socket.off("task:deleted");
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        defaultCategories,
        defaultPriority,
        defaultStatus,
        tasks,
        newTask,
        setNewTask,
        description,
        setDescription,
        category,
        setCategory,
        priority,
        setPriority,
        status,
        setStatus,
        file,
        setFile,
        preview,
        setPreview,
        submitForm,
        updateForm,
        move,
        deleteForm,
        isLight,
        setIsLight,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// ---------- Hook ----------
export const useApp = () => useContext(AppContext);
