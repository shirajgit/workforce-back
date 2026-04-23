
import Interview from "../models/interview.model.ts";

// ➕ CREATE
export const createInterview = async (req: any, res: any) => {
  try {
    const { name, company, salary, notes } = req.body;

    const interview = await Interview.create({
      name,
      company,
      salary,
      notes,
      createdBy: req.user.id,
    });

    res.status(201).json(interview);
  } catch (err) {
    res.status(500).json({ message: "Failed to create interview" });
  }
};

// 📥 GET ALL
export const getInterviews = async (req: any, res: any) => {
  try {
    const user = req.user;

    let query: any = {};

    // Owner → see all
    if (user.role !== "owner") {
      query.createdBy = user.id;
    }

    const interviews = await Interview.find(query).sort({ createdAt: -1 });

    res.json(interviews);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch interviews" });
  }
};

// ⏫ ADVANCE STAGE
export const advanceStage = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const interview = await Interview.findById(id);

    if (!interview) {
      return res.status(404).json({ message: "Not found" });
    }

    interview.stage = Math.min(interview.stage + 1, 6);
    await interview.save();

    res.json(interview);
  } catch (err) {
    res.status(500).json({ message: "Failed to update stage" });
  }
};

// ✏️ UPDATE (optional but useful)
export const updateInterview = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const updated = await Interview.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update interview" });
  }
};

// ❌ DELETE
export const deleteInterview = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    await Interview.findByIdAndDelete(id);

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete" });
  }
};