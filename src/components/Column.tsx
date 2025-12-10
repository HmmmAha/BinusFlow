import { Droppable } from "@hello-pangea/dnd";
import type { Column as ColumnType } from "./types";
import TaskItem from "./TaskItem";

interface Props {
  column: ColumnType;
  openAddModal: () => void;
}

export default function Column({ column }: Props) {
  const getColumnColor = (id: string) => {
    switch (id) {
      case "todo": return "#e74c3c";
      case "doing": return "#f39c12";
      case "done": return "#27ae60";
      default: return "#95a5a6";
    }
  };


  return (
    <Droppable droppableId={column.id}>
      {(provided, snapshot) => (
        <div
          style={{
            background: snapshot.isDraggingOver ? "#ecf0f1" : "#f8f9fa",
            padding: "16px",
            borderRadius: "12px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            transition: "background 0.2s",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            minWidth: "300px",
            alignSelf: "flex-start"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
              paddingBottom: "12px",
              borderBottom: `3px solid ${getColumnColor(column.id)}`
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: "700",
                color: "#2c3e50",
                flex: 1
              }}
            >
              {column.title}
            </h3>
            <span
              style={{
                background: getColumnColor(column.id),
                color: "white",
                padding: "4px 12px",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "600"
              }}
            >
              {column.tasks.length}
            </span>
          </div>

          <div 
            ref={provided.innerRef} 
            {...provided.droppableProps}
            style={{
              minHeight: "200px",
              flex: 1
            }}
          >
            {column.tasks.map((task, index) => (
              <TaskItem key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}
