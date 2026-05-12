import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    // ✅ Get token
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    // ✅ Check JWT secret
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "JWT_SECRET missing",
      });
    }

    // ✅ Verify token
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // ✅ Invalid token
    if (!decoded?.id) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    // ✅ Get user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // ✅ Attach user
    req.user = user;

    next();
  } catch (err) {
    console.error("Authentication error:", err);

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};