import mongoose from "mongoose";

const academicSchema = new mongoose.Schema({

  studentId: {
    type: String,
    required: true,
    unique: true,
  },

  attendance: {
    type: Number,
    default: 0,
  },

  academicAverage: {
    type: Number,
    default: 0,
  },

  assignmentsCompleted: {
    type: Number,
    default: 0,
  },

  totalAssignments: {
    type: Number,
    default: 0,
  },

});

export default mongoose.model("Academic", academicSchema);