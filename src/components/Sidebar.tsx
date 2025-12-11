import { useState } from "react";
import type { Pages } from "./types";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const itemBaseStyle: React.CSSProperties = {
    padding: "12px",
    cursor: "pointer",
    borderRadius: "6px",
    marginBottom: "8px",
    transition: "background 0.2s",
  };

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
        boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
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
          transition: "background 0.2s",
        }}
      >
        {collapsed ? ">>" : "<<"}
      </button>

      {/* Dashboard */}
      <div
        onClick={() => navigate("/")}
        style={{
          ...itemBaseStyle,
          background: isActive("/") ? "rgba(255,255,255,0.2)" : "transparent",
          fontWeight: isActive("/") ? "700" : "400",
        }}
      >
        {!collapsed && "Dashboard"}
      </div>

      {/* Config */}
      <div
        onClick={() => navigate("/config")}
        style={{
          ...itemBaseStyle,
          background: isActive("/config")
            ? "rgba(255,255,255,0.2)"
            : "transparent",
          fontWeight: isActive("/config") ? "700" : "400",
        }}
      >
        {!collapsed && "Configuration"}
      </div>
    </div>
  );
}
