import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { TaskType } from '../../types';
import { TaskListContext } from '../../TaskListContext';
import Navbar from '../../components/Navbar/Navbar';
import './MaingPage.scss';
import { getAllTasks } from '../../api/api';

export default function MainPage() {

      const [taskList, setTaskList] = useState<TaskType[]>([]);

      useEffect(() => {
        
        const getTaskList = async () => {
            try {
                const data = await getAllTasks();
                setTaskList(data);
            } catch (error) {
                console.error(error);
            }
        };

        getTaskList();
      }, [setTaskList])

    return (
        <>
            <TaskListContext.Provider value={{taskList, setTaskList}}>
                <Navbar />
                <div>
                    <Outlet />
                </div>
            </TaskListContext.Provider>
        </>
    )
}