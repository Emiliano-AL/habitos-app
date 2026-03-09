export type Priority = "low" | "medium" | "high";

export type Habit = {
  id: string;
  title: string;
  priority: Priority;
  createdAt: string;
  lastDoneAt: string | null;
  streak: number;
  isCompleted: boolean;
};
