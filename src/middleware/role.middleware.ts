export const allowRoles = (...roles: string[]) => {
  return (
    req: any,
    res: any,
    next: any
  ) => {
    try {
      // ✅ Check user exists
      if (!req.user) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      // ✅ Check role
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          message: "Access denied",
        });
      }

      next();
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Server error",
      });
    }
  };
};