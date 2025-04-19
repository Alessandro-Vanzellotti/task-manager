import * as express from "express";
import { getTasks, createTask, getTaskById, updateTask, deleteTask } from '../controllers/taskController';

const router = express.Router();

router.get("/", getTasks);
router.get("/:id", getTaskById);

router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;