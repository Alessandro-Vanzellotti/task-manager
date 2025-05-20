import { useEffect, useState } from "react";
import { Search } from "../../components/Search/Search";
import { Task } from "../../components/Task/Task";
import { TaskType } from "../../types";
import { v4 as uuidv4 } from "uuid";
import { getAllTasks } from "../../api/api";
import { Dashboard } from "../../components/Dashboard/Dashboard";
import './TaskList.scss';

export default function TaskList() {
  const [search, setSearch] = useState<string>("");
  const regexp = new RegExp(search, "i");
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
      <header className={'task-list__header'}>
        <Search search={search} setSearch={setSearch} />
        <Dashboard taskList={taskList} />
      </header>

      <main>
        <ul className={"task-list"}>
          {taskList.map((task: TaskType) => {
            if (task.title.match(regexp)) {
              return (
                <Task key={uuidv4()} task={task} setTaskList={setTaskList} />
              );
            } else {
              return "";
            }
          })}
        </ul>
      </main>
    </>
  );
}
