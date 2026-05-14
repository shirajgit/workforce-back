import express from "express";
import { getDashboardStats } from "../controllers/dashboard.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// Owner only
router.get("/", protect, allowRoles("owner"), getDashboardStats);

export default router;