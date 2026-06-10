import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// 1. Extend Express Request type to include the user info
export interface AuthenticatedRequest extends Request {
  user: {
    userId: number; // Matches the payload format from your login route
  };
}

interface JwtPayload {
  userId: number;
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  // 2. Extract the token from cookies parsed by cookie-parser
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // 3. Verify the token using your secret key
    const secret = process.env.JWT_SECRET || "your_fallback_secret";
    const decoded = jwt.verify(token, secret) as JwtPayload;

    // 4. Attach the user data to the request object
    req.user = { userId: decoded.userId };

    next(); // Move to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};
