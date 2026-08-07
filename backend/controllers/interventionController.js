import Intervention from "../models/Intervention.js";

// Create Intervention
export const createIntervention = async (req, res) => {

  try {

    const intervention = await Intervention.create(req.body);

    res.status(201).json({
      success: true,
      message: "Intervention created successfully.",
      intervention,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// Get Interventions for a Student
export const getStudentInterventions = async (req, res) => {

  try {

    const interventions = await Intervention.find({
      studentId: req.params.studentId,
    }).sort({ createdAt: -1 });

    res.status(200).json(interventions);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// Get All Interventions
export const getAllInterventions = async (req, res) => {

  try {

    const interventions = await Intervention.find().sort({
      createdAt: -1,
    });

    res.status(200).json(interventions);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};