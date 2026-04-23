import User from "../models/User.js";
import bcrypt from "bcryptjs";

// ✅ GET ALL USERS (Owner only)
export const getUsers = async ({req, res} : {req: any, res: any}) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (err : any) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ CREATE USER (Owner creates dev/caller/bidder)

 

export const createUser = async ({req, res} : {req: any, res: any}) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const exists = await User.findOne({ email: normalizedEmail });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role,
      status: "active",
    });

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
  } catch (err : any) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ UPDATE USER (role / status)
export const updateUser = async ({req, res} : {req: any, res: any}) => {
  try {
    const { role, status } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (role) user.role = role;
    if (status) user.status = status;

    await user.save();

    res.json({ message: "User updated", user });
  } catch (err : any) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ DELETE USER (Owner only)
export const deleteUser = async ({req, res} : {req: any, res: any}) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Optional safety: prevent deleting owner accounts
    if (user.role === "owner") {
      return res.status(403).json({ message: "Owner account cannot be deleted" });
    }

    await user.deleteOne();

    res.json({ message: "User deleted successfully" });
  } catch (err : any) {
    res.status(500).json({ message: err.message });
  }
};