import { useEffect } from 'react';
import './Home.css';
import { TaskType } from '../../types';
import { Task } from '../../components/Task/Task';
import { TaskForm } from '../../components/TaskForm/TaskForm';
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

  const editTask = (itemToEdit: TaskType) => {
    const editedTask = taskList.find(task => task.title === itemToEdit.title);
    if (!editedTask) return

    editedTask.beingEdited = !editedTask.beingEdited;
  }

  useEffect(() => {
    console.log(taskList);
  },[taskList])
  

  return (
    <>
      <header>
        <h1>Task Manager:</h1>
        <TaskForm addNewTask={addNewTask} />
      </header>

      <main>
        <ul>
          {taskList.map((task: TaskType) => {

            return (
              <Task
                key={uuidv4()} 
                task={task}
                removeTask={removeTask}
                editTask={editTask}
              />
            )
          })}
        </ul>
      </main>
    </>
  )
}