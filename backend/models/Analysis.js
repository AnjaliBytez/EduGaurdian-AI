import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema({

  studentId: {
    type: String,
    required: true,
    unique: true,
  },

  studentName: {
  type: String,
  required: true,
},

department: {
  type: String,
  required: true,
},

year: {
  type: Number,
  required: true,
},

  academicScore: {
    type: Number,
    default: 0,
  },

  assessmentScore: {
    type: Number,
    default: 0,
  },

  totalScore: {
    type: Number,
    default: 0,
  },

  overallStatus: {
    type: String,
    enum: [
      "Stable",
      "Needs Attention",
      "High Priority",
      "Active Support",
    ],
    default: "Stable",
  },

  source: {
    type: String,
    default: "None",
  },

  reasons: [
    {
      type: String,
    },
  ],

  reviewed: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

export default mongoose.model("Analysis", analysisSchema);