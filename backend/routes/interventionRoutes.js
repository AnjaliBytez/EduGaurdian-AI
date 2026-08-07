import express from "express";
import { createIntervention, getStudentInterventions, getAllInterventions, } from "../controllers/interventionController.js";

const router = express.Router();

// Create Intervention
router.post("/", createIntervention);
router.get("/", getAllInterventions);
// Get Student Interventions
router.get("/:studentId", getStudentInterventions);

export default router;