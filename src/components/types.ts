export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  color: string; // TODO: probably will implement an array of colors
};

export type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

export type TaskStatus = "todo" | "doing" | "done";

export type Pages = "dashboard" | "config";