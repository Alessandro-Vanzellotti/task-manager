import "./Home.scss";
import { TaskType } from "../../types";
import { Task } from "../../components/Task/Task";
import { NewTaskForm } from "../../components/NewTaskForm/NewTaskForm";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { getAllTasks } from "../../api/api";

export default function Home() {
  const [taskList, setTaskList] = useState<TaskType[]>([]);
  const [taskProgress, setTaskProgress] = useState({pending: 0, inProgress: 0, done: 0});

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

  useEffect(() => {
    let isPending = 0;
    let isInProgress = 0;
    let isDone = 0;

    taskList.forEach((task: TaskType) => {
      switch(task.progress) {
        case 'Pending':
          isPending++;
          console.log('pending');
          break;
        case 'In progress':
          isInProgress++;
          console.log('in progress');
          break;
        case 'Done':
          isDone++;
          console.log('complete');
          break;
      }
    });
    setTaskProgress({pending: isPending, inProgress: isInProgress, done: isDone});
  }, [taskList.length])

  return (
    <>
      <header className={"header"}>
        <div className={"header__status-board"}>
          <p>{`All: ${taskList.length}`}</p>
          <p>{`Pending: ${taskProgress.pending}`}</p>
          <p>{`In progress: ${taskProgress.inProgress}`}</p>
          <p>{`Done: ${taskProgress.done}`}</p>
        </div>
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
