
import Payment from "../models/payment.model.ts";
import { calculateBonus } from "../utils/salary.util.ts";

// ➕ CREATE PAYMENT
export const createPayment = async (req: any, res: any) => {
  try {
    const { userId, role, baseSalary, metrics, month } = req.body;

    const bonus = calculateBonus(role, metrics);
    const total = baseSalary + bonus;

    const payment = await Payment.create({
      user: userId,
      role,
      baseSalary,
      bonus,
      total,
      month,
    });

    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ message: "Failed to create payment" });
  }
};

// 📥 GET PAYMENTS
export const getPayments = async (req: any, res: any) => {
  try {
    const user = req.user;

    let query: any = {};

    // owner sees all
    if (user.role !== "owner") {
      query.user = user.id;
    }

    const payments = await Payment.find(query)
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch payments" });
  }
};

// 💰 MARK AS PAID
export const markAsPaid = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findByIdAndUpdate(
      id,
      { status: "paid" },
      { new: true }
    );

    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

// ✏️ UPDATE PAYMENT
export const updatePayment = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const updated = await Payment.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update payment" });
  }
};

// ❌ DELETE
export const deletePayment = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    await Payment.findByIdAndDelete(id);

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete" });
  }
};