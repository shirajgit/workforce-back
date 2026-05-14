import Task from "../models/Tasks.js";
import User from "../models/User.js";

// ✅ CREATE TASK
export const createTask = async (
  req: any,
  res: any
) => {
  try {
    const {
      title,
      description,
      assignedTo,
      deadline,
    } = req.body;

    // ✅ Check user exists
    const user = await User.findById(assignedTo);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const task = await Task.create({
      title,
      description,
      assignedTo,
      deadline,
      createdBy: req.user._id,
    });

    res.status(201).json(task);
  } catch (err: any) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// ✅ GET TASKS
export const getTasks = async (
  req: any,
  res: any
) => {
  try {
    let tasks;

    // ✅ Owner sees all
    if (req.user.role === "owner") {
      tasks = await Task.find()
        .populate("assignedTo", "name email");
    } else {
      // ✅ Developer sees own tasks
      tasks = await Task.find({
        assignedTo: req.user._id,
      });
    }

    res.json(tasks);
  } catch (err: any) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// ✅ UPDATE TASK STATUS
export const updateTaskStatus = async (
  req: any,
  res: any
) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // ✅ Only assigned developer
    if (
      task.assignedTo.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not allowed",
      });
    }

    task.status = status;

    await task.save();

    res.json(task);
  } catch (err: any) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// ✅ UPDATE TASK
export const updateTask = async (
  req: any,
  res: any
) => {
  try {
    const {
      title,
      description,
      deadline,
      assignedTo,
    } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (deadline) task.deadline = deadline;
    if (assignedTo) task.assignedTo = assignedTo;

    await task.save();

    res.json(task);
  } catch (err: any) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// ✅ DELETE TASK
export const deleteTask = async (
  req: any,
  res: any
) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // ✅ Only owner
    if (req.user.role !== "owner") {
      return res.status(403).json({
        message: "Not allowed",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (err: any) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};