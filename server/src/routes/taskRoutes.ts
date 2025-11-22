import { Router } from "express";
import { getTasks, createTask, updateTasks } from "../controllers/taskController";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:taskId/status", updateTasks);

export default router;