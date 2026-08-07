import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
  },

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  department: {
    type: String,
    default: "AI & DS",
  },

  year: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Student", studentSchema);