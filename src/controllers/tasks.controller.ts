import Task from "../models/Tasks.ts";
import User from "../models/User.js";


// ✅ CREATE TASK (Owner only)
export const createTask = async ({req, res} : {req: any, res: any}) => {
  try {
    const { title, description, assignedTo, deadline } = req.body;

    // check if user exists
    const user = await User.findById(assignedTo);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const task = await Task.create({
      title,
      description,
      assignedTo,
      deadline,
      createdBy: req.user._id,
    });

    res.status(201).json(task);
  } catch (err : any  ) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ GET TASKS (Role based)
export const getTasks = async ({req, res} : {req: any, res: any}) => {
  try {
    let tasks;

    if (req.user.role === "owner") {
      tasks = await Task.find().populate("assignedTo", "name email");
    } else {
      // developer sees only their tasks
      tasks = await Task.find({ assignedTo: req.user._id });
    }

    res.json(tasks);
  } catch (err : any) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ UPDATE TASK STATUS (Developer)
export const updateTaskStatus = async ({req, res} : {req: any, res: any}) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // only assigned user can update
    if (task.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    task.status = status;
    await task.save();

    res.json(task);
  } catch (err : any) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ UPDATE TASK (Owner)
export const updateTask = async ({req, res} : {req: any, res: any}) => {
  try {
    const { title, description, deadline, assignedTo } = req.body;

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (deadline) task.deadline = deadline;
    if (assignedTo) task.assignedTo = assignedTo;

    await task.save();

    res.json(task);
  } catch (err : any) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ DELETE TASK (Owner)
export const deleteTask = async ({req, res} : {req: any, res: any}) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // only owner can delete (or use createdBy check if you prefer)
    if (req.user.role !== "owner") {
      return res.status(403).json({ message: "Not allowed" });
    }

    await task.deleteOne();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err : any) {
    res.status(500).json({ message: err.message });
  }
};