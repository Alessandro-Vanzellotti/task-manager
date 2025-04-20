import React, { useState } from 'react';
import {Task as TaskType} from '../../types';
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
                        Lorem, ipsum dolor sit amet consectetur adipisicing 
                        elit. Quibusdam fugit minima exercitationem quas! 
                        Voluptas excepturi blanditiis ullam magnam. Nemo, 
                        quibusdam adipisci! Ex, praesentium? Quos quidem 
                        deserunt rerum. Reprehenderit, natus dolores!
                    </textarea> :
                    <p className={'task__description-text'} >
                        Lorem, ipsum dolor sit amet consectetur adipisicing 
                        elit. Quibusdam fugit minima exercitationem quas! 
                        Voluptas excepturi blanditiis ullam magnam. Nemo, 
                        quibusdam adipisci! Ex, praesentium? Quos quidem 
                        deserunt rerum. Reprehenderit, natus dolores!
                    </p>
                }

            </section>
            <footer className={'task__footer'}>
                <p>Progress: Pending</p>
                <select id="progress-levels" name="progress-levels">
                    <option value="none">None</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </footer>
            
            
        </li>
    )
}