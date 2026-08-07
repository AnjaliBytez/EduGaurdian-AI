import Faculty from "../models/Faculty.js";

// Faculty Login
export const loginFaculty = async (req, res) => {

  try {

    const { email, password } = req.body;

    const faculty = await Faculty.findOne({ email });

    if (!faculty) {
      return res.status(404).json({
        message: "Faculty not found",
      });
    }

    if (faculty.password !== password) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    res.status(200).json({
      message: "Login successful",
      faculty,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// Register Faculty
export const registerFaculty = async (req, res) => {

  try {

    const faculty = await Faculty.create(req.body);

    res.status(201).json({
      message: "Faculty registered successfully",
      faculty,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};