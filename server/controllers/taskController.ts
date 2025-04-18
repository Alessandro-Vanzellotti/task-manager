import { taskModel } from '../models/Task';
import { Request, Response } from 'express';


export const getTasks = async (req: Request, res: Response) => {
    try {

        const tasks = await taskModel.find();

        res.json(tasks);

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getTaskById = async (req: Request, res: Response): Promise<any> => {
    try {
        const task = await taskModel.findById(req.params.id);

        if (!task) return res.status(404).json({ message: "Task not found" });

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const createTask = async (req: Request, res: Response) => {
    try {
        const {
            text,
            isComplete,
        } = req.body;

        const task = await taskModel.create({
            text,
            isComplete
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


