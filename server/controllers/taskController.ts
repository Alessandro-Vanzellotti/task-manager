import { Task } from "../models/Task";
import { Request, Response } from "express";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getTaskById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, priorityLevel, progress } = req.body;

    const task = await Task.create({
      title,
      description,
      priorityLevel,
      progress,
    });

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<any> => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.priorityLevel = req.body.priorityLevel || task.priorityLevel;
    task.progress = req.body.progress || task.progress;

    const updatedTask = await task.save();
    res.json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const taskToDelete = await Task.findById(req.params.id);

    if (!taskToDelete) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    await taskToDelete.deleteOne();
    res.json({ message: "Task deleted successfully", taskToDelete });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
