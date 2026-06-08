import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const prisma = require("../lib/prisma");
const jwtSecret = process.env.JWT_SECRET || "vendorbridge-local-dev-secret";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token =
    req.cookies?.token ||
    req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: "Please login first",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as { id: number };

    const user = await prisma.users.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        username: true,
        first_name: true,
        last_name: true,
        email: true,
        role: true,
        created_at: true,
      },
    });

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);

    res.status(401).json({
      message: "Invalid token",
    });
  }
};
