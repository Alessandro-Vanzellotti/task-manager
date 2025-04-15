import React from 'react';
import {Task as TaskType} from './types';

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
        <li >
            <p onClick={() => toggleTask(task.id)}>{task.text}</p>
              <button onClick={() => handleTaskRemoval()}>Delete</button>
              <button onClick={() => handleTaskEditing()}>Edit</button>
        </li>
    )
}