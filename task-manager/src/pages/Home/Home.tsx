import "./Home.scss";
import { TaskType } from "../../types";
import { Task } from "../../components/Task/Task";
import { NewTaskForm } from "../../components/NewTaskForm/NewTaskForm";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { getAllTasks } from "../../api/api";

export default function Home() {
  const [taskList, setTaskList] = useState<TaskType[]>([]);

  useEffect(() => {
    const getTaskList = async () => {
      try {
        const data = await getAllTasks();
        setTaskList(data);
      } catch (error) {
        console.error(error);
      }
    };
    getTaskList();
  }, [setTaskList]);

  return (
    <>
      <header className={"header"}>
        <NewTaskForm taskList={taskList} setTaskList={setTaskList} />
      </header>

      <main>
        <ul className={"task-list"}>
          {taskList.map((task: TaskType) => {
            return (
              <Task key={uuidv4()} task={task} setTaskList={setTaskList} />
            );
          })}
        </ul>
      </main>
    </>
  );
}
