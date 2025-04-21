import { ChangeEvent, useEffect, useState } from "react";
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

export interface IFormInput {
    title: string
    description: string
    priorityLevel: priorityLevelsEnum
    progress: progressEnum
}

type NewTaskFormType = {
    addNewTask: (task: TaskType) => void;
    taskList: TaskType[];
}

export const NewTaskForm: React.FC<NewTaskFormType> = ({
    taskList,
    addNewTask
    }) => {

    const { register, handleSubmit, getValues, formState, reset, formState: { isSubmitSuccessful }
     } = useForm<IFormInput>({ defaultValues: 
        { 
            title: "",
            description: "",
            priorityLevel: priorityLevelsEnum.none,
            progress: progressEnum.pending,
        } 
    });

    const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {

        const task: TaskType = {
            title: data.title,
            description: data.description,
            priorityLevel: data.priorityLevel,
            progress: data.progress,
            beingEdited: false
        }
        addNewTask(task);
        reset({...getValues});
    }
    
    return (

        <form className={'form'} onSubmit={handleSubmit(onSubmit)}>
            <header className={'form__header'}>
                <input 
                    className={'form__title'} 
                    type="text" id="item" 
                    {...register("title")}
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
                >
                </textarea>
            </section>

            <footer className={'form__footer'}>
                
                <select 
                    id="progress" 
                    {...register("progress")}
                >
                    <option selected value="Pending">Pending</option>
                    <option value="In progress">In progress</option>
                    <option value="Complete">Complete</option>
                </select>

                <select 
                    id="priority-levels" 
                    {...register("priorityLevel")}
                >
                    <option value="None">None</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </footer>
        </form>
    )
}