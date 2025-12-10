import React, { useState } from "react";

interface Props {
  show: boolean;
  onClose: () => void;
  onAddColor: (
    newColor: string
  ) => void;
}

const ModalAddNewColor: React.FC<Props> = ({ show, onClose, onAddColor }) => {

  const [newColor, setNewColor] = useState<string>("");

  const handleSubmit = () => {

    onAddColor(newColor);
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
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
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
            Add Color
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddNewColor;
