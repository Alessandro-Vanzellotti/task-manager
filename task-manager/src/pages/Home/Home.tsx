import "./Home.scss";
import { TaskType } from "../../types";
import { Task } from "../../components/Task/Task";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { getAllTasks } from "../../api/api";
import { Dashboard } from '../../components/Dashboard/Dashboard';
import { Search } from "../../components/Search/Search";
import { Modal } from "../../components/Modal/Modal";

export default function Home() {
  const [taskList, setTaskList] = useState<TaskType[]>([]);
  const [search, setSearch] = useState<string>("");
  const regexp = new RegExp(search, "i");

  const [modal, setModal] = useState<boolean>(false);
  const toggleModal = () => setModal(!modal);

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

      <section className={'filter'}>
          <Search search={search} setSearch={setSearch} />
          <p>All (6)</p>
          <p>Pending (1)</p>
          <p>In progress (2)</p>
          <p>Done (1)</p>
        </section>

      <main className={'content'}>
        <Dashboard taskList={taskList}/>
        {modal && (<Modal modal={modal} toggleModal={toggleModal} />)}

        <div className={'content__labels'}>
          <p className={'title'} >Title</p>
          <p className={'progress'}>Progress</p>
          <p className={'priority-level'}>Prioritty Level</p>
        </div>
        <ul className={"content__task-list"}>
          {taskList.map((task: TaskType) => {
            if (task.title.match(regexp)) {
              return (
                <Task key={uuidv4()} toggleModal={toggleModal} task={task} setTaskList={setTaskList} />
              );
            } else {
              return "";
            }
          })}
        </ul>
      </main>
    </div>
  );
}
