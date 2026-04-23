import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.ts";

import { protect } from "../middleware/auth.middleware.ts";
import { allowRoles } from "../middleware/role.middleware.ts";

const router = express.Router();

// 🔥 Owner only routes
router.get("/", protect, allowRoles("owner"), getUsers);
router.post("/", protect, allowRoles("owner"), createUser);
router.patch("/:id", protect, allowRoles("owner"), updateUser);
router.delete("/:id/delete", protect, allowRoles("owner"), deleteUser);

export default router;