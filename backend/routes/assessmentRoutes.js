import express from "express";
import {
  submitAssessment,
  getAllAssessments,
  getAssessment,
} from "../controllers/assessmentController.js";

const router = express.Router();

// Submit Assessment
router.post("/", submitAssessment);

// Get all assessment responses
router.get("/", getAllAssessments);

// Get latest assessment of a student
router.get("/:studentId", getAssessment);

export default router;