import React, { useState } from "react";
import type { TaskStatus } from "./types";

interface Props {
  show: boolean;
  colorsList: string[];
  onClose: () => void;
  onAddTask: (
    title: string,
    description: string,
    status: TaskStatus,
    color: string
  ) => void;
}

const ModalAddTask: React.FC<Props> = ({ show, colorsList, onClose, onAddTask }) => {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [color, setColor] = useState<string>("");
  const [error, setError] = useState<string>("");

  // useEffect(() => {
  //   const saved = localStorage.getItem("colors");
  //   if (saved) {
  //     setColorsList(JSON.parse(saved));
  //   }
  // }, []);

  const handleSubmit = () => {
    if (!title.trim()) {
      setError("Title cannot be empty.");
      return;
    }
    if (!desc.trim()) {
      setError("Description cannot be empty.");
      return;
    }
    if (!status) {
      setError("Choose a column for this task");
      return;
    }
    if (!color) {
      setError("Please choose a color.");
      return;
    }

    setError("");

    onAddTask(title, desc, status, color);
    setTitle("");
    setDesc("");
    setStatus("todo");
    setColor("");
    onClose();
  };

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          padding: "32px",
          borderRadius: "16px",
          width: "90%",
          maxWidth: "500px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ marginTop: 0, color: "#2c3e50", fontSize: "24px" }}>
          Add New Task
        </h3>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#2c3e50",
            }}
          >
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "2px solid #e0e0e0",
              fontSize: "16px",
              outline: "none",
              transition: "border-color 0.2s",
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#667eea")}
            onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
            placeholder="Enter task title"
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#2c3e50",
            }}
          >
            Description
          </label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "2px solid #e0e0e0",
              fontSize: "16px",
              minHeight: "100px",
              outline: "none",
              resize: "vertical",
              fontFamily: "inherit",
              transition: "border-color 0.2s",
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#667eea")}
            onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
            placeholder="Enter task description"
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#2c3e50",
            }}
          >
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "2px solid #e0e0e0",
              fontSize: "16px",
              outline: "none",
              cursor: "pointer",
              boxSizing: "border-box",
            }}
          >
            <option value="todo">To Do</option>
            <option value="doing">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#2c3e50",
            }}
          >
            Color
          </label>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            {colorsList.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "8px",
                  background: c,
                  border:
                    color === c ? "3px solid #2c3e50" : "3px solid transparent",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            ))}
          </div>
        </div>

        {error && <div className="alert alert-danger py-2 mt-2">{error}</div>}

        <div
          style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "12px 24px",
              borderRadius: "8px",
              border: "2px solid #e0e0e0",
              background: "white",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
              color: "#7f8c8d",
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            style={{
              padding: "12px 24px",
              borderRadius: "8px",
              border: "none",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
              boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
            }}
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddTask;
