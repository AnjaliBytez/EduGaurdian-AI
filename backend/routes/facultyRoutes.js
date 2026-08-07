import express from "express";
import {
  registerFaculty,
  loginFaculty,
} from "../controllers/facultyController.js";

const router = express.Router();

// Register Faculty
router.post("/register", registerFaculty);

// Faculty Login
router.post("/login", loginFaculty);

export default router;