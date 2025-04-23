import { createContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { TaskType } from '../../types';
import { TaskListContext } from '../../TaskListContext';
import Navbar from '../../components/Navbar/Navbar';
import './MaingPage.scss';
import axios from 'axios';
import { getAllTasks } from '../../api/api';

export default function MainPage() {

    /* const [taskList, setTaskList] = useState<TaskType[]>(() => {
        const localValue = localStorage.getItem("ITEMS");
        if(localValue == null) return [];
    
        return JSON.parse(localValue);
      });
    
      useEffect(() => {
        localStorage.setItem("ITEMS", JSON.stringify(taskList))
      }, [taskList]); */

      const [taskList, setTaskList] = useState<TaskType[]>([]);

      /* const getAllTasks = () => {
        axios.get('http://localhost:5000/api/tasks').then(res => {
            console.log(res.data);
        }).catch(error => {
            console.log(error);
        })
      } */

      useEffect(() => {
        const getTaskList = async () => {
            try {
                const data = await getAllTasks();
                setTaskList(data);
            } catch (error) {
                console.error(error);
            }
        }

        getTaskList();
      }, [])

    return (
        <TaskListContext.Provider value={{taskList, setTaskList}}>
            <Navbar />
            <div>
                <Outlet />
            </div>
        </TaskListContext.Provider>
    )
}