import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    id: { type: String, required: true },
    text: { type: String, required: true },
    isCompleted: {type: Boolean, required: true }
})

export const taskModel = mongoose.model("Task", taskSchema);