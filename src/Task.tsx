import React from 'react';
import {Task as TaskType} from './types';

type Props = {
    task: TaskType;
    toggleTask: (id: number) => void;
    /* removeTask: (item: TaskType) => void;
    editTask: (item: TaskType) => void; */
};

export const Task: React.FC<Props> = ({task, toggleTask}) => {
    return (
        <li >
            <p onClick={() => toggleTask(task.id)}>{task.text}</p>
              {/* <button onClick={() => removeTask(task)}>Delete</button>
              <button onClick={() => editTask(task)}>Edit</button> */}
        </li>
    )
}