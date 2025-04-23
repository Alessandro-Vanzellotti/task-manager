import axios from "axios";

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