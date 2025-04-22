import { TaskType } from "../../types";
import './TaskForm.scss';
import { IoMdAdd } from "react-icons/io";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';


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

type TaskFormType = {
    task?: TaskType;
    addNewTask: (task: TaskType) => void;
}

export const TaskForm: React.FC<TaskFormType> = ({addNewTask}) => {

    const { register, handleSubmit, getValues, reset, formState: { errors }
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
            id: uuidv4(),
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

                <div className={'form__title'}>
                    <input 
                        className={'form__title-input'} 
                        type="text" id="item" 
                        {...register("title", { 
                            required: {
                                value: true,
                                message: "*Title is required",
                            } 
                        })}
                        placeholder="Type a title"
                    />
                    <p role="alert" className={'error'}>
                        {errors.title?.message}
                    </p>
                </div>

                <button className={'form__add-button'} type="submit">
                    <IoMdAdd className={'form__add-icon'} />
                </button>
            </header>

            <section className={'form__description'}>
                <textarea
                    maxLength={350} 
                    className={'form__description-text'}
                    {...register("description")}
                    placeholder="Type a description"
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