import express from "express";
import {
  createTask,
  getTasks,
  updateTaskStatus,
  updateTask,
  deleteTask
} from "../controllers/tasks.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// Owner
router.post("/", protect, allowRoles("owner"), createTask);
router.get("/", protect, getTasks);
router.patch("/:id", protect, allowRoles("owner"), updateTask);
router.delete("/:id", protect, deleteTask);

// Developer
router.patch(
  "/:id/status",
  protect,
  allowRoles("developer"),
  updateTaskStatus
);

export default router;