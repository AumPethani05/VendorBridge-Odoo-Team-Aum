import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// import { prisma } from "../lib/prisma.js";
const { prisma } = require("../lib/prisma.js");

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
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { id: number };

    const user = await prisma.users.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        email: true,
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