import { createContext, useContext } from "react"
import { TaskType } from "./types"

export type GlobalContent = {
  taskList: TaskType[]
  setTaskList:(taskList: TaskType[]) => void
};

export const TaskListContext = createContext<GlobalContent>({
  taskList: [],
  setTaskList: () => {},
});

export const useTaskListContext = () => useContext(TaskListContext);