import React, { useState } from 'react';
import {Task as TaskType} from '../../types';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import './Task.scss';

type Props = {
    task: TaskType;
    toggleTask: (id: string) => void;
    removeTask: (task: TaskType) => void;
    editTask: (task: TaskType) => void;
};

export const Task: React.FC<Props> = ({task, toggleTask, removeTask, editTask}) => {

    const handleTaskRemoval = () : void => {
        removeTask(task);
    }

    const handleTaskEditing = () : void => {
        editTask(task);
    }
    

    return (
        <li className='wrapper' >
            <input type="checkbox" onChange={() => toggleTask(task.id)} checked={task.isCompleted} />
            <p style={{ textDecoration: task.isCompleted ? 'line-through' : 'none'}}>{task.text}</p>
            
            <button className='delete-button' onClick={() => handleTaskRemoval()}>
                <RiDeleteBin6Line />
            </button>
            
            <button className='edit-button' onClick={() => handleTaskEditing()}>
                <MdOutlineEdit />
            </button>
            
        </li>
    )
}