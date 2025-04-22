import { createContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { TaskType } from '../../types';
import { TaskListContext } from '../../TaskListContext';

export default function MainPage() {

    const [taskList, setTaskList] = useState<TaskType[]>(() => {
        const localValue = localStorage.getItem("ITEMS");
        if(localValue == null) return [];
    
        return JSON.parse(localValue);
      });
    
      useEffect(() => {
        localStorage.setItem("ITEMS", JSON.stringify(taskList))
      }, [taskList]);

    return (
        <TaskListContext.Provider value={{taskList, setTaskList}}>
            <div >
                <nav >
                    <div>
                        <Link to='/' >
                            Home
                        </Link>
                    </div>
                </nav>
            </div>
            <div>
                <Outlet />
            </div>
        </TaskListContext.Provider>
    )
}