import { ChangeEvent } from "react";
import { Task as TaskType } from "../../types";
import './NewTaskForm.scss';
import { IoMdAdd } from "react-icons/io";

type NewTaskFormType = {
    addNewTask: (text: string) => void;
    handleTitleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleDescriptionChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    newTask: TaskType;
}

export const NewTaskForm: React.FC<NewTaskFormType> = ({
    addNewTask, 
    handleTitleChange, 
    handleDescriptionChange,
    newTask}) => {
    
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        addNewTask(newTask.title);
    }
    
    return (

        <form className={'form'} onSubmit={(e) => handleSubmit(e)}>

            <header className={'form__header'}>
                <input 
                    className={'form__title'} 
                    type="text" id="item" 
                    value={newTask.title} 
                    onChange={e => handleTitleChange(e)}
                    placeholder="Type a task" 
                />

                <button className={'form__add-button'} type="submit">
                    <IoMdAdd className={'form__add-icon'} />
                </button>
            </header>

            <section className={'form__description'}>
                <textarea 
                    name="form-text" 
                    maxLength={350} 
                    className={'form__description-text'}
                    onChange={e => handleDescriptionChange(e)}
                    value={newTask.description}
                >
                    {newTask.description}
                </textarea>

            </section>
            <footer className={'form__footer'}>
                
                <select id="progress" name="progress">
                    <option value="pending">Pending</option>
                    <option value="in progress">In progress</option>
                    <option value="complete">Complete</option>
                </select>

                <select id="priority-levels" name="priority-levels">
                    <option value="none">None</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </footer>
        </form>
    )
}