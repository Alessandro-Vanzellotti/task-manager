import { ChangeEvent } from "react";
import { TaskType } from "../../types";
import './NewTaskForm.scss';
import { IoMdAdd } from "react-icons/io";
import { SubmitHandler, useForm } from "react-hook-form";

enum priorityLevelsEnum {
    none = "None",
    low = "Low",
    medium = "Medium",
    high = "High"
}

enum progressEnum {
    pending = "Pending",
    inProgress = "In progress",
    complete = "Complete"
}

interface IFormInput {
    title: string
    description: string
    priorityLevel: priorityLevelsEnum
    progress: progressEnum
}

type NewTaskFormType = {
    addNewTask: (task: TaskType) => void;
    handleTitleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleDescriptionChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    newTask: TaskType;
}

export const NewTaskForm: React.FC<NewTaskFormType> = ({
    addNewTask, 
    handleTitleChange, 
    handleDescriptionChange,
    newTask}) => {

    const { register, handleSubmit } = useForm<IFormInput>();
    
    /* const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        addNewTask(newTask.title);
    } */

    const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
        addNewTask({
            title: data.title,
            description: data.description,
            priorityLevel: data.priorityLevel,
            progress: data.progress,
            beingEdited: false
        })
    }
    
    return (

        <form className={'form'} onSubmit={handleSubmit(onSubmit)}>
        {/* <form className={'form'} onSubmit={(e) => handleSubmit(e)}> */}

            <header className={'form__header'}>
                <input 
                    className={'form__title'} 
                    type="text" id="item" 
                    value={newTask.title}
                    {...register("title")}
                    onChange={e => handleTitleChange(e)}
                    placeholder="Type a task" 
                />

                <button className={'form__add-button'} type="submit">
                    <IoMdAdd className={'form__add-icon'} />
                </button>
            </header>

            <section className={'form__description'}>
                <textarea
                    maxLength={350} 
                    className={'form__description-text'}
                    {...register("description")}
                    onChange={e => handleDescriptionChange(e)}
                    value={newTask.description}
                >
                    {newTask.description}
                </textarea>

            </section>
            <footer className={'form__footer'}>
                
                <select 
                    id="progress" 
                    {...register("progress")}
                >
                    <option value="pending">Pending</option>
                    <option value="in progress">In progress</option>
                    <option value="complete">Complete</option>
                </select>

                <select 
                    id="priority-levels" 
                    {...register("priorityLevel")}
                >
                    <option value="none">None</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </footer>
        </form>
    )
}