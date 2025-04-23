import { Task } from "../../components/Task/Task";
import { useTaskListContext } from "../../TaskListContext";
import { TaskType } from "../../types";
import { v4 as uuidv4 } from 'uuid';


export default function TaskList() {

    const {taskList} = useTaskListContext();
    
  
    return (
      <>
        
  
        <main>
          <ul className={'task-list'}>
            {taskList.map((task: TaskType) => {

              return (
                <Task
                  key={uuidv4()}
                  task={task}
                />
              )
            })}
          </ul>
        </main>
      </>
    )
  }