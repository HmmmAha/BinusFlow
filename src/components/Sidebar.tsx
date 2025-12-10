import { useState } from "react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`sidebar ${collapsed ? "collapsed" : ""}`}
      style={{
        width: collapsed ? "70px" : "220px",
        backgroundColor: "#2c3e50",
        color: "white",
        transition: "width 0.3s ease",
        minHeight: "100vh",
        padding: "1rem",
        boxShadow: "2px 0 10px rgba(0,0,0,0.1)"
      }}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          background: "rgba(255,255,255,0.1)",
          border: "none",
          color: "white",
          padding: "8px 12px",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "1.5rem",
          width: "100%",
          transition: "background 0.2s"
        }}
        onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
        onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
      >
        {collapsed ? ">>" : "<<"}
      </button>

      <div
        style={{
          padding: "12px",
          cursor: "pointer",
          borderRadius: "6px",
          marginBottom: "8px",
          transition: "background 0.2s"
        }}
        onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
        onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
      >
        {!collapsed && "Dashboard"}
      </div>

      <div
        style={{
          padding: "12px",
          cursor: "pointer",
          borderRadius: "6px",
          transition: "background 0.2s"
        }}
        onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
        onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
      >
        {!collapsed && "Settings"}
      </div>
    </div>
  );
};
