import "./index.css";
import Column from "../Column/Column.jsx";
import { useApp } from "../../Context.jsx";
import { TaskprogressChart } from "../TaskProgressChart//TaskprogressChart.jsx";
import { useEffect } from "react";

function KanbanBoard() {
  // TODO: Implement state and WebSocket logic
  const {
    defaultCategories,
    defaultPriority,
    defaultStatus,
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
    isLight,
  } = useApp();
  useEffect(() => {
    return () => preview && URL.revokeObjectURL(preview);
  }, [preview]);
  const { tasks } = useApp();
  const todoCount = tasks.filter((t) => t.status === defaultStatus.todo).length;
  const inProgressCount = tasks.filter(
    (t) => t.status === defaultStatus.inprogress,
  ).length;
  const doneCount = tasks.filter((t) => t.status === defaultStatus.done).length;

  //FileSystem.......
  const handleChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Optional: limit size (example 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (selectedFile.size > MAX_SIZE) {
      alert("File too large (Max 5MB)");
      return;
    }

    setFile(selectedFile);

    // Clean previous preview
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }

    // Create preview only for images
    if (selectedFile.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  return (
    <div className="kanban-board">
      <div className={`${isLight ? "board" : "board light"}`}>
        <h3>CREATE A TASK</h3>
        <ul className="task-section">
          <form onSubmit={submitForm}>
            <li>
              <div className="text-section">
                <label htmlFor="task">Task*</label>
                <input
                  type="text"
                  required
                  value={newTask}
                  placeholder="Enter task..."
                  onChange={(e) => setNewTask(e.target.value)}
                />
                <label htmlFor="task">Description</label>
                <textarea
                  value={description}
                  id="description"
                  placeholder="Description of the task..."
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </li>
            <li>
              <div className="text-section">
                <div className="inputs">
                  <label htmlFor="category">Category</label>
                  <select
                    name=""
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value={defaultCategories.bug}>
                      {defaultCategories.bug}
                    </option>
                    <option value={defaultCategories.feature}>
                      {defaultCategories.feature}
                    </option>
                    <option value={defaultCategories.enhancement}>
                      {defaultCategories.enhancement}
                    </option>
                  </select>
                </div>
                <div className="inputs">
                  <label htmlFor="priority">Priority</label>
                  <select
                    name=""
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="priority"
                  >
                    <option value={defaultPriority.low}>
                      {defaultPriority.low}
                    </option>
                    <option value={defaultPriority.medium}>
                      {defaultPriority.medium}
                    </option>
                    <option value={defaultPriority.high}>
                      {defaultPriority.high}
                    </option>
                  </select>
                </div>
                <div className="inputs">
                  <label htmlFor="status">Status</label>
                  <select
                    name=""
                    value={status}
                    id="status"
                    className="priority"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value={defaultStatus.todo}>
                      {defaultStatus.todo}
                    </option>
                    <option value={defaultStatus.inprogress}>
                      {defaultStatus.inprogress}
                    </option>
                    <option value={defaultStatus.done}>
                      {defaultStatus.done}
                    </option>
                  </select>
                </div>
              </div>
            </li>
            <li className="drag-drop-file">
              <input type="file" onChange={handleChange} />
              {(!file || !preview) && (
                <p>
                  Simply click here to add <br /> a file/image.
                </p>
              )}
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  style={{ width: "200px", marginTop: "10px" }}
                  className="preview-img"
                />
              )}
              {file && (
                <div className="file-info">
                  <p>
                    <strong>Name:</strong> {file.name}
                  </p>
                  <p>
                    <strong>Type:</strong> {file.type}
                  </p>
                  <p>
                    <strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              )}
            </li>
            <button type="submit">Add Task</button>
          </form>
        </ul>
        {/* TODO: Implement task rendering and interactions */}
      </div>
      <TaskprogressChart />
      <section id="todo" className={`${isLight ? "todo" : "todo light"}`}>
        <div className="scroll">
          <div className="col">
            <div className="main-headding todo">
              <h3>Todo</h3>
              <p>{todoCount}</p>
            </div>
            <Column title="Todo" status={defaultStatus.todo} />
          </div>
          <div className="col">
            <div className="main-headding in-progress">
              <h3>In Progress</h3>
              <p>{inProgressCount}</p>
            </div>
            <Column title="In Progress" status={defaultStatus.inprogress} />
          </div>
          <div className="col">
            <div className="main-headding completed">
              <h3>Completed</h3>
              <p>{doneCount}</p>
            </div>
            <Column title="Done" status={defaultStatus.done} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default KanbanBoard;
