import { Draggable } from "@hello-pangea/dnd";
import type { Task } from "./types";

interface Props {
  task: Task;
  index: number;
}

export default function TaskItem({ task, index }: Props) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            background: "white",
            padding: "16px",
            marginBottom: "12px",
            borderRadius: "8px",
            borderLeft: `4px solid ${task.color}`,
            boxShadow: snapshot.isDragging 
              ? "0 8px 16px rgba(0,0,0,0.2)" 
              : "0 2px 4px rgba(0,0,0,0.1)",
            cursor: "grab",
            transition: "box-shadow 0.2s",
            ...provided.draggableProps.style
          }}
        >
          <h4 style={{ 
            margin: "0 0 8px 0", 
            fontSize: "16px", 
            fontWeight: "600",
            color: "#2c3e50"
          }}>
            {task.title}
          </h4>
          <p style={{ 
            margin: 0, 
            fontSize: "14px", 
            color: "#7f8c8d",
            lineHeight: "1.4"
          }}>
            {task.description}
          </p>
        </div>
      )}
    </Draggable>
  );
}
