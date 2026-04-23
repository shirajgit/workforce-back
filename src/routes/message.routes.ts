import express from "express";
import { getMessages } from "../controllers/message.controller.ts";
import { protect } from "../middleware/auth.middleware.ts";

const router = express.Router();

router.use(protect);

router.get("/:receiverId", getMessages);

export default router;