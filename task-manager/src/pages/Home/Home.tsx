import { useEffect } from 'react';
import './Home.scss';
import { TaskType } from '../../types';
import { Task } from '../../components/Task/Task';
import { NewTaskForm } from '../../components/NewTaskForm/NewTaskForm';
import { v4 as uuidv4 } from 'uuid';
import { useTaskListContext } from '../../TaskListContext';


export default function Home() {

  const {taskList, setTaskList} = useTaskListContext();

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

    const addNewTask = (newTask: TaskType) => {
      setTaskList([...taskList, newTask]);
    }
    
  const removeTask = (taskToRemove: TaskType) => {
    const updatedTaskList: TaskType[] = taskList.filter(item => item.title != taskToRemove.title);
    setTaskList(updatedTaskList);
  }

  useEffect(() => {
    console.log(taskList);
  },[taskList])
  

  return (
    <>
      <header className={'header'}>
        <h2>Choose a task!</h2>
        <NewTaskForm addNewTask={addNewTask} />
      </header>

      <main>
        <ul className={'task-list'}>
          {taskList.map((task: TaskType) => {

            return (
              <Task
                key={uuidv4()} 
                task={task}
                removeTask={removeTask}
              />
            )
          })}
        </ul>
      </main>
    </>
  )
}