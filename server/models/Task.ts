import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    text: { type: String, required: true },
    isComplete: {type: Boolean, required: true }
})

export const taskModel = mongoose.model("Task", taskSchema);