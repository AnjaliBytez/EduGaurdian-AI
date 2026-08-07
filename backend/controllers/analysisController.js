import Academic from "../models/Academic.js";
import AssessmentResponse from "../models/AssessmentResponse.js";
import Analysis from "../models/Analysis.js";
import Student from "../models/Student.js";


// Convert assessment responses into risk points
export const calculateAssessmentScore = (assessment) => {

  let score = 0;
  let reasons = [];

  // Stress
  const stressPoints = {
    "Very Low": 0,
    "Low": 2,
    "Moderate": 5,
    "High": 8,
    "Very High": 10,
  };

  score += stressPoints[assessment.stress] || 0;

  if ((stressPoints[assessment.stress] || 0) >= 8)
    reasons.push("High stress level");


  // Sleep Satisfaction
  const sleepPoints = {
    "Very Satisfied": 0,
    "Satisfied": 2,
    "Neutral": 5,
    "Dissatisfied": 8,
    "Very Dissatisfied": 10,
  };

  score += sleepPoints[assessment.sleep] || 0;

  if ((sleepPoints[assessment.sleep] || 0) >= 8)
    reasons.push("Poor sleep quality");


  // Workload
  const workloadPoints = {
    "Very Manageable": 0,
    "Manageable": 2,
    "Moderate": 5,
    "Heavy": 8,
    "Overwhelming": 10,
  };

  score += workloadPoints[assessment.workload] || 0;

  if ((workloadPoints[assessment.workload] || 0) >= 8)
    reasons.push("Heavy academic workload");


  // Concentration
  const concentrationPoints = {
    "Very Easy": 0,
    "Easy": 2,
    "Moderate": 5,
    "Difficult": 8,
    "Very Difficult": 10,
  };

  score += concentrationPoints[assessment.concentration] || 0;

  if ((concentrationPoints[assessment.concentration] || 0) >= 8)
    reasons.push("Difficulty concentrating");


  // Motivation
  const motivationPoints = {
    "Very Motivated": 0,
    "Motivated": 2,
    "Neutral": 5,
    "Unmotivated": 8,
    "Very Unmotivated": 10,
  };

  score += motivationPoints[assessment.motivation] || 0;

  if ((motivationPoints[assessment.motivation] || 0) >= 8)
    reasons.push("Low motivation");


  // Energy
  const energyPoints = {
    "Good": 0,
    "Average": 4,
    "Low": 8,
  };

  score += energyPoints[assessment.energy] || 0;

  if ((energyPoints[assessment.energy] || 0) >= 8)
    reasons.push("Low energy level");


  // Academic Confidence
  const confidencePoints = {
    "Confident": 0,
    "Neutral": 5,
    "Concerned": 10,
  };

  score += confidencePoints[assessment.academicConfidence] || 0;

  if ((confidencePoints[assessment.academicConfidence] || 0) >= 8)
    reasons.push("Low academic confidence");


  // Study Routine
  const studyRoutinePoints = {
    "Consistent": 0,
    "Sometimes": 5,
    "Inconsistent": 10,
  };

  score += studyRoutinePoints[assessment.studyRoutine] || 0;

  if ((studyRoutinePoints[assessment.studyRoutine] || 0) >= 8)
    reasons.push("Inconsistent study routine");


  // Support System
  const supportPoints = {
    "Always": 0,
    "Mostly": 2,
    "Sometimes": 5,
    "Rarely": 8,
    "Never": 10,
  };

  score += supportPoints[assessment.support] || 0;

  if ((supportPoints[assessment.support] || 0) >= 8)
    reasons.push("Lack of support system");


  // Overall Feeling
  const overallPoints = {
    "Excellent": 0,
    "Good": 2,
    "Okay": 5,
    "Not Great": 8,
    "Very Bad": 10,
  };

  score += overallPoints[assessment.overall] || 0;

  if ((overallPoints[assessment.overall] || 0) >= 8)
    reasons.push("Negative overall wellbeing");


  return {
    score,
    reasons,
  };

};


