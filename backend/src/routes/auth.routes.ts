const { Router } = require("express");
const { register, login } = require("../controllers/auth.controllers");
const { authMiddleware } = require("../middlewares/auth.middleware");
import { Request, Response } from "express";

const router = Router();

// Public Routes
router.post("/register", register);
router.post("/login", login);

// Protected Route
router.get("/profile", authMiddleware, (req: Request, res: Response) => {
  res.status(200).json({
    user: req.user,
  });
});

module.exports = router;