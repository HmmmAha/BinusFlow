import React from "react";

interface Props {
  show: boolean;
  onClose: () => void;
  onDeleteAllTask: () => void;
}

const ModalDeleteAllTask: React.FC<Props> = ({
  show,
  onClose,
  onDeleteAllTask,
}) => {
  const handleSubmit = () => {
    onDeleteAllTask();
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
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ marginTop: 0, color: "#2c3e50", fontSize: "24px" }}>
          Delete All Task
        </h3>
        <br></br>

        <h6>Are you sure you want to delete all tasks?</h6>
        <h6 style={{ color: "	#800000" }}>This action cannot be undone.</h6>


        <br />
        <div
          style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "12px 24px",
              borderRadius: "8px",
              border: "none",
              background: "#acacacff",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
              color: "white",
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
              border: "2px solid #ee2400",
              background: "white",
              color: "#ee2400",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteAllTask;
