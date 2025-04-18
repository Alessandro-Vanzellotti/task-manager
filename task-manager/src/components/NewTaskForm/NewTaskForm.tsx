import { ChangeEvent } from "react";
import { Task as TaskType } from "../../types";
import './NewTaskForm.scss';
import { IoMdAdd } from "react-icons/io";

type NewTaskFormType = {
    addNewTask: (text: string) => void;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    newTask: TaskType;
}

export const NewTaskForm: React.FC<NewTaskFormType> = ({addNewTask, handleChange, newTask}) => {
    
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        addNewTask(newTask.text);
    }
    
    return (

        <form className={'search-form'} onSubmit={(e) => handleSubmit(e)}>
            <input className={'search-form__input'} value={newTask.text} onChange={e => handleChange(e)} type="text" id="item" placeholder="Type a task (e.g. buy milk)" />
            <button className={'search-form__button'} type="submit">
                <IoMdAdd className={'search-form__icon'} />
            </button>
        </form>
    )
}