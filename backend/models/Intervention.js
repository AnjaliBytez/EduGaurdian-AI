import mongoose from "mongoose";

const interventionSchema = new mongoose.Schema({

  studentId: {
    type: String,
    required: true,
  },

  studentName: {
    type: String,
    required: true,
  },

  facultyId: {
    type: String,
    default: "FAC101",
  },

  interventionType: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  recommendedAction: {
    type: String,
    required: true,
  },

  followUpDate: {
    type: Date,
    required: true,
  },

  showOnDashboard: {
    type: Boolean,
    default: true,
  },

  sendEmail: {
    type: Boolean,
    default: false,
  },

  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

export default mongoose.model("Intervention", interventionSchema);