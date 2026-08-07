import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({

  studentId: {
    type: String,
    required: true,
  },

  interventionId: {
    type: String,
    required: true,
  },

  rating: {
    type: String,
    required: true,
  },

  comment: {
    type: String,
    default: "",
  },

  needsAnotherSession: {
    type: String,
    required: true,
  },

  submittedAt: {
    type: Date,
    default: Date.now,
  },

});

export default mongoose.model("Feedback", feedbackSchema);