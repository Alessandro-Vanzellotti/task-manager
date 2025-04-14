import React from 'react';
import {Task as TaskType} from './types';

type Props = {
    task: TaskType;
    toggleTask: (id: number) => void;
    removeTask: (item: TaskType) => void;
    editTask: (item: TaskType) => void;
};

export const Task: React.FC<Props> = (props) => {
    return (
        <li onClick={() => props.toggleTask(props.task.id)}>
            <p>{props.task.text}</p>
              <button onClick={() => props.removeTask(props.task)}>Delete</button>
              <button onClick={() => props.editTask(props.task)}>Edit</button>
        </li>
    )
}