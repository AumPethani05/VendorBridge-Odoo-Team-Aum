const { Router } = require("express");
const { register, login, profile, logout } = require("../controllers/auth.controllers");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = Router();

// Public Routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Protected Route
router.get("/profile", authMiddleware, profile);

module.exports = router;
