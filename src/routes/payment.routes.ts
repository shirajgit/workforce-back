import express from "express";
import {
  createPayment,
  getPayments,
  markAsPaid,
  updatePayment,
  deletePayment,
} from "../controllers/payment.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createPayment);
router.get("/", getPayments);
router.patch("/:id/pay", markAsPaid);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

export default router;