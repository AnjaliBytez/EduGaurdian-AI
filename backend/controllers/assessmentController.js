import AssessmentResponse from "../models/AssessmentResponse.js";
import { generateAnalysis } from "./analysisController.js";

// Save Assessment Responses
export const submitAssessment = async (req, res) => {

  try {

    const response = await AssessmentResponse.create(req.body);
    console.log("Calling generateAnalysis...");

    console.log("Student ID from frontend:", req.body.studentId);

await generateAnalysis(req.body.studentId);
    console.log("Analysis generated successfully.");

    res.status(201).json({
      success: true,
      message: "Assessment submitted successfully",
      response,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// Get All Assessment Responses
export const getAllAssessments = async (req, res) => {

  try {

    const assessments = await AssessmentResponse.find();

    res.status(200).json(assessments);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// Get Latest Assessment by Student ID
export const getAssessment = async (req, res) => {

  try {

    const assessment = await AssessmentResponse
      .findOne({
        studentId: req.params.studentId,
      })
      .sort({ submittedAt: -1 });

    if (!assessment) {

      return res.status(404).json({
        success: false,
        message: "Assessment not found",
      });

    }

    res.status(200).json(assessment);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};