import { useState } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../constants";
import { useApp } from "../../Context";
import { useEffect } from "react";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./index.css";

const CardItem = ({ task }) => {
  const {
    defaultStatus,
    defaultCategories,
    defaultPriority,
    setDescription,
    setCategory,
    setPriority,
    setStatus,
    updateForm,
    deleteForm,
    isLight,
  } = useApp();
  // console.log(task);
  const [open, setOpen] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const getPriorityColor = () => {
    if (task.priority === defaultPriority.high) return "red";
    if (task.priority === defaultPriority.medium) return "yellow";
    return "green";
  };

  const openFile = () => {
    console.log("///////////////////////");
    console.log(task);
    if (!task.file) return;
    let fileBuffer = task.file;

    // If coming from Node Buffer
    if (fileBuffer.type === "Buffer") {
      fileBuffer = new Uint8Array(fileBuffer.data).buffer;
    }

    const blob = new Blob([fileBuffer], { type: task.fileType });
    const url = URL.createObjectURL(blob);

    window.open(url, "_blank");

    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };

  /*  function detectFileType(buffer) {
    const bytes = new Uint8Array(buffer);

    if (bytes[0] === 0x89 && bytes[1] === 0x50) return "PNG Image";
    if (bytes[0] === 0xff && bytes[1] === 0xd8) return "JPEG Image";
    if (bytes[0] === 0x47 && bytes[1] === 0x49) return "GIF Image";
    if (bytes[0] === 0x25 && bytes[1] === 0x50) return "PDF";
    if (bytes[0] === 0x50 && bytes[1] === 0x4b) return "ZIP File";

    return "Unknown file type";
  } */

  return (
    <>
      <div
        ref={drag}
        className={`${isLight ? "card-item" : "card-item light"}`}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        onDoubleClick={() => {
          setDescription(task.description);
          setCategory(task.category);
          setPriority(task.priority);
          setStatus(task.status);
          setOpen(true);
        }}
      >
        <div className="card-top">
          <p className="title">{task.title}</p>

          <p className={getPriorityColor()}>
            <span>•</span>
            {task.priority}
          </p>
        </div>

        <div className="card-body">
          <p>{task.description}</p>
        </div>

        <div className="card-bottom">
          <div className="source">
            {task.file && (
              <button onClick={openFile}>
                {task?.fileType?.startsWith("image/")
                  ? "🖼️ Open Img"
                  : "📁 Open file"}
              </button>
            )}
          </div>

          <p className="category">{task.category}</p>
        </div>
      </div>

      <Popup open={open} modal onClose={() => setOpen(false)}>
        {(close) => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>

            <div className="header">Edit Card Details</div>

            <div className="content">
              <ul>
                <li>
                  <p>Title</p>
                  <input type="text" value={task.title} readOnly />
                </li>

                <li>
                  <p>Description</p>
                  <textarea
                    defaultValue={task.description}
                    placeholder="Description of the task..."
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </li>

                <li>
                  <p>Category</p>
                  <select
                    value={task.category}
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
                </li>

                <li>
                  <p>Priority</p>
                  <select
                    value={task.priority}
                    className="priority"
                    onChange={(e) => setPriority(e.target.value)}
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
                </li>

                <li>
                  <p>Status</p>
                  <select
                    value={task.status}
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
                </li>
              </ul>
            </div>

            <div className="actions">
              <button
                className="button"
                onClick={() => {
                  updateForm(task.id);
                  close();
                }}
              >
                Save
              </button>

              <button
                className="button delete"
                onClick={() => deleteForm(task.id)}
              >
                Delete
              </button>

              <button className="button close" onClick={close}>
                Close
              </button>
            </div>
          </div>
        )}
      </Popup>
    </>
  );
};

export default CardItem;
