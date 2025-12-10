import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Toolbar from "./components/Toolbar";
import KanbanBoard from "./components/KanbanBoard";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalAddTask from "./components/ModalAddTask";
import type { Column, Pages, Task, TaskStatus } from "./components/types";
import ModalDeleteAllTask from "./components/ModalDeleteAllTask";
import Config from "./components/Config";

export default function App() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteAllTaskModal, setShowDeleteAllTaskModal] = useState(false);
  const [columns, setColumns] = useState<Column[]>([]);
  const [colors, setColors] = useState<string[]>(() => {
    const saved = localStorage.getItem("colors");
    return saved
      ? JSON.parse(saved)
      : ["#6366f1", "#ec4899", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4"];
  });

  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [page, setPage] = useState<Pages>("dashboard");

  // load board
  useEffect(() => {
    const saved = localStorage.getItem("columns");

    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setColumns(parsed);
        setHasLoaded(true);
        return;
      }
    }

    // DEFAULT STATE
    setColumns([
      { id: "todo", title: "To Do", tasks: [] },
      { id: "doing", title: "In Progress", tasks: [] },
      { id: "done", title: "Done", tasks: [] },
    ]);

    setColors([]);

    setHasLoaded(true);
  }, []);

  // load colors
  useEffect(() => {
    const saved = localStorage.getItem("colors");
    if (saved) {
      setColors(JSON.parse(saved));
    }
  }, []);

  // save colors
  useEffect(() => {
    if (Array.isArray(colors)) {
      localStorage.setItem("colors", JSON.stringify(colors));
    }
  }, [colors]);

  // save board
  useEffect(() => {
    if (!hasLoaded) return;
    localStorage.setItem("columns", JSON.stringify(columns));
  }, [columns, hasLoaded]);

  const addTask = (
    title: string,
    description: string,
    status: TaskStatus,
    color: string
  ) => {
    const newTask: Task = {
      id: "task-" + Date.now(),
      title,
      description,
      status,
      color,
    };

    setColumns((prev) =>
      prev.map((col) =>
        col.id === status ? { ...col, tasks: [...col.tasks, newTask] } : col
      )
    );
  };

  const deleteAllTask = () => {
    setColumns([
      { id: "todo", title: "To Do", tasks: [] },
      { id: "doing", title: "In Progress", tasks: [] },
      { id: "done", title: "Done", tasks: [] },
    ]);
  };

  return (
    <div
      style={{
        display: "flex",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "hidden",
      }}
    >
      <Sidebar page={page} setPage={setPage} />

      <div
        style={{
          flex: 1,
          padding: "24px",
          overflowY: "auto",
          height: "100vh",
        }}
      >
        {page === "dashboard" && (
          <Toolbar
            onAddTaskClick={() => setShowCreateModal(true)}
            onDeleteAllTaskClick={() => setShowDeleteAllTaskModal(true)}
          />
        )}

        {page === "dashboard" && (
          <KanbanBoard
            columns={columns}
            setColumns={setColumns}
            openModal={() => setShowCreateModal(true)}
          />
        )}

        {page === "config" && <Config colors={colors} setColors={setColors} />}

        <ModalAddTask
          show={showCreateModal}
          colorsList={colors}
          onClose={() => setShowCreateModal(false)}
          onAddTask={addTask}
        />

        <ModalDeleteAllTask
          show={showDeleteAllTaskModal}
          onClose={() => setShowDeleteAllTaskModal(false)}
          onDeleteAllTask={deleteAllTask}
        />
      </div>
    </div>
  );
}
