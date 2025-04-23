import axios from "axios";
import { TaskType } from "../types";

export const getAllTasks = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getTaskById = async (taskId: string | undefined) => {
    try {
        if(!taskId) return;
        const response = await axios.get(`http://localhost:5000/api/tasks/${taskId}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const createNewTask = async (newTask: TaskType) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/tasks`, newTask);
    } catch (error) {
        console.error(error);
    }
}

export const updateTask = async (taskId: string, task: TaskType) => {
    try {
        await axios.put(`http://localhost:5000/api/tasks/${taskId}`, task);
    } catch (error) {
        console.error(error);
    }
}

export const deleteTask = async (taskId: string) => {
    try {
        await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
    } catch (error) {
        console.error(error);
    }
}