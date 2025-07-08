import "./Home.scss";
import { TaskType } from "../../types";
import { Task } from "../../components/Task/Task";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { getAllTasks } from "../../api/api";
import { Dashboard } from '../../components/Dashboard/Dashboard';
import { Filters } from "../../components/Filters/Filters";
import { NewTask } from "../../components/NewTask/NewTask";
import { TaskModal } from "../../components/TaskModal/TaskModal";

export default function Home() {
  const [taskList, setTaskList] = useState<TaskType[]>([]);
  const [taskFilter, setTaskFilter] = useState<string>('All');
  const [search, setSearch] = useState<string>("");
  const regexp = new RegExp(search, "i");

  const filterTasksByProgress = (list: TaskType[]) => {
    const filteredTasks: TaskType[] = list;
    if (taskFilter === 'All') return list;
    return filteredTasks.filter(task => task.progress === taskFilter);
  }

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
    <div className={'wrapper'}>

      <Filters taskFilter={taskFilter} setTaskFilter={setTaskFilter} search={search} setSearch={setSearch} taskList={taskList} />

      <main className={'content'}>
        <Dashboard taskList={taskList}/>
        <div className={'content__labels'}>
          <p className={'label title'} >Title</p>
          <p className={'label progress'}>Progress</p>
          <p className={'label priority-level'}>Priority Level</p>
        </div>
        <div className={"content__task-list"}>
          <NewTask taskList={taskList} setTaskList={setTaskList} />
          {filterTasksByProgress(taskList).map((task: TaskType) => {
            if (task.title.match(regexp)) {
              return (
                <Task key={uuidv4()} task={task} setTaskList={setTaskList} />
              );
            } else {
              return "";
            }
          })}
        </div>
      </main>
    </div>
  );
}
