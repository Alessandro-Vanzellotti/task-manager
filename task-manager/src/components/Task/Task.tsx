import React, { Dispatch, SetStateAction } from 'react';
import { TaskType } from '../../types';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import './Task.scss';
import { useNavigate } from 'react-router-dom';
import { deleteTask, getAllTasks } from '../../api/api';
import { useTaskListContext } from '../../TaskListContext';

type Props = {
    task: TaskType
    setTaskList: Dispatch<SetStateAction<TaskType[]>>
}

export const Task: React.FC<Props> = ({ task, setTaskList }) => {

    const navigate = useNavigate();

    const handleTaskRemoval = async () : Promise<void> => {
        await deleteTask(task._id);
        const newTaskList = await getAllTasks();
        setTaskList(newTaskList);
    }

    const handleTaskEditing = () : void => {
        navigate(`/tasks/${task._id}`);
    }
    

    return (
        <li className={'task'} >
            <header className={'task__header'}>
                <h2 className={'task__title'}>{task.title}</h2>
                <div className={'task__buttons'}>
                    <button 
                        className={'task__edit-button button'} 
                        onClick={() => handleTaskEditing()}
                    >
                        <MdOutlineEdit />
                    </button>
                    <button 
                        className={'task__delete-button button'} 
                        onClick={() => handleTaskRemoval()}
                    >
                        <RiDeleteBin6Line />
                    </button>
                </div>
            </header>

            <section className={'task__description'}>
                <p className={'task__description-text'} >
                    {task.description}
                </p>
            </section>
            <footer className={'task__footer'}>
                <p>{`Progress: ${task.progress}`}</p>
                <p>{`Priority Level: ${task.priorityLevel}`}</p>
            </footer>
            
            
        </li>
    )
}