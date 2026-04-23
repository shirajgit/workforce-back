import express from "express";
import {
  createTask,
  getTasks,
  updateTaskStatus,
  updateTask,
} from "../controllers/tasks.controller.ts";

import { protect } from "../middleware/auth.middleware.ts";
import { allowRoles } from "../middleware/role.middleware.ts";

const router = express.Router();

// Owner
router.post("/", protect, allowRoles("owner"), createTask);
router.get("/", protect, getTasks);
router.patch("/:id", protect, allowRoles("owner"), updateTask);

// Developer
router.patch(
  "/:id/status",
  protect,
  allowRoles("developer"),
  updateTaskStatus
);

export default router;