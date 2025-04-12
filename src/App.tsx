import { ChangeEvent, useEffect, useState } from 'react'
import './App.css'

function App() {

  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState<string[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setTask(event.target.value);
  }

  const addNewTask = () => {
    setTaskList([...taskList, task]);
  }

  useEffect(() => {
    console.log(taskList);
  },[taskList])
  

  return (
    <>
      <header>
        <h2>Task manager:</h2>
        <input type="text" onChange={handleChange} name="newTask" value={task} placeholder='Type your task' id="" />
        <input type="button" onClick={addNewTask} value="Add" />
      </header>

      <main>
        
      </main>
    </>
  )
}

export default App
