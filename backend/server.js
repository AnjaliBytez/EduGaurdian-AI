import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import academicRoutes from "./routes/academicRoutes.js";
import assessmentRoutes from "./routes/assessmentRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";
import analysisRoutes from "./routes/analysisRoutes.js";
import interventionRoutes from "./routes/interventionRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";

import cors from "cors";
dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("EduGuardian Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.use("/api/students", studentRoutes);
app.use("/api/academics", academicRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/interventions", interventionRoutes);
app.use("/api/feedback", feedbackRoutes);


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
