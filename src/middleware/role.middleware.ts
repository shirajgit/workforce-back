export const allowRoles = (...roles: string[]) => {
  return (req: any, res: any, next: any) => {
    try {
      // ✅ User authenticated?
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      // ✅ Role allowed?
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: `Access denied for role: ${req.user.role}`,
        });
      }

      // ✅ Continue
      next();
    } catch (error) {
      console.error("Role middleware error:", error);

      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };
};