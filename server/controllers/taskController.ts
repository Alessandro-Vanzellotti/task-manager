import { taskModel } from '../models/Task';
import { Request, Response } from 'express';


export const getTasks = async (req: Request, res: Response) => {
    try {

        let tasks;

        tasks = await taskModel.find();

        res.json(tasks);

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

/* export const getTaskById = async (req, res) => {
    
}; */

export const createTask = async (req: Request, res: Response) => {
    try {
        const {
            id,
            text,
            isCompleted,
        } = req.body;

        const task = await taskModel.create({
            id,
            text,
            isCompleted
        });

        res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

/* export const updateTask = async (req, res) => {
    
};

export const deleteTask = async (req, res) => {
    
};
 */


