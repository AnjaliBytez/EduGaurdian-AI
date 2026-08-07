import Feedback from "../models/Feedback.js";

// Submit Feedback
export const submitFeedback = async (req, res) => {

  try {

    const feedback = await Feedback.create(req.body);

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully.",
      feedback,
    });

  } catch (error) {
console.log("Feedback Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// Get All Feedback
export const getAllFeedback = async (req, res) => {

  try {

    const feedbacks = await Feedback.find().sort({
      createdAt: -1,
    });

    res.status(200).json(feedbacks);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};