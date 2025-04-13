import { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import { Task } from './interfaces/Task';

function App() {

  const [task, setTask] = useState<Task>({title: ""});
  const [taskList, setTaskList] = useState<Task[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setTask({title: event.target.value});
  }

  const addNewTask = () => {
    setTaskList([...taskList, task]);
    setTask({title: ""});
  }

  const removeTask = (itemToRemove: Task) => {
    let updatedTaskList = taskList.filter(item => item.title != itemToRemove.title);
    //console.log("removeTask aqui");
    setTaskList(updatedTaskList);
  }

  /* const addNewTask = () => {
    setTaskList([...taskList, task]);
    setTask({title: "", id: 0});
  }
 */
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
            <div>
              <p>{item.title}</p>
              <button onClick={() => removeTask(item)}>Delete</button>
            </div>
          )
        })}
      </main>
    </>
  )
}

export default App
