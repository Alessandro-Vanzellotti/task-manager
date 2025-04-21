import { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import { TaskType } from '../types';
import { Task } from '../components/Task/Task';
import { TaskForm } from '../components/TaskForm/TaskForm';
import { v4 as uuidv4 } from 'uuid';

export default function App() {

  const [taskList, setTaskList] = useState<TaskType[]>(() => {
    const localValue = localStorage.getItem("ITEMS");
    if(localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(taskList))
  }, [taskList]);

  /* const handleTitleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setNewTask({...newTask, title: event.target.value});
  }

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setNewTask({...newTask, description: event.target.value});
  } */

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

    const addTask = (newTask: TaskType) => {
      setTaskList([...taskList, newTask])
    }
    
  const removeTask = (itemToRemove: TaskType) => {
    const updatedTaskList: TaskType[] = taskList.filter(item => item.title != itemToRemove.title);
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
        <TaskForm addNewTask={addTask} taskList={taskList} />
      </header>

      <main>
        <ul>
          {taskList.map((task: TaskType) => {

            return (
              task.beingEdited ?
              <TaskForm 
                task={task}
                addNewTask={addTask}
                taskList={taskList}
              />
              :
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