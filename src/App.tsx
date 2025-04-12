import { useState } from 'react'
import './App.css'

function App() {

  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  

  return (
    <>
      <header>
        <h2>Task manager:</h2>
        <input type="text" name="newTask" value={task} placeholder='Type your task' id="" />
        <input type="button" value="Add" />
      </header>

      <main>
        
      </main>
    </>
  )
}

export default App
