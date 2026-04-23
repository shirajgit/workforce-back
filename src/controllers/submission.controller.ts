import Submission from "../models/Submission.ts";

// CREATE
export const createSubmission = async (req: any, res: any) => {
  try {
    const { company, position, date } = req.body;

    const submission = await Submission.create({
      userId: req.user._id,
      company,
      position,
      date,
      status: "Pending",
    });

    res.status(201).json(submission);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// GET
export const getSubmissions = async (req: any, res: any) => {
  try {
    let submissions;

    if (req.user.role === "owner") {
      submissions = await Submission.find().populate("userId", "name email");
    } else {
      submissions = await Submission.find({ userId: req.user._id });
    }

    res.json(submissions);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateSubmission = async (req: any, res: any) => {
  try {
    const { status, company, position, date } = req.body;

    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    if (
      req.user.role !== "owner" &&
      submission.userId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    if (status) submission.status = status;
    if (company) submission.company = company;
    if (position) submission.position = position;
    if (date) submission.date = date;

    await submission.save();

    res.json(submission);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};