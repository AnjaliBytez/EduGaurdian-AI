import express from "express";
import { submitFeedback , getAllFeedback,} from "../controllers/feedbackController.js";

const router = express.Router();

// Submit Feedback
router.post("/", submitFeedback);
router.get("/", getAllFeedback);

export default router;