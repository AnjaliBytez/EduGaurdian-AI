import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({

  facultyId: {
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
    required: true,
  },

  designation: {
    type: String,
    default: "Faculty Mentor",
  },

});

export default mongoose.model("Faculty", facultySchema);