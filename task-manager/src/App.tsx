import { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import { TaskType } from './types';
import { Task } from './components/Task/Task';
import { NewTaskForm } from './components/NewTaskForm/NewTaskForm';
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [newTask, setNewTask] = useState<TaskType>({
    title: "",
    description: "",
    priorityLevel: "",
    progress: "",
    beingEdited: false
  });

  const [taskList, setTaskList] = useState<TaskType[]>(() => {
    const localValue = localStorage.getItem("ITEMS");
    if(localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(taskList))
  }, [taskList]);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setNewTask({...newTask, title: event.target.value});
  }

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setNewTask({...newTask, description: event.target.value});
  }

  const addNewTask = (task: TaskType) => {
    
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
      setTaskList([...taskList, newTask]);
      setNewTask({ 
        title: "", 
        description: "", 
        progress: "Pending", 
        priorityLevel: "None",
        beingEdited: false
      });
    }
  }
    
  const removeTask = (itemToRemove: TaskType) => {
    const updatedTaskList: TaskType[] = taskList.filter(item => item.title != itemToRemove.title);
    setTaskList(updatedTaskList);
  }

  const editTask = (itemToEdit: TaskType) => {
    
    itemToEdit.beingEdited = !itemToEdit.beingEdited;
  }

  /* const toggleTask = (id: string) => {
    const updatedTaskList: TaskType[] = taskList.map(item => {
      if(item.id === id) {
        return {...item, isCompleted: !item.isCompleted}
      }
      return item;
    });
    setTaskList(updatedTaskList);
  } */

  useEffect(() => {
    console.log(taskList);
  },[taskList])
  

  return (
    <>
      <header>
        <h1>Task Manager:</h1>
        <NewTaskForm 
          addNewTask={addNewTask} 
          handleTitleChange={handleTitleChange}
          handleDescriptionChange={handleDescriptionChange}
          newTask={newTask} 
        />
      </header>

      <main>
        <ul>
          {taskList.map((task: TaskType) => {
            return (
              <Task
                key={uuidv4()} 
                task={task} 
                //toggleTask={toggleTask}
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

export default App
