import './Home.scss';
import { TaskType } from '../../types';
import { Task } from '../../components/Task/Task';
import { NewTaskForm } from '../../components/NewTaskForm/NewTaskForm';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { getAllTasks } from '../../api/api';


export default function Home() {

  const [taskList, setTaskList] = useState<TaskType[]>([]);

  /* const addNewTask = (task: TaskType) => {
    
    let existingTask: boolean = false;
    let trimmedTitle: string = task.title.trim();

    if(trimmedTitle.length === 0) {
      setNewTask({ 
        title: "", 
        description: "", 
        progress: "Pending", 
        priorityLevel: "None",
        beingEdited: false
      });
      alert('Please, type a task');
      return;
    }

    taskList.forEach(task => {
      if (task.title === trimmedTitle) existingTask = true;
    })

    if(existingTask) {
      alert('The task is already on the list');
    } else {
      setNewTask({
        title: task.title,
        description: task.description,
        priorityLevel: task.priorityLevel,
        progress: task.progress,
        beingEdited: false
      })
      setTaskList([...taskList, newTask]);
      setNewTask({ 
        title: "", 
        description: "", 
        progress: "Pending", 
        priorityLevel: "None",
        beingEdited: false
      });
    }
  } */

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
  }, [setTaskList])
  

  return (
    <>
      <header className={'header'}>
        <h2>Choose a task!</h2>
        <NewTaskForm />
      </header>

      <main>
        <ul className={'task-list'}>
          {taskList.map((task: TaskType) => {

            return (
              <Task
                key={uuidv4()} 
                task={task}
                setTaskList={setTaskList}
              />
            )
          })}
        </ul>
      </main>
    </>
  )
}