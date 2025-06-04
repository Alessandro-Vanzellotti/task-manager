import "./Home.scss";
import { TaskType } from "../../types";
import { Task } from "../../components/Task/Task";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { getAllTasks } from "../../api/api";
import { Dashboard } from '../../components/Dashboard/Dashboard';
import { Search } from "../../components/Search/Search";
import { progressEnum } from "../../enums";

export default function Home() {
  const [taskList, setTaskList] = useState<TaskType[]>([]);
  const [taskFilter, setTaskFilter] = useState<string>('All');
  const [search, setSearch] = useState<string>("");
  const regexp = new RegExp(search, "i");

      const getProgressClass = () => {
        switch (taskFilter) {
          case 'All': return 'progress-all';
          case progressEnum.pending: return 'progress-pending';
          case progressEnum.inProgress: return 'progress-inProgress';
          case progressEnum.done: return 'progress-done';
        }
    }

  const getProgressCount = (progress: string): string => {
    let counter = 0;

    taskList.forEach((task: TaskType) => {
      if(task.progress === progress) counter++;
    });
    return counter.toString();
  }

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

      <section className={`filters ${getProgressClass()}`} >
          <Search search={search} setSearch={setSearch} />
          <p className={'filters__tag'} onClick={() => setTaskFilter('All')}>{`All (${taskList.length})`}</p>
          <p className={'filters__tag'} onClick={() => setTaskFilter('Pending')}>{`Pending (${getProgressCount('Pending')})`}</p>
          <p className={'filters__tag'} onClick={() => setTaskFilter('In progress')}>{`In progress (${getProgressCount('In progress')})`}</p>
          <p className={'filters__tag'} onClick={() => setTaskFilter('Done')}>{`Done (${getProgressCount('Done')})`}</p>
        </section>

      <main className={'content'}>
        <Dashboard taskList={taskList}/>

        <div className={'content__labels'}>
          <p className={'label title'} >Title</p>
          <p className={'label progress'}>Progress</p>
          <p className={'label priority-level'}>Prioritty Level</p>
        </div>
        <div className={"content__task-list"}>
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
