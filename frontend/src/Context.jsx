// Context.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const AppContext = createContext(null);

const socket = io("https://submission-backend-mbi5.onrender.com");

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

export const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // form state (kept exactly as you had it)
  const [newTask, setNewTask] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(defaultCategories.bug);
  const [priority, setPriority] = useState(defaultPriority.low);
  const [status, setStatus] = useState(defaultStatus.todo);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // ---------- actions ----------
  const submitForm = (e) => {
    e.preventDefault();

    socket.emit("task:create", {
      title: newTask,
      description,
      category,
      priority,
      status,
      file,
    });

    setNewTask("");
    setDescription("");
    setCategory(defaultCategories.bug);
    setPriority(defaultPriority.low);
    setStatus(defaultStatus.todo);
    setFile(null);
    setPreview(null);
  };

  const updateForm = (id) => {
    socket.emit("task:update", {
      id,
      updates: { description, category, priority, status },
    });
  };

  const move = ({ id, status }) => {
    socket.emit("task:move", { id, status });
  };

  const deleteForm = (id) => {
    socket.emit("task:delete", id);
  };

  // ---------- socket listeners ----------
  useEffect(() => {
    socket.on("sync:tasks", (serverTasks) => {
      setTasks(serverTasks);
    });

    socket.on("task:created", (task) => {
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
        setTasks,
        newTask,
        setNewTask,
        description,
        setDescription,
        move,
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
        deleteForm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
