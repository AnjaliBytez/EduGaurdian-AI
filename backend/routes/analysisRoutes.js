import express from "express";
import {
  analyzeStudent,
  getAllAnalysis,
  getAnalysis,
} from "../controllers/analysisController.js";

const router = express.Router();

router.post("/:studentId", analyzeStudent);

router.get("/", getAllAnalysis);
router.get("/:studentId", getAnalysis);

export default router;