import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/StudentDashboard.css";
import axios from "axios";

const API_URL = "https://eduguardian-backend.onrender.com";

function StudentDashboard() {
  const navigate = useNavigate();
  const student = JSON.parse(localStorage.getItem("student"));
  const [activePage, setActivePage] = useState("Overview");
  const [assessmentStarted, setAssessmentStarted] = useState(false);
const [currentQuestion, setCurrentQuestion] = useState(0);
const [assessmentAnswers, setAssessmentAnswers] = useState({});
const [assessmentCompleted, setAssessmentCompleted] = useState(false);

const [feedbackRating, setFeedbackRating] = useState("");
const [feedbackComment, setFeedbackComment] = useState("");
const [needsAnotherSession, setNeedsAnotherSession] = useState("");
const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
const [academic, setAcademic] = useState(null);
const [studentInterventions, setStudentInterventions] = useState([]);


useEffect(() => {

  if (!student?.studentId) return;

  const fetchAcademicData = async () => {

    try {

      const response = await axios.get(
        `${API_URL}/api/academics/${student.studentId}`
      );

      setAcademic(response.data.academic);

      console.log("Academic data:", response.data.academic);

    } catch (error) {

      console.log("Academic fetch error:", error);

    }

  };

  fetchAcademicData();

}, [student?.studentId]);

useEffect(() => {

  if (!student?.studentId) return;

  const fetchInterventions = async () => {

    try {

      const response = await axios.get(
        `${API_URL}/api/interventions/${student.studentId}`
      );

      setStudentInterventions(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  fetchInterventions();

}, [student?.studentId]);



  // Dummy data for frontend development.
  // Later this will come from the backend/database.


const studentData = {
  name: student?.name || "Student",
  department: student?.department || "AI&DS",
  semester: student?.semester || "6th Semester",

  // Temporary dummy values
attendance: academic?.attendance || 0,
performance: academic?.academicAverage || 0,
assignmentsCompleted: academic?.assignmentsCompleted || 0,
totalAssignments: academic?.totalAssignments || 0,
  assessmentCompleted: true,
  riskLevel: "Low",
  mentorAssigned: false,
};

 const supportPlan = {

  mentorAssigned: studentInterventions.length > 0,

  interventions: studentInterventions,

};

const progressData = {
  attendance: {
    before: 74,
    current: 82,
  },

  academicPerformance: {
    before: 68,
    current: 76,
  },

  wellbeing: {
    before: "Needs Attention",
    current: "Improving",
  },

  sessionsCompleted: 2,
  totalSessions: 3,

  lastUpdated: "30 July 2026",
};

  const assessmentQuestions = [
  {
    id: "stress",
    question: "How would you describe your stress level recently?",
    options: ["Very Low", "Low", "Moderate", "High", "Very High"],
  },
  {
    id: "sleep",
    question: "How satisfied are you with your sleep recently?",
    options: [
      "Very Satisfied",
      "Satisfied",
      "Neutral",
      "Unsatisfied",
      "Very Unsatisfied",
    ],
  },
  {
    id: "workload",
    question: "How manageable does your academic workload feel?",
    options: [
      "Very Manageable",
      "Manageable",
      "Moderate",
      "Difficult",
      "Very Difficult",
    ],
  },
  {
    id: "concentration",
    question: "How easy has it been to concentrate while studying?",
    options: [
      "Very Easy",
      "Easy",
      "Moderate",
      "Difficult",
      "Very Difficult",
    ],
  },
  {
    id: "motivation",
    question: "How motivated do you currently feel toward your studies?",
    options: [
      "Very Motivated",
      "Motivated",
      "Neutral",
      "Low Motivation",
      "Very Low Motivation",
    ],
  },
  {
    id: "energy",
    question: "How would you describe your energy levels during the day?",
    options: ["Very Good", "Good", "Average", "Low", "Very Low"],
  },
  {
    id: "academicConfidence",
    question: "How confident do you feel about your academic progress?",
    options: [
      "Very Confident",
      "Confident",
      "Neutral",
      "Concerned",
      "Very Concerned",
    ],
  },
  {
    id: "studyRoutine",
    question: "How consistent has your study routine been?",
    options: [
      "Very Consistent",
      "Consistent",
      "Sometimes",
      "Inconsistent",
      "Very Inconsistent",
    ],
  },
  {
    id: "support",
    question: "Do you feel you have enough support when facing difficulties?",
    options: [
      "Definitely",
      "Mostly",
      "Sometimes",
      "Rarely",
      "Not at all",
    ],
  },
  {
    id: "overall",
    question: "Overall, how have you been feeling lately?",
    options: ["Very Good", "Good", "Okay", "Not Great", "Struggling"],
  },
];




  const menuItems = [
    "Overview",
    "Academics",
    "Assessment",
    "My Support",
    "Progress",
    "Feedback",
  ];

  const handleLogout = () => {
    navigate("/student-login");
  };

  const handleAssessmentAnswer = (option) => {
  const questionId = assessmentQuestions[currentQuestion].id;

  setAssessmentAnswers({
    ...assessmentAnswers,
    [questionId]: option,
  });
};


const handleNextQuestion = () => {
  const questionId = assessmentQuestions[currentQuestion].id;

  if (!assessmentAnswers[questionId]) {
    return;
  }

  if (currentQuestion < assessmentQuestions.length - 1) {
  setCurrentQuestion(currentQuestion + 1);
} else {
  submitAssessment();
}
};


const handlePreviousQuestion = () => {
  if (currentQuestion > 0) {
    setCurrentQuestion(currentQuestion - 1);
  }
};


const submitAssessment = async () => {

  console.log("submitAssessment called");

  try {

    await axios.post(
      `${API_URL}/api/assessments`,
      {
        studentId: student.studentId,
        ...assessmentAnswers,
      }
    );

    console.log("POST request successful");

    setAssessmentCompleted(true);

  } catch (error) {

    console.log(error);
    alert("Failed to submit assessment.");

  }

};

const handleFeedbackSubmit = async (event) => {
   console.log("Feedback Submit Clicked");

  event.preventDefault();

   if (studentInterventions.length === 0) {

    alert("You are not allowed to submit feedback because no intervention has been assigned to you.");

    return;

  }

  if (!feedbackRating || !needsAnotherSession) {
    return;
  }

  try {

    await axios.post(
      `${API_URL}/api/feedback`,
      {

        studentId: student.studentId,

        interventionId:
          studentInterventions[0]?._id,

        rating: feedbackRating,

        comment: feedbackComment,

        needsAnotherSession,

      }
    );

    setFeedbackSubmitted(true);

    setFeedbackRating("");
    setFeedbackComment("");
    setNeedsAnotherSession("");

  } catch (error) {

    console.log(error);

  }

};

  return (
    <div className="student-dashboard">

      {/* ================= SIDEBAR ================= */}

      <aside className="student-sidebar">

        <div
          className="dashboard-brand"
          onClick={() => navigate("/")}
        >
          <div className="dashboard-logo">E</div>

          <div>
            <h2>EduGuardian</h2>
            <span>Student Portal</span>
          </div>
        </div>


        <nav className="student-menu">

          <p className="menu-label">
            YOUR SPACE
          </p>

          {menuItems.map((item) => (
            <button
              key={item}
              className={
                activePage === item
                  ? "menu-item active"
                  : "menu-item"
              }
              onClick={() => setActivePage(item)}
            >
              <span className="menu-dot"></span>
              {item}
            </button>
          ))}

        </nav>


        <div className="sidebar-bottom">

          <div className="sidebar-profile">

            <div className="student-avatar">
              {studentData.name.charAt(0)}
            </div>

            <div>
              <strong>{studentData.name}</strong>
              <span>{studentData.department}</span>
            </div>

          </div>


          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Log out
          </button>

        </div>

      </aside>


      {/* ================= MAIN ================= */}

      <main className="dashboard-main">

        {/* TOP BAR */}

        <header className="dashboard-topbar">

          <div>
            <p className="topbar-label">
              {studentData.department} DEPARTMENT
            </p>

            <span className="semester-text">
              {studentData.semester}
            </span>
          </div>


          <div className="topbar-actions">

            <button className="notification-button">
              <span className="notification-dot"></span>
              ♢
            </button>

            <div className="topbar-profile">

              <div className="small-avatar">
                {studentData.name.charAt(0)}
              </div>

              <span>{studentData.name}</span>

            </div>

          </div>

        </header>


        {/* ================= OVERVIEW ================= */}

        {activePage === "Overview" && (

          <div className="overview-content">

            {/* Welcome */}

            <section className="welcome-section">

              <p className="page-eyebrow">
                OVERVIEW
              </p>

              <h1>
                Good to see you, {studentData.name}.
              </h1>

              <p>
                Here's a quick look at how your semester
                is progressing.
              </p>

            </section>


            {/* Main Status */}

            <section className="student-status-section">

              <div className="status-intro">

                <p className="section-small-label">
                  CURRENT STATUS
                </p>

                <h2>
                  You're making steady progress.
                </h2>

                <p>
                  Your academic and wellbeing indicators
                  currently appear stable. Keep checking in
                  regularly to stay on track.
                </p>

              </div>


              <div className="status-indicator">

                <div className="status-circle">
                  <div>
                    <span>Current</span>
                    <strong>Stable</strong>
                  </div>
                </div>

                <p>
                  Updated from your latest academic
                  and assessment data
                </p>

              </div>

            </section>


            {/* Academic Snapshot */}

            <section className="snapshot-section">

              <div className="section-title-row">

                <div>
                  <p className="section-small-label">
                    THIS SEMESTER
                  </p>

                  <h2>
                    Academic snapshot
                  </h2>
                </div>

                <button
                  className="text-link-button"
                  onClick={() => setActivePage("Academics")}
                >
                  View academics →
                </button>

              </div>


              <div className="academic-metrics">

                <div className="metric-item">

                  <div className="metric-heading">
                    <span>Attendance</span>
                    <strong>{studentData.attendance}%</strong>
                  </div>

                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${studentData.attendance}%`,
                      }}
                    ></div>
                  </div>

                  <p>
                    Overall attendance this semester
                  </p>

                </div>


                <div className="metric-divider"></div>


                <div className="metric-item">

                  <div className="metric-heading">
                    <span>Academic Average</span>
                    <strong>{studentData.performance}%</strong>
                  </div>

                  <div className="progress-track">
                    <div
                      className="progress-fill performance-fill"
                      style={{
                        width: `${studentData.performance}%`,
                      }}
                    ></div>
                  </div>

                  <p>
                    Based on current assessments
                  </p>

                </div>


                <div className="metric-divider"></div>


                <div className="metric-item">

                  <div className="metric-heading">
                    <span>Assignments</span>

                    <strong>
                      {studentData.assignmentsCompleted}/
                      {studentData.totalAssignments}
                    </strong>
                  </div>

                  <div className="progress-track">
                    <div
                      className="progress-fill assignment-fill"
                      style={{
                        width: `${
                          (studentData.assignmentsCompleted /
                            studentData.totalAssignments) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>

                  <p>
                    Assignments completed
                  </p>

                </div>

              </div>

            </section>


            {/* Lower Section */}

            <section className="overview-lower">

              {/* Assessment */}

              <div className="assessment-summary">

                <div className="summary-top">

                  <div className="summary-icon">
                    ◌
                  </div>

                  <span className="completed-badge">
                    Completed
                  </span>

                </div>


                <p className="section-small-label">
                  WELLBEING CHECK-IN
                </p>

                <h3>
                  Your latest assessment is complete.
                </h3>

                <p className="summary-description">
                  Your recent responses have been included
                  in your overall student insights.
                </p>


                <button
                  className="summary-link"
                  onClick={() =>
                    setActivePage("Assessment")
                  }
                >
                  View assessment
                  <span>→</span>
                </button>

              </div>


              {/* Support */}

              <div className="support-summary">

                <div>

                  <p className="section-small-label">
                    MY SUPPORT
                  </p>

                  <h3>
                    No support sessions currently scheduled.
                  </h3>

                  <p>
                    If additional guidance is recommended,
                    your assigned faculty mentor and session
                    details will appear here.
                  </p>

                </div>


                <div className="support-symbol">
                  ✓
                </div>

              </div>

            </section>


            {/* Small footer message */}

            <section className="dashboard-message">

              <span>✦</span>

              <p>
                Small check-ins can make a meaningful
                difference. Keep your academic and wellbeing
                information up to date.
              </p>

            </section>

          </div>

        )}


        {/* ================= TEMPORARY OTHER PAGES ================= */}

       {/* ================= ACADEMICS ================= */}

{activePage === "Academics" && (

  <div className="academics-content">

    {/* Page Heading */}

    <section className="academics-heading">

      <p className="page-eyebrow">
        ACADEMIC PERFORMANCE
      </p>

      <h1>
        Your semester at a glance.
      </h1>

      <p>
        Track your attendance, performance and coursework
        across the current semester.
      </p>

    </section>


    {/* Academic Summary */}

    <section className="academic-summary-grid">

      <div className="academic-summary-card">

        <p>ATTENDANCE</p>

        <div className="academic-value">
          {studentData.attendance}%
        </div>

        <span className="academic-status good">
          On track
        </span>

        <div className="academic-card-progress">
          <div
            style={{
              width: `${studentData.attendance}%`,
            }}
          ></div>
        </div>

        <small>
          Overall attendance this semester
        </small>

      </div>


      <div className="academic-summary-card">

        <p>ACADEMIC AVERAGE</p>

        <div className="academic-value">
          {studentData.performance}%
        </div>

        <span className="academic-status good">
          Good
        </span>

        <div className="academic-card-progress">
          <div
            style={{
              width: `${studentData.performance}%`,
            }}
          ></div>
        </div>

        <small>
          Based on current assessments
        </small>

      </div>


      <div className="academic-summary-card">

        <p>ASSIGNMENTS</p>

        <div className="academic-value">
          {studentData.assignmentsCompleted}
          <span>
            /{studentData.totalAssignments}
          </span>
        </div>

        <span className="academic-status good">
          Up to date
        </span>

        <div className="academic-card-progress">
          <div
            style={{
              width: `${
                (studentData.assignmentsCompleted /
                  studentData.totalAssignments) *
                100
              }%`,
            }}
          ></div>
        </div>

        <small>
          Coursework completed
        </small>

      </div>

    </section>


    {/* Performance Trend */}

    <section className="academic-panel">

      <div className="academic-panel-heading">

        <div>

          <p className="section-small-label">
            PERFORMANCE TREND
          </p>

          <h2>
            Recent academic performance
          </h2>

        </div>

        <span className="trend-badge">
          ↑ Improving
        </span>

      </div>


      <div className="simple-chart">

        <div className="chart-scale">

          <span>100</span>
          <span>80</span>
          <span>60</span>
          <span>40</span>

        </div>


        <div className="chart-area">

          <div className="chart-grid-line line-one"></div>
          <div className="chart-grid-line line-two"></div>
          <div className="chart-grid-line line-three"></div>
          <div className="chart-grid-line line-four"></div>


          <div className="chart-bars">

            <div className="chart-column">

              <div
                className="chart-bar"
                style={{ height: "65%" }}
              ></div>

              <span>Test 1</span>

            </div>


            <div className="chart-column">

              <div
                className="chart-bar"
                style={{ height: "72%" }}
              ></div>

              <span>Test 2</span>

            </div>


            <div className="chart-column">

              <div
                className="chart-bar"
                style={{ height: "69%" }}
              ></div>

              <span>Mid 1</span>

            </div>


            <div className="chart-column">

              <div
                className="chart-bar"
                style={{ height: "78%" }}
              ></div>

              <span>Test 3</span>

            </div>


            <div className="chart-column">

              <div
                className="chart-bar latest-bar"
                style={{ height: "82%" }}
              ></div>

              <span>Mid 2</span>

            </div>

          </div>

        </div>

      </div>

    </section>


    {/* Subject Performance */}

    <section className="academic-panel subject-panel">

      <div className="academic-panel-heading">

        <div>

          <p className="section-small-label">
            SUBJECT OVERVIEW
          </p>

          <h2>
            Subject performance
          </h2>

        </div>

      </div>


      <div className="subject-table">

        <div className="subject-row subject-header">

          <span>Subject</span>
          <span>Attendance</span>
          <span>Performance</span>
          <span>Status</span>

        </div>


        <div className="subject-row">

          <div className="subject-name">
            <strong>Predictive Analytics</strong>
            <small>AI&DS</small>
          </div>

          <span>91%</span>

          <span>84%</span>

          <span className="subject-status strong">
            Strong
          </span>

        </div>


        <div className="subject-row">

          <div className="subject-name">
            <strong>Computer Networks</strong>
            <small>AI&DS</small>
          </div>

          <span>82%</span>

          <span>76%</span>

          <span className="subject-status stable">
            Stable
          </span>

        </div>


        <div className="subject-row">

          <div className="subject-name">
            <strong>Software Testing</strong>
            <small>AI&DS</small>
          </div>

          <span>74%</span>

          <span>68%</span>

          <span className="subject-status attention">
            Watch
          </span>

        </div>


        <div className="subject-row">

          <div className="subject-name">
            <strong>Web Analytics</strong>
            <small>AI&DS</small>
          </div>

          <span>86%</span>

          <span>79%</span>

          <span className="subject-status stable">
            Stable
          </span>

        </div>

      </div>

    </section>


    {/* Academic Insight */}

    <section className="academic-insight">

      <div className="insight-symbol">
        ✦
      </div>

      <div>

        <p className="section-small-label">
          ACADEMIC INSIGHT
        </p>

        <h3>
          Your overall academic pattern is stable.
        </h3>

        <p>
          Your attendance and performance are currently
          consistent. Software Testing shows a slight
          difference compared with your other subjects,
          so keeping an eye on it may help.
        </p>

      </div>

    </section>

  </div>

)}

{/* ================= ASSESSMENT ================= */}

{activePage === "Assessment" && (

  <div className="assessment-content">

    {/* Page heading */}

    <section className="assessment-heading">

      <p className="page-eyebrow">
        WELLBEING ASSESSMENT
      </p>

      <h1>
        Take a moment to check in.
      </h1>

      <p>
        A short reflection on how you've been feeling,
        studying and managing your semester.
      </p>

    </section>


    {/* ================= NOT STARTED ================= */}

    {!assessmentStarted && !assessmentCompleted && (

      <section className="assessment-intro">

        <div className="assessment-intro-main">

          <div className="assessment-symbol">
            ◌
          </div>

          <p className="section-small-label">
            WELLBEING CHECK-IN
          </p>

          <h2>
            How have things been lately?
          </h2>

          <p>
            This check-in helps EduGuardian understand
            your current wellbeing alongside your academic
            progress. There are no right or wrong answers.
          </p>


          <div className="assessment-details">

            <div>
              <strong>10</strong>
              <span>Questions</span>
            </div>

            <div className="assessment-detail-line"></div>

            <div>
              <strong>2–3</strong>
              <span>Minutes</span>
            </div>

            <div className="assessment-detail-line"></div>

            <div>
              <strong>Private</strong>
              <span>Responses</span>
            </div>

          </div>


          <button
            className="start-assessment-button"
            onClick={() => setAssessmentStarted(true)}
          >
            <span>Start check-in</span>
            <span>→</span>
          </button>

        </div>


        <aside className="assessment-side-note">

          <p className="section-small-label">
            WHY CHECK IN?
          </p>

          <p>
            Academic performance doesn't always show the
            complete picture. Your responses help the system
            understand areas that may not be visible through
            attendance or marks alone.
          </p>

          <div className="privacy-note">
            <span>◇</span>

            <p>
              Your responses contribute only to providing
              appropriate student support.
            </p>
          </div>

        </aside>

      </section>

    )}


    {/* ================= QUESTIONS ================= */}

    {assessmentStarted && !assessmentCompleted && (

      <section className="assessment-question-card">

        {/* Progress */}

        <div className="assessment-progress-top">

          <span>
            Question {currentQuestion + 1} of{" "}
            {assessmentQuestions.length}
          </span>

          <span>
            {Math.round(
              ((currentQuestion + 1) /
                assessmentQuestions.length) *
                100
            )}
            %
          </span>

        </div>


        <div className="assessment-progress-track">

          <div
            className="assessment-progress-fill"
            style={{
              width: `${
                ((currentQuestion + 1) /
                  assessmentQuestions.length) *
                100
              }%`,
            }}
          ></div>

        </div>


        {/* Question */}

        <div className="question-area">

          <p className="question-number">
            REFLECTION {currentQuestion + 1}
          </p>

          <h2>
            {
              assessmentQuestions[currentQuestion]
                .question
            }
          </h2>


          <div className="answer-options">

            {assessmentQuestions[
              currentQuestion
            ].options.map((option) => {

              const questionId =
                assessmentQuestions[currentQuestion].id;

              const selected =
                assessmentAnswers[questionId] === option;

              return (

                <button
                  key={option}
                  className={
                    selected
                      ? "answer-option selected"
                      : "answer-option"
                  }
                  onClick={() =>
                    handleAssessmentAnswer(option)
                  }
                >

                  <span className="option-circle">
                    {selected && "✓"}
                  </span>

                  <span>{option}</span>

                </button>

              );

            })}

          </div>

        </div>


        {/* Navigation */}

        <div className="assessment-navigation">

          <button
            className="assessment-back-button"
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
          >
            ← Previous
          </button>


          <button
            className="assessment-next-button"
            onClick={handleNextQuestion}
            disabled={
              !assessmentAnswers[
                assessmentQuestions[currentQuestion].id
              ]
            }
          >

            {currentQuestion ===
            assessmentQuestions.length - 1
              ? "Complete check-in"
              : "Next"}

            <span>→</span>

          </button>

        </div>

      </section>

    )}


    {/* ================= COMPLETED ================= */}

    {assessmentCompleted && (

      <section className="assessment-complete">

        <div className="complete-symbol">
          ✓
        </div>

        <p className="section-small-label">
          CHECK-IN COMPLETE
        </p>

        <h2>
          Thank you for checking in.
        </h2>

        <p className="complete-description">
          Your responses have been recorded and will
          contribute to your overall student insights.
        </p>


        <div className="assessment-result">

          <div>

            <span>CURRENT INDICATION</span>

            <strong>
              Your responses have been recorded
            </strong>

          </div>

          <div className="result-indicator">
            ✓
          </div>

        </div>


        <p className="result-note">
          Once the prediction model is connected,
          EduGuardian will analyze these responses
          together with relevant academic indicators.
        </p>


        <button
          className="return-overview-button"
          onClick={() => setActivePage("Overview")}
        >
          Return to overview
          <span>→</span>
        </button>

      </section>

    )}

  </div>

)}

{/* ================= MY SUPPORT ================= */}

{activePage === "My Support" && (

  <div className="support-content">

    {/* Page Heading */}

    <section className="support-page-heading">

      <p className="page-eyebrow">
        MY SUPPORT
      </p>

      <h1>
        Support when you need it.
      </h1>

      <p>
        View your faculty mentor, upcoming conversations
        and the progress of your current support plan.
      </p>

    </section>


    {supportPlan.mentorAssigned ? (

      <>

        {/* Mentor Introduction */}

        <section className="mentor-section">

          <div className="mentor-information">

            <p className="section-small-label">
              YOUR FACULTY MENTOR
            </p>

            <div className="mentor-profile">

              <div className="mentor-avatar">
                PS
              </div>

              <div>

                <h2>
                  {supportPlan.interventions[0]?.recommendedAction}
                </h2>

                <p>
                 Faculty Mentor
                </p>

                <span>
                  Student Support
                </span>

              </div>

            </div>


            <p className="mentor-description">
              Your faculty mentor is available to understand
              your current academic experience, discuss any
              difficulties you may be facing and help identify
              appropriate next steps.
            </p>

          </div>


          <div className="mentor-note">

            <span>◇</span>

            <p>
              Support conversations are intended to provide
              guidance and help you move forward.
            </p>

          </div>

        </section>


        {/* Upcoming Session */}

        <section className="next-session-section">

          <div className="session-heading">

            <div>

              <p className="section-small-label">
                NEXT CONVERSATION
              </p>

              <h2>
                Upcoming faculty session
              </h2>

            </div>

            <span className="upcoming-badge">
              Upcoming
            </span>

          </div>


          <div className="session-details">

            <div className="session-date-block">

              <span className="session-day">
                02
              </span>

              <span className="session-month">
                AUG
              </span>

            </div>


            <div className="session-information">

              <div>

                <span>DATE</span>

                <strong>
                  {new Date(
  supportPlan.interventions[0]?.followUpDate
).toLocaleDateString()}
                </strong>

              </div>


              <div>

                <span>TIME</span>

                <strong>
                  To be communicated
                </strong>

              </div>


              <div>

                <span>LOCATION</span>

                <strong>
                 Faculty Office
                </strong>

              </div>

            </div>

          </div>


          <div className="session-message">

            <span>✦</span>

            <p>
              You don't need to prepare anything formal.
              This is simply an opportunity to talk about
              how things are going.
            </p>

          </div>

        </section>


        {/* Support Journey */}

        <section className="support-journey-section">

          <div className="support-journey-heading">

            <p className="section-small-label">
              SUPPORT JOURNEY
            </p>

            <h2>
              Your current support plan
            </h2>

          </div>


          <div className="support-timeline">

            {supportPlan.interventions.map(
              (session, index) => (

                <div
                  className="support-timeline-item"
                  key={session._id}
                >

                  <div className="timeline-marker-area">

                    <div
                      className={`timeline-marker ${session.status}`}
                    >
                      {session.status === "completed"
                        ? "✓"
                        : index + 1}
                    </div>

                    {index <
                      supportPlan.interventions.length - 1 && (
                      <div className="timeline-line"></div>
                    )}

                  </div>


                  <div className="timeline-content">

                    <div>

                      <h3>
                         {session.interventionType}
                      </h3>

                      <p>
                        {new Date(session.followUpDate).toLocaleDateString()}
                      </p>

                    </div>


                    <span
  className={`timeline-status ${session.status.toLowerCase()}`}
>
  {session.status}
</span>

                  </div>

                </div>

              )
            )}

          </div>

        </section>


        {/* Student Message */}

        <section className="support-reminder">

          <div className="support-reminder-symbol">
            ◌
          </div>

          <div>

            <p className="section-small-label">
              A SMALL REMINDER
            </p>

            <h3>
              Support is a process, not a single conversation.
            </h3>

            <p>
              Your progress and future check-ins help your
              faculty mentor understand whether the support
              provided is helping.
            </p>

          </div>

        </section>

      </>

    ) : (

      /* No mentor assigned */

      <section className="no-support-section">

        <div className="no-support-symbol">
          ✓
        </div>

        <p className="section-small-label">
          CURRENTLY
        </p>

        <h2>
          No support sessions are scheduled.
        </h2>

        <p>
          You don't currently have an active faculty support
          plan. If additional guidance is recommended,
          your mentor and session details will appear here.
        </p>


        <button
          onClick={() => setActivePage("Overview")}
        >
          Return to overview →
        </button>

      </section>

    )}

  </div>

)}

{/* ================= PROGRESS ================= */}

{activePage === "Progress" && (

  <div className="progress-content">

    {/* Page Heading */}

    <section className="progress-page-heading">

      <p className="page-eyebrow">
        YOUR PROGRESS
      </p>

      <h1>
        See how things are changing.
      </h1>

      <p>
        A simple view of your academic and wellbeing
        progress over time.
      </p>

    </section>


    {/* Progress Summary */}

    <section className="progress-summary">

      <div>

        <p className="section-small-label">
          CURRENT PROGRESS
        </p>

        <h2>
          You're moving in a positive direction.
        </h2>

        <p>
          Your recent academic indicators show improvement
          compared with your earlier records. Continued
          check-ins will help build a clearer picture over time.
        </p>

      </div>


      <div className="progress-summary-symbol">
        <span>↑</span>

        <strong>
          Improving
        </strong>
      </div>

    </section>


    {/* ================= CHANGES ================= */}

    <section className="progress-comparison-section">

      <div className="progress-section-heading">

        <div>

          <p className="section-small-label">
            SINCE SUPPORT BEGAN
          </p>

          <h2>
            Changes we've observed
          </h2>

        </div>

        <span className="last-updated">
          Updated {progressData.lastUpdated}
        </span>

      </div>


      <div className="progress-comparison-grid">

        {/* Attendance */}

        <div className="progress-comparison-card">

          <div className="progress-card-top">

            <span>
              ATTENDANCE
            </span>

            <div className="improvement-tag">
              +{progressData.attendance.current -
                progressData.attendance.before}%
            </div>

          </div>


          <div className="before-after-values">

            <div>

              <span>Earlier</span>

              <strong>
                {progressData.attendance.before}%
              </strong>

            </div>


            <div className="change-arrow">
              →
            </div>


            <div>

              <span>Current</span>

              <strong className="current-value">
                {progressData.attendance.current}%
              </strong>

            </div>

          </div>


          <div className="comparison-progress-track">

            <div
              className="comparison-before"
              style={{
                width: `${progressData.attendance.before}%`,
              }}
            ></div>

            <div
              className="comparison-current"
              style={{
                width: `${progressData.attendance.current}%`,
              }}
            ></div>

          </div>


          <p>
            Your overall attendance has improved
            since your earlier semester record.
          </p>

        </div>


        {/* Academic Performance */}

        <div className="progress-comparison-card">

          <div className="progress-card-top">

            <span>
              ACADEMIC PERFORMANCE
            </span>

            <div className="improvement-tag">
              +{progressData.academicPerformance.current -
                progressData.academicPerformance.before}%
            </div>

          </div>


          <div className="before-after-values">

            <div>

              <span>Earlier</span>

              <strong>
                {progressData.academicPerformance.before}%
              </strong>

            </div>


            <div className="change-arrow">
              →
            </div>


            <div>

              <span>Current</span>

              <strong className="current-value">
                {progressData.academicPerformance.current}%
              </strong>

            </div>

          </div>


          <div className="comparison-progress-track">

            <div
              className="comparison-before"
              style={{
                width:
                  `${progressData.academicPerformance.before}%`,
              }}
            ></div>

            <div
              className="comparison-current"
              style={{
                width:
                  `${progressData.academicPerformance.current}%`,
              }}
            ></div>

          </div>


          <p>
            Your recent academic average is higher
            than your earlier recorded performance.
          </p>

        </div>

      </div>

    </section>


    {/* ================= WELLBEING ================= */}

    <section className="wellbeing-progress-section">

      <div>

        <p className="section-small-label">
          WELLBEING CHECK-INS
        </p>

        <h2>
          Your recent check-ins
        </h2>

        <p>
          Wellbeing progress is based on patterns across
          your voluntary assessment responses.
        </p>

      </div>


      <div className="wellbeing-change">

        <div className="wellbeing-state previous">

          <span>EARLIER</span>

          <strong>
            {progressData.wellbeing.before}
          </strong>

        </div>


        <div className="wellbeing-arrow">
          →
        </div>


        <div className="wellbeing-state current">

          <span>CURRENT</span>

          <strong>
            {progressData.wellbeing.current}
          </strong>

        </div>

      </div>

    </section>


    {/* ================= SUPPORT PROGRESS ================= */}

    <section className="support-progress-section">

      <div className="support-progress-heading">

        <div>

          <p className="section-small-label">
            SUPPORT PLAN
          </p>

          <h2>
            Your support journey
          </h2>

        </div>


        <strong>
          {progressData.sessionsCompleted}/
          {progressData.totalSessions}
        </strong>

      </div>


      <div className="session-progress-track">

        <div
          className="session-progress-fill"
          style={{
            width:
              `${
                (progressData.sessionsCompleted /
                  progressData.totalSessions) *
                100
              }%`,
          }}
        ></div>

      </div>


      <div className="support-progress-labels">

        <span>
          {progressData.sessionsCompleted} sessions completed
        </span>

        <span>
          {progressData.totalSessions -
            progressData.sessionsCompleted} remaining
        </span>

      </div>

    </section>


    {/* ================= TIMELINE ================= */}

    <section className="progress-history-section">

      <div className="progress-section-heading">

        <div>

          <p className="section-small-label">
            RECENT ACTIVITY
          </p>

          <h2>
            Progress timeline
          </h2>

        </div>

      </div>


      <div className="progress-history">

        <div className="history-item">

          <div className="history-marker">
            ✓
          </div>

          <div>

            <span>30 JUL</span>

            <h3>
              Academic progress updated
            </h3>

            <p>
              Attendance and recent assessment
              performance were updated.
            </p>

          </div>

        </div>


        <div className="history-line"></div>


        <div className="history-item">

          <div className="history-marker">
            ✓
          </div>

          <div>

            <span>25 JUL</span>

            <h3>
              Faculty support session completed
            </h3>

            <p>
              Your first faculty discussion was
              marked as completed.
            </p>

          </div>

        </div>


        <div className="history-line"></div>


        <div className="history-item">

          <div className="history-marker soft">
            ◌
          </div>

          <div>

            <span>22 JUL</span>

            <h3>
              Wellbeing check-in completed
            </h3>

            <p>
              Your latest voluntary assessment
              responses were recorded.
            </p>

          </div>

        </div>

      </div>

    </section>


    {/* Message */}

    <section className="progress-message">

      <span>✦</span>

      <div>

        <h3>
          Progress can take time.
        </h3>

        <p>
          EduGuardian looks at changes over time rather
          than relying on a single score, session or
          assessment.
        </p>

      </div>

    </section>

  </div>

)}

{/* ================= FEEDBACK ================= */}

{activePage === "Feedback" && (

  <div className="feedback-content">

    {/* Page Heading */}

    <section className="feedback-page-heading">

      <p className="page-eyebrow">
        FEEDBACK
      </p>

      <h1>
        Tell us how support is working.
      </h1>

      <p>
        Your feedback helps your faculty mentor understand
        whether the support provided has been useful and
        whether any follow-up may be needed.
      </p>

    </section>


    {!feedbackSubmitted ? (

      <div className="feedback-layout">

        {/* Feedback Form */}

        <form
          className="feedback-form"
          onSubmit={handleFeedbackSubmit}
        >

          <div className="feedback-form-heading">

            <p className="section-small-label">
              RECENT SUPPORT SESSION
            </p>

            <h2>
              How was your conversation?
            </h2>

            <p>
              Think about your most recent faculty support
              session when answering these questions.
            </p>

          </div>


          {/* Rating */}

          <div className="feedback-question">

            <label>
              How helpful was the session?
            </label>

            <div className="feedback-rating-options">

              {[
                "Very Helpful",
                "Helpful",
                "Neutral",
                "Not Helpful",
              ].map((option) => (

                <button
                  type="button"
                  key={option}
                  className={
                    feedbackRating === option
                      ? "feedback-rating selected"
                      : "feedback-rating"
                  }
                  onClick={() =>
                    setFeedbackRating(option)
                  }
                >
                  <span className="feedback-radio">
                    {feedbackRating === option && "✓"}
                  </span>

                  {option}
                </button>

              ))}

            </div>

          </div>


          {/* Comment */}

          <div className="feedback-question">

            <label htmlFor="feedback-comment">
              Is there anything you'd like to share?
              <span> Optional</span>
            </label>

            <textarea
              id="feedback-comment"
              rows="5"
              placeholder="Share what was helpful, what could be improved, or anything you'd like your mentor to know..."
              value={feedbackComment}
              onChange={(event) =>
                setFeedbackComment(event.target.value)
              }
            ></textarea>

          </div>


          {/* Another Session */}

          <div className="feedback-question">

            <label>
              Do you feel another support session
              would be useful?
            </label>

            <div className="session-choice-options">

              {[
                "Yes",
                "No",
                "Not sure",
              ].map((option) => (

                <button
                  type="button"
                  key={option}
                  className={
                    needsAnotherSession === option
                      ? "session-choice selected"
                      : "session-choice"
                  }
                  onClick={() =>
                    setNeedsAnotherSession(option)
                  }
                >
                  {option}
                </button>

              ))}

            </div>

          </div>


          {/* Submit */}

          <div className="feedback-submit-area">

            <p>
              Your feedback will be included in your
              support record.
            </p>

            <button
              type="submit"
              className="feedback-submit-button"
              disabled={
                !feedbackRating ||
                !needsAnotherSession
              }
            >
              Submit feedback
              <span>→</span>
            </button>

          </div>

        </form>


        {/* Right Side */}

        <aside className="feedback-side-panel">

          <div className="feedback-session-card">

            <p className="section-small-label">
              SESSION
            </p>

            <h3>
              {supportPlan.interventions[0]?.interventionType}
            </h3>

            <div className="feedback-session-info">

              <div>
                <span>DATE</span>
                <strong>
  {supportPlan.interventions[0]
    ? new Date(
        supportPlan.interventions[0].followUpDate
      ).toLocaleDateString()
    : "-"}
</strong>
              </div>

              <div>
                <span>MENTOR</span>
                <strong>
                   {supportPlan.interventions[0]?.recommendedAction}
                </strong>
              </div>

            </div>

            <span  className={`session-completed-label ${supportPlan.interventions[0]?.status?.toLowerCase()}`}
>
  {supportPlan.interventions[0]?.status}
            </span>

          </div>


          <div className="feedback-why">

            <span>◇</span>

            <div>

              <h3>
                Why your feedback matters
              </h3>

              <p>
                Feedback helps faculty understand whether
                the current support approach is useful and
                whether changes or additional follow-ups
                may be appropriate.
              </p>

            </div>

          </div>

        </aside>

      </div>

    ) : (

      /* ================= SUBMITTED ================= */

      <section className="feedback-success">

        <div className="feedback-success-icon">
          ✓
        </div>

        <p className="section-small-label">
          FEEDBACK SUBMITTED
        </p>

        <h2>
          Thank you for sharing.
        </h2>

        <p>
          Your feedback has been recorded. It will help
          your faculty mentor understand how the support
          process is working for you.
        </p>


        <div className="submitted-feedback-summary">

          <div>

            <span>SESSION EXPERIENCE</span>

            <strong>
              {feedbackRating}
            </strong>

          </div>


          <div>

            <span>ANOTHER SESSION</span>

            <strong>
              {needsAnotherSession}
            </strong>

          </div>

        </div>


        <button
          onClick={() =>
            setActivePage("Overview")
          }
        >
          Return to overview
          <span>→</span>
        </button>

      </section>

    )}

  </div>

)}



      </main>

    </div>
  );
}

export default StudentDashboard;