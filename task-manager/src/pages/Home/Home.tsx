import "./Home.scss";
import { TaskType } from "../../types";
import { Task } from "../../components/Task/Task";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { getAllTasks } from "../../api/api";
import { Dashboard } from '../../components/Dashboard/Dashboard';
import { Search } from "../../components/Search/Search";

export default function Home() {
  const [taskList, setTaskList] = useState<TaskType[]>([]);
  const [taskFilter, setTaskFilter] = useState<string>('All');
  const [filterColor, setFilterColor] = useState('');
  const [search, setSearch] = useState<string>("");
  const regexp = new RegExp(search, "i");

  const filterColors = {
    pending: '#bdbdbd',
    inProgress: 'rgb(253 171 60)',
    done: 'rgb(3 199 117)',
    all: 'rgb(254 254 254)'
  }

  const handleFilterChange = (progress: string) => {
    setTaskFilter(progress);

    switch(progress) {
      case 'Pending':
        setFilterColor(filterColors.pending);
        break;
      case 'In progress':
        setFilterColor(filterColors.inProgress);
        break;
      case 'Done':
        setFilterColor(filterColors.done);
        break;
      default:
        setFilterColor(filterColors.all)
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

      <section className={'filters'} style={{backgroundColor: filterColor}}>
          <Search search={search} setSearch={setSearch} />
          <p className={'filters__tag'} onClick={() => handleFilterChange('All')}>{`All (${taskList.length})`}</p>
          <p className={'filters__tag'} onClick={() => handleFilterChange('Pending')}>{`Pending (${getProgressCount('Pending')})`}</p>
          <p className={'filters__tag'} onClick={() => handleFilterChange('In progress')}>{`In progress (${getProgressCount('In progress')})`}</p>
          <p className={'filters__tag'} onClick={() => handleFilterChange('Done')}>{`Done (${getProgressCount('Done')})`}</p>
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
