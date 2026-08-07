import express from "express";
import {
  addAcademicRecord,
  getAcademicRecord,
} from "../controllers/academicController.js";

const router = express.Router();

// Add Academic Record
router.post("/", addAcademicRecord);

// Get Academic Record by Student ID
router.get("/:studentId", getAcademicRecord);

export default router;