import User from "../models/User.js";
import Task from "../models/Tasks.ts";

// ✅ GET DASHBOARD STATS (Owner only)
export const getDashboardStats = async (req, res) => {
  try {
    // USERS
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: "active" });

    // TASKS
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({
      status: "completed",
    });
    const inProgressTasks = await Task.countDocuments({
      status: "in-progress",
    });

    // OVERDUE TASKS
    const overdueTasks = await Task.countDocuments({
      deadline: { $lt: new Date() },
      status: { $ne: "completed" },
    });

    res.json({
      users: {
        total: totalUsers,
        active: activeUsers,
      },
      tasks: {
        total: totalTasks,
        completed: completedTasks,
        inProgress: inProgressTasks,
        overdue: overdueTasks,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};