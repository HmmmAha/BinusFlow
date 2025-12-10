import { DragDropContext } from "@hello-pangea/dnd";
import type { Column } from "./types";
import type { DropResult } from "@hello-pangea/dnd";
import ColumnComponent from "./Column";
import "../styles.css";

interface Props {
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
  openModal: () => void;
}

export default function KanbanBoard({ columns, setColumns, openModal }: Props) {
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColIndex = columns.findIndex(
      (c) => c.id === source.droppableId
    );
    const destColIndex = columns.findIndex(
      (c) => c.id === destination.droppableId
    );

    const sourceCol = columns[sourceColIndex];
    const destCol = columns[destColIndex];

    const sourceTasks = [...sourceCol.tasks];
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (sourceColIndex === destColIndex) {
      sourceTasks.splice(destination.index, 0, movedTask);
      const updated = [...columns];
      updated[sourceColIndex] = { ...sourceCol, tasks: sourceTasks };
      setColumns(updated);
      return;
    }

    const destTasks = [...destCol.tasks];
    destTasks.splice(destination.index, 0, movedTask);

    const updated = [...columns];
    updated[sourceColIndex] = { ...sourceCol, tasks: sourceTasks };
    updated[destColIndex] = { ...destCol, tasks: destTasks };

    setColumns(updated);
  };

  return (
      
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", gap: 20, overflowX: "auto", paddingBottom: "20px", alignItems: "flex-start"}}>
        {columns.map((col) => (
          <ColumnComponent
            key={col.id}
            column={col}
            openAddModal={openModal}
          />
        ))}
      </div>
    </DragDropContext>
    
  );
}