// Generate analysis for a student
export const generateAnalysis = async (studentId) => {
  console.log("generateAnalysis called for:", studentId);

  try {

    // Fetch Student
    const student = await Student.findOne({ studentId });
    console.log("Student found:", student?.studentId);
    console.log("Student Document:", student);

    if (!student) {
      throw new Error("Student not found");
    }

    // Fetch Academic Record
    const academic = await Academic.findOne({ studentId });

    // Fetch Assessment Response
   const assessment = await AssessmentResponse
  .findOne({ studentId })
  .sort({ submittedAt: -1 });

  console.log("Latest Assessment:", assessment);

    let academicScore = 0;
    let assessmentScore = 0;

    let reasons = [];

    // ------------------------
    // Academic Analysis
    // ------------------------

    if (academic) {

      // Attendance
      if (academic.attendance < 75) {
        academicScore += 20;
        reasons.push("Attendance below 75%");
      }
      else if (academic.attendance < 85) {
        academicScore += 10;
      }

      // Academic Average
      if (academic.academicAverage < 65) {
        academicScore += 20;
        reasons.push("Academic average below 65%");
      }
      else if (academic.academicAverage < 80) {
        academicScore += 10;
      }

      // Assignment Completion
      const completion =
        academic.totalAssignments === 0
          ? 100
          : (academic.assignmentsCompleted /
              academic.totalAssignments) * 100;

      if (completion < 70) {
        academicScore += 10;
        reasons.push("Low assignment completion");
      }
      else if (completion < 90) {
        academicScore += 5;
      }

    }

    // ------------------------
    // Assessment Analysis
    // ------------------------

    // ------------------------
// Assessment Analysis
// ------------------------

if (assessment) {

  const result = calculateAssessmentScore(assessment);

  assessmentScore = result.score;

  reasons.push(...result.reasons);

  console.log("Assessment Score:", assessmentScore);
console.log("Reasons after assessment:", reasons);

}
    // ------------------------
    // Final Status
    // ------------------------
const totalScore = academicScore + assessmentScore;
console.log("Academic Score:", academicScore);
console.log("Assessment Score:", assessmentScore);
console.log("Total Score:", totalScore);
   let overallStatus = "Stable";

if (totalScore >= 90) {

  overallStatus = "Active Support";

}
else if (totalScore >= 60) {

  overallStatus = "High Priority";

}
else if (totalScore >= 30) {

  overallStatus = "Needs Attention";

}

    // ------------------------
    // Source
    // ------------------------

    let source = "None";

    if (academicScore > 0 && assessmentScore > 0)
      source = "Both Signals";

    else if (academicScore > 0)
      source = "Academic Signals";

    else if (assessmentScore > 0)
      source = "Assessment";

    // ------------------------
    // Save / Update Analysis
    // ------------------------
console.log("Saving Analysis...");

console.log({
  studentId,
  academicScore,
  assessmentScore,
  totalScore,
  overallStatus,
  source,
  reasons,
});
    const analysis = await Analysis.findOneAndUpdate(

      { studentId },

      {

        studentId,

        studentName: student.name,

        department: student.department,

        year: student.year,

        academicScore,

        assessmentScore,

        totalScore,

        overallStatus,

        source,

        reasons,

      },

      {

        new: true,

        upsert: true,

      }

    );

    return analysis;

  }

  catch (error) {

    throw error;

  }

};

// Analyze one student
export const analyzeStudent = async (req, res) => {

  try {

    const analysis = await generateAnalysis(req.params.studentId);

    res.status(200).json(analysis);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// Get all analyzed students
export const getAllAnalysis = async (req, res) => {

  try {

    const analysis = await Analysis.find();

    res.status(200).json(analysis);

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};

// Get Analysis by Student ID
export const getAnalysis = async (req, res) => {

  try {

    const analysis = await Analysis.findOne({
      studentId: req.params.studentId,
    });

    if (!analysis) {

      return res.status(404).json({
        success: false,
        message: "Analysis not found",
      });

    }

    res.status(200).json(analysis);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};