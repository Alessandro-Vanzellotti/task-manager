import { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import { Task as TaskType } from './types';
import { Task } from './Task';
import { NewTaskForm } from './NewTaskForm';
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [newTask, setNewTask] = useState<TaskType>({
    id: uuidv4(),
    text: "", 
    isCompleted: false
  });

  const [taskList, setTaskList] = useState<TaskType[]>(() => {
    const localValue = localStorage.getItem("ITEMS");
    if(localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(taskList))
  }, [taskList]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setNewTask({id: uuidv4(), text: event.target.value, isCompleted: false});
    console.log(newTask.text);
  }

  const addNewTask = (text: string) => {
    
    let doubledTask: boolean = false;

    if(text.trim().length === 0) {
      setNewTask({...newTask, text: ""});
      alert('Please, type a task');
      return;
    }

    taskList.forEach(task => {
      if (task.text === text) doubledTask = true;
    })

    if(doubledTask) {
      alert('The task is already on the list');
    } else {
      setTaskList([...taskList, newTask]);
      setNewTask({...newTask, text: ""});
    }
  }
    
  const removeTask = (itemToRemove: TaskType) => {
    const updatedTaskList: TaskType[] = taskList.filter(item => item.text != itemToRemove.text);
    setTaskList(updatedTaskList);
  }

  const editTask = (itemToEdit: TaskType) => {
    const taskIndex: number = taskList.findIndex(item => item.text == itemToEdit.text);
    console.log(taskIndex);
  }

  const toggleTask = (id: string) => {
    const updatedTaskList: TaskType[] = taskList.map(item => {
      if(item.id === id) {
        return {...item, isCompleted: !item.isCompleted}
      }
      return item;
    });
    setTaskList(updatedTaskList);
  }

  useEffect(() => {
    console.log(taskList);
  },[taskList])
  

  return (
    <>
      <header>
        <h2>Task Manager:</h2>
        <NewTaskForm addNewTask={addNewTask} handleChange={handleChange} newTask={newTask} />
      </header>

      <main>
        <ul>
          {taskList.map((task: TaskType) => {
            return (
              <Task
                key={task.id} 
                task={task} 
                toggleTask={toggleTask}
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
