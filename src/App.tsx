import { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import { Task as TaskType } from './types';
import { Task } from './Task';

function App() {

  const [newTask, setNewTask] = useState<TaskType>({id: 0, text: "", isCompleted: false});
  const [taskList, setTaskList] = useState<TaskType[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setNewTask({id: 0, text: event.target.value, isCompleted: false});
  }

  const addNewTask = () => {
    setTaskList([...taskList, newTask]);
    setNewTask({id: 0, text: "", isCompleted: false});
  }

  const removeTask = (itemToRemove: TaskType) => {
    const updatedTaskList: TaskType[] = taskList.filter(item => item.text != itemToRemove.text);
    setTaskList(updatedTaskList);
  }

  const editTask = (itemToEdit: TaskType) => {
    const taskIndex: number = taskList.findIndex(item => item.text == itemToEdit.text);
    console.log(taskIndex);
  }

  const toggleTask = (id: number) => {
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
        <h2>TaskType manager:</h2>
        <input type="text" onChange={handleChange} name="newTask" value={newTask.text} placeholder='Type your task' id="" />
        <input type="button" onClick={addNewTask} value="Add" />
      </header>

      <main>
        {taskList.map((task: TaskType) => {
          return (
            <Task 
              key={task.id} 
              task={task} 
              toggleTask={toggleTask}
              removeTask={removeTask} 
              editTask={editTask}/>
          )
        })}
      </main>
    </>
  )
}

export default App
