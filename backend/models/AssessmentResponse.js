import mongoose from "mongoose";

const assessmentResponseSchema = new mongoose.Schema({

  studentId: {
    type: String,
    required: true,
  },

  stress: {
    type: String,
    required: true,
  },

  sleep: {
    type: String,
    required: true,
  },

  workload: {
    type: String,
    required: true,
  },

  concentration: {
    type: String,
    required: true,
  },

  motivation: {
    type: String,
    required: true,
  },

  energy: {
    type: String,
    required: true,
  },

  academicConfidence: {
    type: String,
    required: true,
  },

  studyRoutine: {
    type: String,
    required: true,
  },

  support: {
    type: String,
    required: true,
  },

  overall: {
    type: String,
    required: true,
  },

  submittedAt: {
    type: Date,
    default: Date.now,
  },

});

export default mongoose.model(
  "AssessmentResponse",
  assessmentResponseSchema
);