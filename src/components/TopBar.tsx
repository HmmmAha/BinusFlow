export default function TopBar({ onAddTaskClick }: { onAddTaskClick: () => void }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "16px 24px",
        marginBottom: "24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}
    >
      <h2 style={{ margin: 0, color: "#2c3e50", fontSize: "24px", fontWeight: "600" }}>
        My Kanban Board
      </h2>
      <button
        onClick={onAddTaskClick}
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          border: "none",
          color: "white",
          padding: "10px 24px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          transition: "transform 0.2s, box-shadow 0.2s",
          boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)"
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 6px 16px rgba(102, 126, 234, 0.5)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.4)";
        }}
      >
        <span style={{ fontSize: "20px" }}>+</span>
      </button>
    </div>
  );
}
