import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import KanbanBoard from "./components/KanbanBoard";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalAddTask from "./components/ModalAddTask";
import type { Column, Task, TaskStatus } from "./components/types";

export default function App() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [columns, setColumns] = useState<Column[]>([]);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
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

    setColumns([
      { id: "todo", title: "To Do", tasks: [] },
      { id: "doing", title: "In Progress", tasks: [] },
      { id: "done", title: "Done", tasks: [] },
    ]);

    setHasLoaded(true);
  }, []);

  // save
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
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "24px",
          overflowY: "auto",
          height: "100vh",
        }}
      >
        <TopBar onAddTaskClick={() => setShowCreateModal(true)} />

        <KanbanBoard
          columns={columns}
          setColumns={setColumns}
          openModal={() => setShowCreateModal(true)}
        />

        <ModalAddTask
          show={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onAddTask={addTask}
        />
      </div>
    </div>
  );
}
