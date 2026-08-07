import Academic from "../models/Academic.js";

// Register Academic Record
export const addAcademicRecord = async (req, res) => {
  try {
    const academic = await Academic.create(req.body);

    res.status(201).json({
      success: true,
      message: "Academic Record Added Successfully",
      academic,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Academic Record
export const getAcademicRecord = async (req, res) => {
  try {
    const academic = await Academic.findOne({
      studentId: req.params.studentId,
    });

    if (!academic) {
      return res.status(404).json({
        success: false,
        message: "Academic Record Not Found",
      });
    }

    res.status(200).json({
      success: true,
      academic,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};