import { useState } from "react";

interface Props {
  onAdd: (text: string) => void;
}

export default function AddTaskBox({ onAdd }: Props) {
  const [text, setText] = useState("");

  const submit = () => {
    if (text.trim() === "") return;
    onAdd(text);
    setText("");
  };

  return (
    <div style={{ marginTop: 12 }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add task..."
        style={{
          width: "100%",
          padding: 8,
          borderRadius: 4,
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={submit}
        style={{
          marginTop: 8,
          width: "100%",
          padding: 8,
          border: "none",
          borderRadius: 4,
          background: "#007bff",
          color: "white",
          cursor: "pointer",
        }}
      >
        Add Task
      </button>
    </div>
  );
}
