import express from "express";
import {
  createSubmission,
  getSubmissions,
  updateSubmission,
} from "../controllers/submission.controller.ts";

import { protect } from "../middleware/auth.middleware.ts";
import { allowRoles } from "../middleware/role.middleware.ts";
 
import { deleteSubmission } from "../controllers/submission.controller.ts";

const router = express.Router();

// Bidder logs submission
router.post("/", protect, allowRoles("bidder"), createSubmission);

// Owner + Bidder view
router.get("/", protect, getSubmissions);

// Update
router.patch("/:id", protect, updateSubmission);

//delete submission (owner only)
 router.delete("/:id", protect, deleteSubmission);

export default router;