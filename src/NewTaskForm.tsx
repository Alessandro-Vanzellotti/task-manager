import { ChangeEvent, EventHandler, useState } from "react";
import { Task as TaskType } from "./types";

type NewTaskFormType = {
    addNewTask: () => void;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    newTask: TaskType;
}

export const NewTaskForm: React.FC<NewTaskFormType> = ({addNewTask, handleChange, newTask}) => {

    //const [newTask, setNewTask] = useState<TaskType>({id: 0, text: "", isCompleted: false});
    
    function handleSubmit(e: React.SyntheticEvent) {
        console.log("handleSubmit");
        e.preventDefault();
        if (newTask.text === "") return;

        addNewTask();
    
        //setNewItem({id: 0, text: "", isCompleted: false});
      }
    
    
    return (

        
        

        <form onSubmit={(e) => handleSubmit(e)} className="new-item-form">
            <h2>Task Manager:</h2>
            <input value={newTask.text} onChange={e => handleChange(e)} type="text" id="item" />
            <input type="submit" value="Add" />
        </form>
    )
}