import express from "express";
import {
  createInterview,
  getInterviews,
  advanceStage,
  updateInterview,
  deleteInterview,
} from "../controllers/interview.controller.ts";

import { protect } from "../middleware/auth.middleware.ts";

const router = express.Router();

// all routes protected
router.use(protect);

router.post("/", createInterview);
router.get("/", getInterviews);
router.patch("/:id/advance", advanceStage);
router.put("/:id", updateInterview);
router.delete("/:id", deleteInterview);

export default router;