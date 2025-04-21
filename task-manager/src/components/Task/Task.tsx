import React, { useState } from 'react';
import { TaskType } from '../../types';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import './Task.scss';

type Props = {
    task: TaskType;
    //toggleTask: (id: string) => void;
    removeTask: (task: TaskType) => void;
    editTask: (task: TaskType) => void;
};

export const Task: React.FC<Props> = ({task, removeTask, editTask}) => {

    const handleTaskRemoval = () : void => {
        removeTask(task);
    }

    const handleTaskEditing = () : void => {
        editTask(task);
    }
    

    return (
        <li className={'task'} >
            <header className={'task__header'}>
                <h2 className={'task__title'}>{task.title}</h2>
                <div className={'task__buttons'}>
                    <button 
                        className={'task__edit-button button'} 
                        onClick={() => handleTaskEditing()}>
                        <MdOutlineEdit />
                    </button>
                    <button 
                        className={'task__delete-button button'} 
                        onClick={() => handleTaskRemoval()}>
                        <RiDeleteBin6Line />
                    </button>
                </div>
            </header>

            <section className={'task__description'}>

                {task.beingEdited ? 
                    <textarea name="task-text" maxLength={350} className={'task__description-text'} >
                        {task.description}
                    </textarea> :
                    <p className={'task__description-text'} >
                        {task.description}
                    </p>
                }

            </section>
            <footer className={'task__footer'}>
                <p>{`Progress: ${task.progress}`}</p>
                <p>{`Priority level: ${task.priorityLevel}`}</p>
            </footer>
            
            
        </li>
    )
}