import { ChangeEvent } from "react";
import { Task as TaskType } from "./types";

type NewTaskFormType = {
    addNewTask: (text: string) => void;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    newTask: TaskType;
}

export const NewTaskForm: React.FC<NewTaskFormType> = ({addNewTask, handleChange, newTask}) => {
    
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (newTask.text === "") return;
        addNewTask(newTask.text);
      }
    
    return (

        <form onSubmit={(e) => handleSubmit(e)} className="new-item-form">
            <input value={newTask.text} onChange={e => handleChange(e)} type="text" id="item" />
            <input type="submit" value="Add" />
        </form>
    )
}