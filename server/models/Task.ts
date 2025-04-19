import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    priorityLevel: { type: String, required: true },
    progress: { type: String, required: true }
})

export const Task = mongoose.model("Task", taskSchema);