import { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import { Task } from './interfaces/Task';

function App() {

  const [task, setTask] = useState<Task>({title: "", id: 0});
  const [taskList, setTaskList] = useState<Task[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setTask({title: event.target.value, id: taskList.length + 1});
  }

  const addNewTask = () => {
    setTaskList([...taskList, task]);
    setTask({title: "", id: 0});
  }

  useEffect(() => {
    console.log(taskList);
  },[taskList])
  

  return (
    <>
      <header>
        <h2>Task manager:</h2>
        <input type="text" onChange={handleChange} name="newTask" value={task.title} placeholder='Type your task' id="" />
        <input type="button" onClick={addNewTask} value="Add" />
      </header>

      <main>
        {taskList.map((item: Task) => {
          return (
            <p>{item.title}</p>
          )
        })}
      </main>
    </>
  )
}

export default App
