import {useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FacultyDashboard.css";
import axios from "axios";

function FacultyDashboard() {
  const navigate = useNavigate();

  const [activeModule, setActiveModule] = useState("Overview");
  const [activeSubPage, setActiveSubPage] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [studentSearch, setStudentSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("All Years");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [attentionSearch, setAttentionSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All Priorities");
  const [signalFilter, setSignalFilter] = useState("All Signals");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [facultyNote, setFacultyNote] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);
  const [showInterventionModal, setShowInterventionModal] = useState(false);
  const [interventionType, setInterventionType] = useState("Academic Support");
  const [interventionMessage, setInterventionMessage] = useState("");
  const [recommendedAction, setRecommendedAction] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [showOnDashboard, setShowOnDashboard] = useState(true);
  const [sendEmail, setSendEmail] = useState(true);
  const [reviewNotice, setReviewNotice] = useState("");
  const [supportSearch, setSupportSearch] = useState("");
  const [supportStatusFilter, setSupportStatusFilter] = useState("All Status");
  const [selectedInterventionCase, setSelectedInterventionCase] = useState(null);
  const [allStudents, setAllStudents] = useState([]);
  const [attentionStudents, setAttentionStudents] = useState([]);
  const [interventions, setInterventions] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
 

  // Temporary faculty data.
  // Later this will come from the authenticated faculty account.
const faculty = JSON.parse(localStorage.getItem("faculty"));

const facultyData = {
  name: faculty?.name || "Faculty",

  initials: faculty?.name
    ? faculty.name
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase()
    : "F",

  role: faculty?.designation || "Faculty Mentor",

  department: faculty?.department || "AI & DS",
};

useEffect(() => {

  const fetchStudents = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/students"
      );

      setAllStudents(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  fetchStudents();

}, []);

useEffect(() => {

  const fetchAnalysis = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/analysis"
      );

      setAttentionStudents(response.data);
      console.log("Analysis API Response:", response.data);

    } catch (error) {

      console.log(error);

    }

  };

  fetchAnalysis();

}, []);

useEffect(() => {

  const fetchInterventions = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/interventions"
      );

      setInterventions(response.data);

      console.log("Interventions:", response.data);

    } catch (error) {

      console.log(error);

    }

  };

  fetchInterventions();

}, []);

useEffect(() => {

  const fetchFeedbacks = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/feedback"
      );

      setFeedbacks(response.data);

      console.log("Feedbacks:", response.data);

    } catch (error) {

      console.log(error);

    }

  };

  fetchFeedbacks();

}, []);

  // Temporary dashboard data.
  // Later this will come from backend APIs.


 

 

 

  const attentionSummary = {
    highPriority: attentionStudents.filter(
      (student) => student.overallStatus === "High Priority"
    ).length,
    needsAttention: attentionStudents.filter(
      (student) => student.overallStatus === "Needs Attention"
    ).length,
    activeSupport: attentionStudents.filter(
      (student) => student.overallStatus === "Active Support"
    ).length,
  };

const filteredAttentionStudents = attentionStudents.filter((student) => {
  // Don't show stable students
  if (student.overallStatus === "Stable") return false;
  const query = attentionSearch.trim().toLowerCase();
  const matchesSearch =
    !query ||
    student.studentName?.toLowerCase().includes(query) ||
    student.studentId?.toLowerCase().includes(query);
  const matchesPriority =
    priorityFilter === "All Priorities" ||
    student.overallStatus === priorityFilter;
  const matchesSignal =
    signalFilter === "All Signals" ||
    student.source === signalFilter;
  return matchesSearch && matchesPriority && matchesSignal;
});

  const filteredStudents = allStudents.filter((student) => {

  const query = studentSearch.trim().toLowerCase();

  const matchesSearch =
    !query ||
    student.name.toLowerCase().includes(query) ||
    student.studentId.toLowerCase().includes(query);

  const matchesYear =
    yearFilter === "All Years" ||
    student.year === yearFilter;

  const matchesStatus =
    statusFilter === "All Status" ||
    (student.status ?? "Stable") === statusFilter;

  return (
    matchesSearch &&
    matchesYear &&
    matchesStatus
  );

});


 const interventionCaseDetails = {
    "INT-201": {
      goal: "Improve academic consistency and help the student follow a manageable weekly study routine.",
      mentor: "Dr. Priya Sharma",
      started: "20 Jul 2026",
      sessions: [
        { date:"22 Jul 2026", title:"Initial academic mentoring session", note:"Discussed recent academic difficulties, missed coursework, and study routine. A weekly study plan was suggested.", recordedBy:"Dr. Priya Sharma" },
        { date:"30 Jul 2026", title:"Study plan review", note:"Reviewed the student's study plan and recent assessment performance. Student reported better consistency and engagement.", recordedBy:"Dr. Priya Sharma" },
      ]
    },
    "INT-202": {
      goal: "Provide a safe faculty check-in and monitor whether wellbeing concerns are affecting academic participation.",
      mentor: "Prof. Anil Menon",
      started: "26 Jul 2026",
      sessions: [
        { date:"29 Jul 2026", title:"Wellbeing check-in", note:"Student discussed high stress and difficulty maintaining a regular sleep schedule. Faculty recommended a mentor conversation and continued check-ins.", recordedBy:"Prof. Anil Menon" },
      ]
    },
    "INT-203": {
      goal: "Maintain regular mentoring and monitor engagement, workload, and academic confidence.",
      mentor: "Dr. Priya Sharma",
      started: "08 Jul 2026",
      sessions: [
        { date:"10 Jul 2026", title:"Initial mentoring session", note:"Reviewed academic workload and identified areas where the student needed structured support.", recordedBy:"Dr. Priya Sharma" },
        { date:"19 Jul 2026", title:"Progress discussion", note:"Student reported improved task planning. Faculty advised continuing the fortnightly mentoring routine.", recordedBy:"Dr. Priya Sharma" },
        { date:"28 Jul 2026", title:"Engagement review", note:"Reviewed recent participation and assessment activity. Engagement remains stable and support will continue.", recordedBy:"Dr. Priya Sharma" },
      ]
    },
    "INT-198": {
      goal: "Improve attendance consistency through monitoring and an attendance recovery plan.",
      mentor: "Dr. Priya Sharma",
      started: "02 Jul 2026",
      sessions: [
        { date:"04 Jul 2026", title:"Attendance concern review", note:"Discussed repeated absences and identified timetable and workload issues affecting attendance.", recordedBy:"Dr. Priya Sharma" },
        { date:"10 Jul 2026", title:"Recovery plan created", note:"Created an attendance recovery plan and agreed on weekly attendance targets.", recordedBy:"Dr. Priya Sharma" },
        { date:"17 Jul 2026", title:"Mid-plan review", note:"Attendance showed improvement. Student was encouraged to continue the recovery plan.", recordedBy:"Dr. Priya Sharma" },
        { date:"24 Jul 2026", title:"Final attendance review", note:"Attendance improved consistently and the support case was marked completed.", recordedBy:"Dr. Priya Sharma" },
      ]
    }
  };

  const followUps = [
    { id:"FUP-301", student:"Sneha Rao", studentId:"STU-1087", initials:"SR", intervention:"Wellbeing Check-in", scheduled:"02 Aug 2026", lastNote:"Student was asked to meet the faculty mentor.", status:"Due Soon" },
    { id:"FUP-302", student:"Aarav Reddy", studentId:"STU-1042", initials:"AR", intervention:"Academic Support", scheduled:"05 Aug 2026", lastNote:"Weekly study plan shared with the student.", status:"Scheduled" },
    { id:"FUP-303", student:"Rohan Das", studentId:"STU-1160", initials:"RD", intervention:"Faculty Mentoring", scheduled:"06 Aug 2026", lastNote:"Continue monitoring engagement and stress indicators.", status:"Scheduled" },
    { id:"FUP-296", student:"Meera Shah", studentId:"STU-1104", initials:"MS", intervention:"Attendance Support", scheduled:"24 Jul 2026", lastNote:"Attendance improved after the support plan.", status:"Completed" },
  ];

 

  const supportMatches = (student, studentId) => {
    const q = supportSearch.trim().toLowerCase();
    return !q || student.toLowerCase().includes(q) || studentId.toLowerCase().includes(q);
  };

  const filteredInterventions = interventions.filter(item =>
    supportMatches(item.student, item.studentId) &&
    (supportStatusFilter === "All Status" || item.status === supportStatusFilter)
  );

 const filteredFollowUps = interventions.filter((item) => {
  const query = supportSearch.trim().toLowerCase();

  const matchesSearch =
    !query ||
    item.studentName.toLowerCase().includes(query) ||
    item.studentId.toLowerCase().includes(query);

  const matchesStatus =
    supportStatusFilter === "All Status" ||
    item.status === supportStatusFilter;

  return matchesSearch && matchesStatus;
});

  const filteredOutcomes = feedbacks.filter((item) => {

  const query = supportSearch.trim().toLowerCase();

  const matchesSearch =
    !query ||
    item.studentName.toLowerCase().includes(query) ||
    item.studentId.toLowerCase().includes(query);

  const matchesOutcome =
    supportStatusFilter === "All Status" ||
    item.outcome === supportStatusFilter;

  return matchesSearch && matchesOutcome;

});

  const upcomingSessions = [
    {
      student: "Aarav Reddy",
      type: "Mentor check-in",
      time: "11:30 AM",
    },
    {
      student: "Sneha Rao",
      type: "Follow-up discussion",
      time: "2:00 PM",
    },
    {
      student: "Rahul Kumar",
      type: "Academic support",
      time: "Tomorrow · 10:00 AM",
    },
  ];

  const recentActivity = [
    {
      type: "assessment",
      title: "Wellbeing assessment flagged a student",
      description: "Sneha Rao · Needs Attention",
      time: "35 min ago",
    },
    {
      type: "session",
      title: "Faculty support session completed",
      description: "Aarav Reddy · Mentor check-in",
      time: "2 hrs ago",
    },
    {
      type: "intervention",
      title: "New intervention assigned",
      description: "Rahul Kumar · Academic support",
      time: "Yesterday",
    },
  ];

 const openStudentReview = async (student) => {

  try {

    const [academicRes, assessmentRes, analysisRes] =
      await Promise.all([

        axios.get(
          `http://localhost:5000/api/academics/${student.studentId}`
        ),

        axios.get(
          `http://localhost:5000/api/assessments/${student.studentId}`
        ),

        axios.get(
          `http://localhost:5000/api/analysis/${student.studentId}`
        ),

      ]);

console.log({
  academic: academicRes.data,
  assessment: assessmentRes.data,
  analysis: analysisRes.data,
});

    setSelectedStudent({

      ...analysisRes.data,

     attendance:
  academicRes.data.academic.attendance,

academicAverage:
  academicRes.data.academic.academicAverage,

      assessment:
        assessmentRes.data,

    });

    console.log("Selected Student:", {
  ...analysisRes.data,
  attendance: academicRes.data.academic.attendance,
  academicAverage: academicRes.data.academic.academicAverage,
  assessment: assessmentRes.data,
});

    setFacultyNote("");

    setReviewNotice("");

  } catch (error) {

    console.log(error);

  }

};

  const closeStudentReview = () => {
    setSelectedStudent(null);
    setReviewNotice("");
  };

  const saveFacultyNote = () => {
    const note = facultyNote.trim();

    if (!note) {
      setReviewNotice("Write a note before saving.");
      return;
    }

    setSavedNotes((current) => [
      {
        id: Date.now(),
        studentId:
selectedStudent?.studentId ??
selectedStudent?.id,
        text: note,
        createdAt: "Just now",
      },
      ...current,
    ]);

    setFacultyNote("");
    setReviewNotice("Faculty note saved for this prototype.");
  };

  const scheduleFollowUp = () => {
    setReviewNotice(
      "Follow-up scheduling will be connected to the backend next."
    );
  };

  const markReviewed = () => {
    setReviewNotice("Student review marked as completed in this prototype.");
  };

  const openInterventionModal = () => {
    setInterventionType("Academic Support");
    setInterventionMessage("");
    setRecommendedAction("");
    setFollowUpDate("");
    setShowOnDashboard(true);
    setSendEmail(true);
    setShowInterventionModal(true);
    setReviewNotice("");
  };

 const createIntervention = async (event) => {

  event.preventDefault();

  if (!interventionMessage.trim() || !recommendedAction.trim()) {

    setReviewNotice(
      "Add a student message and recommended action before creating the intervention."
    );

    return;

  }

  try {

    await axios.post(
      "http://localhost:5000/api/interventions",
      {

        studentId: selectedStudent.studentId,

        studentName: selectedStudent.studentName,

        interventionType,

        message: interventionMessage,

        recommendedAction,

        followUpDate,

        showOnDashboard,

        sendEmail,

      }
    );

    setShowInterventionModal(false);

    const channels = [];

    if (showOnDashboard) channels.push("Student Dashboard");

    if (sendEmail) channels.push("College Email");

    setReviewNotice(
      `Intervention created successfully for ${selectedStudent.studentName}${
        channels.length
          ? ` · Notification: ${channels.join(" + ")}`
          : ""
      }.`
    );

    // Reset Form

    setInterventionType("Academic Support");
    setInterventionMessage("");
    setRecommendedAction("");
    setFollowUpDate("");
    setShowOnDashboard(true);
    setSendEmail(true);

  } catch (error) {

    console.log(error);

    setReviewNotice("Failed to create intervention.");

  }

};

  const selectModule = (module) => {
    setActiveModule(module);

    if (module === "Students") {
      setActiveSubPage("All Students");
    } else if (module === "Support") {
      setActiveSubPage("Interventions");
    } else {
      setActiveSubPage("");
    }
  };

  const handleLogout = () => {
    navigate("/faculty-login");
  };

  return (
    <div className="faculty-dashboard">

      {/* =====================================
          DARK FACULTY HEADER
      ===================================== */}

      <header className="faculty-header">

        <div className="faculty-brand-area">

          <button
            className="faculty-brand"
            onClick={() => navigate("/")}
          >
            <span className="faculty-brand-mark">E</span>

            <div>
              <strong>EduGuardian</strong>
              <span>FACULTY WORKSPACE</span>
            </div>
          </button>

        </div>


        <div className="faculty-profile-area">

          <div className="faculty-profile-text">
            <strong>{facultyData.name}</strong>

            <span>
              {facultyData.role} · {facultyData.department}
            </span>
          </div>

          <div className="faculty-profile-avatar">
            {facultyData.initials}
          </div>

          <button
            className="faculty-logout"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>


      {/* =====================================
          PRIMARY MODULE NAVIGATION
      ===================================== */}

      <nav className="faculty-module-nav">
        <div className="module-nav-inner">
          <button className={activeModule === "Overview" ? "module-nav-item active" : "module-nav-item"} onClick={() => { setActiveModule("Overview"); setActiveSubPage(""); setOpenDropdown(null); }}>Overview</button>

          <div className="faculty-nav-dropdown">
            <button className={activeModule === "Students" ? "module-nav-item active" : "module-nav-item"} onClick={() => setOpenDropdown(openDropdown === "Students" ? null : "Students")}>Students <span className={openDropdown === "Students" ? "nav-arrow open" : "nav-arrow"}>▾</span></button>
            {openDropdown === "Students" && (
              <div className="faculty-dropdown-menu">
                {["All Students", "Attention Required"].map((page) => (
                  <button key={page} className={activeModule === "Students" && activeSubPage === page ? "faculty-dropdown-item active" : "faculty-dropdown-item"} onClick={() => { setActiveModule("Students"); setActiveSubPage(page); setOpenDropdown(null); }}><span>{page}</span><span>→</span></button>
                ))}
              </div>
            )}
          </div>

          <div className="faculty-nav-dropdown">
            <button className={activeModule === "Support" ? "module-nav-item active" : "module-nav-item"} onClick={() => setOpenDropdown(openDropdown === "Support" ? null : "Support")}>Support <span className={openDropdown === "Support" ? "nav-arrow open" : "nav-arrow"}>▾</span></button>
            {openDropdown === "Support" && (
              <div className="faculty-dropdown-menu">
                {["Interventions", "Follow-ups", "Outcomes"].map((page) => (
                  <button key={page} className={activeModule === "Support" && activeSubPage === page ? "faculty-dropdown-item active" : "faculty-dropdown-item"} onClick={() => { setActiveModule("Support"); setActiveSubPage(page); setOpenDropdown(null); }}><span>{page}</span><span>→</span></button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>


      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <main className="faculty-main">

        {/* =====================================
            OVERVIEW
        ===================================== */}

        {activeModule === "Overview" && (

          <div className="faculty-overview">

            {/* Heading */}

            <section className="faculty-page-heading">

              <div>

                <p className="faculty-eyebrow">
                  FACULTY OVERVIEW
                </p>

                <h1>
                  Good morning, {facultyData.name}
                </h1>

                <p>
                  Here's what needs your attention today.
                </p>

              </div>


              <div className="overview-date">

                <span>THURSDAY</span>

                <strong>
                  31 July 2026
                </strong>

              </div>

            </section>


            {/* =====================================
                SUMMARY
            ===================================== */}

            <section className="faculty-stats-grid">

              {/* Total Students */}

              <article className="faculty-stat-card neutral">

                <div className="stat-card-heading">

                  <span>
                    TOTAL STUDENTS
                  </span>

                  <span className="stat-symbol">
                    01
                  </span>

                </div>

                <strong className="faculty-stat-number">
                  {allStudents.length}
                </strong>

                <p>
                  AI & DS students
                </p>

                <button
                  onClick={() => {
                    setActiveModule("Students");
                    setActiveSubPage("All Students");
                  }}
                >
                  View students →
                </button>

              </article>


              {/* Attention */}

              <article className="faculty-stat-card attention">

                <div className="stat-card-heading">

                  <span>
                    NEED ATTENTION
                  </span>

                  <span className="stat-symbol">
                    !
                  </span>

                </div>

                <strong className="faculty-stat-number">
  {
    allStudents.filter(
      student =>
        student.assessment &&
        student.assessment !== "Stable"
    ).length
  }
</strong>

                <p>
                  <strong>
  {
    allStudents.filter(
      student => student.status === "High Priority"
    ).length
  }
</strong>{" "}
                  high priority
                </p>

                <button
                  onClick={() => {
                    setActiveModule("Students");
                    setActiveSubPage("Attention Required");
                  }}
                >
                  Review students →
                </button>

              </article>


              {/* Active Support */}

              <article className="faculty-stat-card support">

                <div className="stat-card-heading">

                  <span>
                    ACTIVE SUPPORT
                  </span>

                  <span className="stat-symbol">
                    ◇
                  </span>

                </div>

                <strong className="faculty-stat-number">
  {
    allStudents.filter(
      student => student.status === "Active Support"
    ).length
  }
</strong>

                <p>
                  <strong>
                   0
                  </strong>{" "}
                  currently improving
                </p>

                <button
                  onClick={() => {
                    setActiveModule("Support");
                    setActiveSubPage("Interventions");
                  }}
                >
                  View support →
                </button>

              </article>

            </section>


            {/* =====================================
                ATTENTION REQUIRED
            ===================================== */}

            <section className="faculty-panel attention-panel">

              <div className="faculty-panel-heading">

                <div>

                  <p className="faculty-section-label">
                    PRIORITY REVIEW
                  </p>

                  <h2>
                    Students requiring attention
                  </h2>

                  <p>
                    Recent academic and wellbeing signals
                    that may require faculty review.
                  </p>

                </div>


                <button
                  className="faculty-text-action"
                  onClick={() => {
                    setActiveModule("Students");
                    setActiveSubPage("Attention Required");
                  }}
                >
                  View all →
                </button>

              </div>


              <div className="attention-table-wrapper">

                <table className="faculty-attention-table">

                  <thead>

                    <tr>
                      <th>STUDENT</th>
                      <th>SOURCE</th>
                      <th>REASON</th>
                      <th>PRIORITY</th>
                      <th>UPDATED</th>
                      <th></th>
                    </tr>

                  </thead>


                  <tbody>

                    {filteredAttentionStudents.map((student) => (

                      <tr key={student.studentId}>

                        <td>

                          <div className="faculty-student-cell">

                            <div className="table-avatar">
                              {student.studentName
  ?.split(" ")
  .map(word => word[0])
  .join("")
  .toUpperCase()}
                            </div>

                            <div>

                              <strong>
                                {student.studentName}
                              </strong>

                              <span>
                                {student.reasons?.[0] || "No reason available"}
                              </span>

                            </div>

                          </div>

                        </td>


                        <td>

                          <span
                            className={`source-badge ${
                              student.source === "Academic Signals"
                                ? "academic"
                                : student.source === "Assessment"
                                ? "assessment"
                                : "both"
                            }`}
                          >
                            {student.source}
                          </span>

                        </td>


                        <td>

                          <span
                            className={
                              student.overallStatus === "High Priority"
                                ? "priority-badge high"
                                : "priority-badge attention"
                            }
                          >
                            {student.overallStatus}
                          </span>

                        </td>


                        <td className="updated-cell">
                          {new Date(student.createdAt).toLocaleDateString()}
                        </td>


                        <td>

                          <button
                            className="review-student-button"
                            onClick={() => openStudentReview(student)}
                          >
                            Review →
                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </section>


            {/* =====================================
                LOWER GRID
            ===================================== */}

            <section className="faculty-lower-grid">

              {/* Follow-ups */}

              <article className="faculty-panel followup-panel">

                <div className="faculty-panel-heading compact">

                  <div>

                    <p className="faculty-section-label">
                      TODAY
                    </p>

                    <h2>
                      Upcoming follow-ups
                    </h2>

                  </div>

                  <button
                    className="faculty-text-action"
                    onClick={() => {
                      setActiveModule("Support");
                      setActiveSubPage("Follow-ups");
                    }}
                  >
                    View all →
                  </button>

                </div>


                <div className="followup-summary">

                  <strong>3</strong>

                  <div>
                    <span>sessions today</span>
                    <p>5 scheduled this week</p>
                  </div>

                </div>


                <div className="overview-session-list">

                  {upcomingSessions.map(
                    (session, index) => (

                      <div
                        className="overview-session"
                        key={index}
                      >

                        <div>

                          <strong>
                            {session.student}
                          </strong>

                          <span>
                            {session.type}
                          </span>

                        </div>

                        <span className="session-time">
                          {session.time}
                        </span>

                      </div>

                    )
                  )}

                </div>

              </article>


              {/* Outcomes */}

              <article className="faculty-panel outcome-panel">

                <div className="faculty-panel-heading compact">

                  <div>

                    <p className="faculty-section-label">
                      SUPPORT OUTCOMES
                    </p>

                    <h2>
                      Intervention progress
                    </h2>

                  </div>

                  <button
                    className="faculty-text-action"
                    onClick={() => {
                      setActiveModule("Support");
                      setActiveSubPage("Outcomes");
                    }}
                  >
                    Details →
                  </button>

                </div>


                <div className="outcome-numbers">

                  <div className="outcome-number improving">

                    <strong>5</strong>

                    <span>
                      Improving
                    </span>

                  </div>


                  <div className="outcome-number stable">

                    <strong>2</strong>

                    <span>
                      Stable
                    </span>

                  </div>


                  <div className="outcome-number followup">

                    <strong>1</strong>

                    <span>
                      Needs follow-up
                    </span>

                  </div>

                </div>


                <div className="outcome-note">

                  <span>↑</span>

                  <p>
                    Most active support cases are showing
                    positive progress.
                  </p>

                </div>

              </article>

            </section>


            {/* =====================================
                RECENT ACTIVITY
            ===================================== */}

            <section className="faculty-panel activity-panel">

              <div className="faculty-panel-heading compact">

                <div>

                  <p className="faculty-section-label">
                    RECENT
                  </p>

                  <h2>
                    Faculty activity
                  </h2>

                </div>

              </div>


              <div className="faculty-activity-list">

                {recentActivity.map(
                  (activity, index) => (

                    <div
                      className="faculty-activity-item"
                      key={index}
                    >

                      <div
                        className={`activity-marker ${activity.type}`}
                      >
                        {activity.type === "assessment"
                          ? "!"
                          : activity.type === "session"
                          ? "✓"
                          : "+"}
                      </div>


                      <div className="activity-information">

                        <strong>
                          {activity.title}
                        </strong>

                        <span>
                          {activity.description}
                        </span>

                      </div>


                      <span className="activity-time">
                        {activity.time}
                      </span>

                    </div>

                  )
                )}

              </div>

            </section>

          </div>

        )}


        {/* =====================================
            ALL STUDENTS
        ===================================== */}

        {activeModule === "Students" && activeSubPage === "All Students" && (
          <div className="all-students-page">

            <section className="students-page-heading">
              <div>
                <p className="faculty-eyebrow">STUDENTS</p>
                <h1>All Students</h1>
                <p>
                  View academic, attendance and assessment information
                  for students in your department.
                </p>
              </div>

              <div className="students-count">
                <strong>{allStudents.length}</strong>
                <span>students shown in this prototype</span>
              </div>
            </section>

            <section className="student-directory-panel">

              <div className="student-directory-toolbar">
                <div className="student-search-box">
                  <span className="student-search-icon">⌕</span>
                  <input
                    type="text"
                    placeholder="Search by student name or ID"
                    value={studentSearch}
                    onChange={(event) => setStudentSearch(event.target.value)}
                  />
                </div>

                <div className="student-filter-group">
                  <label className="student-filter">
                    <span>YEAR</span>
                    <select value={yearFilter} onChange={(event) => setYearFilter(event.target.value)}>
                      <option>All Years</option>
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option>4th Year</option>
                    </select>
                  </label>

                  <label className="student-filter">
                    <span>STATUS</span>
                    <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                      <option>All Status</option>
                      <option>Stable</option>
                      <option>Needs Attention</option>
                      <option>High Priority</option>
                      <option>Active Support</option>
                    </select>
                  </label>
                </div>
              </div>

              <div className="directory-results-row">
                <span>Showing {filteredStudents.length} of {allStudents.length} students</span>

                {(studentSearch || yearFilter !== "All Years" || statusFilter !== "All Status") && (
                  <button
                    onClick={() => {
                      setStudentSearch("");
                      setYearFilter("All Years");
                      setStatusFilter("All Status");
                    }}
                  >
                    Clear filters
                  </button>
                )}
              </div>

              <div className="student-directory-table-wrapper">
                <table className="student-directory-table">
                  <thead>
                    <tr>
                      <th>STUDENT</th>
                      <th>YEAR</th>
                      <th>ATTENDANCE</th>
                      <th>ACADEMIC AVG.</th>
                      <th>ASSESSMENT</th>
                      <th>STATUS</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id}>
                        <td>
                          <div className="directory-student-cell">
                            <div className="directory-avatar">{student.name
  ?.split(" ")
  .map(word => word[0])
  .join("")
  .toUpperCase()}</div>
                            <div>
                              <strong>{student.name}</strong>
                              <span>{student.studentId} · {student.department}</span>
                            </div>
                          </div>
                        </td>

                        <td className="directory-muted">{student.year}</td>

                        <td>
                          <div className="metric-cell">
                            <strong>{selectedStudent?.attendance ?? 82}%</strong>
                            <div className="mini-progress">
                             <span
  style={{
    width: `${student.attendance ?? 82}%`,
  }}
></span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="metric-cell">
                         <strong>{student.academicAverage ?? 76}%</strong>
                            <div className="mini-progress academic">
                              <span style={{ width: `${student.academicAverage}%` }}></span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span className={`assessment-status ${
  (student.assessment ?? "Pending") === "Stable"
    ? "stable"
    : (student.assessment ?? "Pending") === "Needs Attention"
    ? "attention"
    : "pending"
}`}  >
                            {student.assessment ?? "Pending"}
                        
                          </span>
                        </td>

                        <td>
                          <span className={`student-status ${
                            (student.status ?? "Stable") === "Stable"
                              ? "stable"
                              : (student.status ?? "Stable") === "High Priority"
                              ? "high"
                              : (student.status ?? "Stable") === "Active Support"
                              ? "support"
                              : "attention"
                          }`}>
                            {(student.status ?? "Stable")}
                          </span>
                        </td>

                        <td>
                          <button className="view-student-button">View →</button>
                        </td>
                      </tr>
                    ))}

                    {filteredStudents.length === 0 && (
                      <tr>
                        <td colSpan="7" className="student-empty-state">
                          No students match the selected filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </section>
          </div>
        )}

        {activeModule === "Students" && activeSubPage === "Attention Required" && !selectedStudent && (
          <div className="attention-required-page">

            <section className="attention-page-heading">
              <div>
                <p className="faculty-eyebrow">STUDENTS · PRIORITY REVIEW</p>
                <h1>Attention Required</h1>
                <p>
                  Review students highlighted by academic patterns,
                  wellbeing assessments, or a combination of both.
                </p>
              </div>

              <div className="attention-page-count">
                <strong>{attentionStudents.length}</strong>
                <span>flagged students in this prototype</span>
              </div>
            </section>


            <section className="attention-summary-grid">

              <article className="attention-summary-card high">
                <span>HIGH PRIORITY</span>
                <strong>{attentionSummary.highPriority}</strong>
                <p>Require timely faculty review</p>
              </article>

              <article className="attention-summary-card needs">
                <span>NEEDS ATTENTION</span>
                <strong>{attentionSummary.needsAttention}</strong>
                <p>Signals should be reviewed</p>
              </article>

              <article className="attention-summary-card active">
                <span>ACTIVE SUPPORT</span>
                <strong>{attentionSummary.activeSupport}</strong>
                <p>Already receiving support</p>
              </article>

            </section>


            <section className="attention-directory-panel">

              <div className="attention-toolbar">

                <div className="attention-search-box">
                  <span className="attention-search-icon">⌕</span>

                  <input
                    type="text"
                    placeholder="Search by student name or ID"
                    value={attentionSearch}
                    onChange={(event) =>
                      setAttentionSearch(event.target.value)
                    }
                  />
                </div>


                <div className="attention-filter-group">

                  <label className="attention-filter">
                    <span>PRIORITY</span>

                    <select
                      value={priorityFilter}
                      onChange={(event) =>
                        setPriorityFilter(event.target.value)
                      }
                    >
                      <option>All Priorities</option>
                      <option>High Priority</option>
                      <option>Needs Attention</option>
                      <option>Active Support</option>
                    </select>
                  </label>


                  <label className="attention-filter">
                    <span>SIGNAL SOURCE</span>

                    <select
                      value={signalFilter}
                      onChange={(event) =>
                        setSignalFilter(event.target.value)
                      }
                    >
                      <option>All Signals</option>
                      <option>Academic Signals</option>
                      <option>Assessment</option>
                      <option>Both Signals</option>
                    </select>
                  </label>

                </div>

              </div>


              <div className="attention-results-row">

                <span>
                  Showing {filteredAttentionStudents.length} of{" "}
                  {attentionStudents.length} flagged students
                </span>

                {(attentionSearch ||
                  priorityFilter !== "All Priorities" ||
                  signalFilter !== "All Signals") && (

                  <button
                    onClick={() => {
                      setAttentionSearch("");
                      setPriorityFilter("All Priorities");
                      setSignalFilter("All Signals");
                    }}
                  >
                    Clear filters
                  </button>

                )}

              </div>


              <div className="attention-review-table-wrapper">

                <table className="attention-review-table">

                  <thead>
                    <tr>
                      <th>STUDENT</th>
                      <th>FLAGGED BY</th>
                      <th>KEY SIGNAL</th>
                      <th>PRIORITY</th>
                      <th>UPDATED</th>
                      <th></th>
                    </tr>
                  </thead>


                  <tbody>

                    {filteredAttentionStudents.map((student) => (

  <tr key={student.studentId}>

    <td>
      <div className="attention-student-cell">

        <div className="attention-avatar">
          {student.studentName
            ?.split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase()}
        </div>

        <div>
          <strong>{student.studentName}</strong>

          <span>
           {student.studentId} · Year {student.year} · {student.department}
          </span>
        </div>

      </div>
    </td>


    <td>
     <span
  className={`source-badge ${
    student.source === "Academic Signals"
      ? "academic"
      : student.source === "Assessment"
      ? "assessment"
      : "both"
  }`}
>
  {student.source}
</span>
    </td>


    <td>
      <div className="attention-reason">
        <span className="reason-dot"></span>

        <span>
         {student.reasons?.length > 0
  ? student.reasons.join(", ")
  : "No concerns"}
        </span>

      </div>
    </td>


    <td>
      <span
        className={`attention-priority-badge ${
        student.overallStatus === "High Priority"
            ? "high"
            : student.overallStatus === "Active Support"
            ? "active"
            : "needs"
        }`}
      >
        {student.overallStatus}
      </span>
    </td>


    <td className="attention-updated">
      {new Date(student.createdAt).toLocaleDateString()}
    </td>


    <td>
      <button
        className="attention-review-button"
        onClick={() => openStudentReview(student)}
      >
        Review →
      </button>
    </td>

  </tr>

))}


                    {filteredAttentionStudents.length === 0 && (

                      <tr>
                        <td
                          colSpan="6"
                          className="attention-empty-state"
                        >
                          No flagged students match the selected filters.
                        </td>
                      </tr>

                    )}

                  </tbody>

                </table>

              </div>

            </section>

          </div>
        )}



        {/* =====================================
            STUDENT REVIEW
        ===================================== */}

        {activeModule === "Students" &&
          activeSubPage === "Attention Required" &&
          selectedStudent && (

          <div className="student-review-page">

            <button
              className="review-back-button"
              onClick={closeStudentReview}
            >
              ← Back to Attention Required
            </button>


            <section className="review-student-header">

              <div className="review-student-identity">

                <div className="review-large-avatar">
                  {selectedStudent?.initials}
                </div>

                <div>
                  <p className="faculty-eyebrow">
                    STUDENT REVIEW
                  </p>

                  <h1>{selectedStudent?.name}</h1>

                  <p>
                    {selectedStudent?.id} · {selectedStudent?.detail}
                  </p>
                </div>

              </div>


              <span
                className={`review-priority ${
                  selectedStudent?.priority === "High Priority"
                    ? "high"
                    : selectedStudent?.priority === "Active Support"
                    ? "active"
                    : "needs"
                }`}
              >
                {selectedStudent?.priority}
              </span>

            </section>


            {reviewNotice && (
              <div className="review-notice">
                {reviewNotice}
              </div>
            )}


            <section className="review-flag-panel">

              <div>
                <p className="faculty-section-label">
                  WHY THIS STUDENT WAS FLAGGED
                </p>

                <h2>{selectedStudent?.reason}</h2>

                <p>
                  These signals are intended to support faculty
                  review. Final support decisions remain with the
                  faculty member.
                </p>
              </div>

              <span
                className={`source-badge ${
                  selectedStudent?.source === "Academic Signals"
                    ? "academic"
                    : selectedStudent?.source === "Assessment"
                    ? "assessment"
                    : "both"
                }`}
              >
                {selectedStudent?.source}
              </span>

            </section>


            <div className="review-insight-grid">

              <section className="review-card">

                <div className="review-card-heading">
                  <div>
                    <p className="faculty-section-label">
                      ACADEMIC SNAPSHOT
                    </p>
                    <h2>Recent academic signals</h2>
                  </div>
                </div>


                <div className="review-metrics">

                  <div className="review-metric">
                    <span>ATTENDANCE</span>
                    <strong>{selectedStudent.attendance ?? 82}%</strong>

                    <div className="review-progress">
                      <span
                        style={{
                          width: `${selectedStudent?.attendance}%`,
                        }}
                      ></span>
                    </div>
                  </div>


                  <div className="review-metric">
                    <span>ACADEMIC AVERAGE</span>
                    <strong>
                      {selectedStudent?.academicAverage}%
                    </strong>

                    <div className="review-progress academic">
                      <span
                        style={{
                          width: `${selectedStudent?.academicAverage ?? 76}%`,
                        }}
                      ></span>
                    </div>
                  </div>

                </div>


                <div className="review-signal-note">
                  <span>↘</span>

                  <div>
                    <strong>Recent signal</strong>
                    <p>{selectedStudent?.reason}</p>
                  </div>
                </div>

              </section>


              <section className="review-card assessment-review-card">

                <div className="review-card-heading">
                  <div>
                    <p className="faculty-section-label">
                      ASSESSMENT INSIGHT
                    </p>
                    <h2>Latest wellbeing check-in</h2>
                  </div>
                </div>


                <div className="assessment-review-status">
                  <span>STATUS</span>

                  <strong>
 {selectedStudent?.assessment?.overall ?? "Pending"}
</strong>

                  <p>
                    Latest assessment information available to
                    faculty for review.
                  </p>
                </div>


             <div className="assessment-review-note">

  <span>◇</span>

  <div>

    <strong>Why this student was flagged</strong>

    <ul className="review-reasons-list">

      {selectedStudent?.reasons?.length > 0 ? (

        selectedStudent.reasons.map((reason, index) => (

          <li key={index}>
            {reason}
          </li>

        ))

      ) : (

        <li>No major concerns detected.</li>

      )}

    </ul>

  </div>

</div>

              </section>

            </div>


            <section className="review-card support-history-card">

              <div className="review-card-heading">
                <div>
                  <p className="faculty-section-label">
                    SUPPORT HISTORY
                  </p>

                  <h2>Previous support activity</h2>
                </div>
              </div>


              {selectedStudent?.priority === "Active Support" ? (

                <div className="support-history-item">
                  <div className="support-history-marker">✓</div>

                  <div>
                    <strong>Faculty support session</strong>
                    <p>
                      Student currently has an active support
                      intervention and follow-up.
                    </p>
                  </div>

                  <span>Active</span>
                </div>

              ) : (

                <div className="review-empty-history">
                  <span>◇</span>

                  <div>
                    <strong>No previous intervention recorded</strong>
                    <p>
                      If support is required, create an intervention
                      after completing your review.
                    </p>
                  </div>
                </div>

              )}

            </section>


            <section className="review-card faculty-notes-card">

              <div className="review-card-heading">
                <div>
                  <p className="faculty-section-label">
                    FACULTY NOTES
                  </p>

                  <h2>Review observations</h2>
                </div>

                <span className="notes-private-label">
                  Faculty workspace
                </span>
              </div>


              <textarea
                value={facultyNote}
                onChange={(event) =>
                  setFacultyNote(event.target.value)
                }
                placeholder="Add observations from your review..."
                rows="4"
              ></textarea>


              <div className="faculty-note-actions">

                <button
                  className="review-secondary-button"
                  onClick={saveFacultyNote}
                >
                  Add Note
                </button>

              </div>


              {savedNotes
                .filter(
                  (note) =>
                    note.studentId === selectedStudent?.id
                )
                .map((note) => (

                  <div
                    className="saved-faculty-note"
                    key={note.id}
                  >
                    <p>{note.text}</p>
                    <span>{note.createdAt}</span>
                  </div>

                ))}

            </section>


            <section className="review-actions-panel">

              <div>
                <p className="faculty-section-label">
                  FACULTY ACTION
                </p>

                <h2>Decide the next support step.</h2>

                <p>
                  Review the available signals before creating or
                  updating student support.
                </p>
              </div>


              <div className="review-action-buttons">

                <button
                  className="review-secondary-button"
                  onClick={scheduleFollowUp}
                >
                  Schedule Follow-up
                </button>

                <button
                  className="review-secondary-button"
                  onClick={markReviewed}
                >
                  Mark as Reviewed
                </button>

                <button
                  className="create-intervention-button"
                  onClick={openInterventionModal}
                >
                  Create Intervention →
                </button>

              </div>

            </section>


            {showInterventionModal && (

              <div
                className="intervention-modal-backdrop"
                onClick={() =>
                  setShowInterventionModal(false)
                }
              >

                <div
                  className="intervention-modal"
                  onClick={(event) =>
                    event.stopPropagation()
                  }
                >

                  <div className="intervention-modal-heading">

                    <div>
                      <p className="faculty-eyebrow">
                        CREATE INTERVENTION
                      </p>

                      <h2>
                        Support update for{" "}
                        {selectedStudent?.name}
                      </h2>

                      <p>
                        {selectedStudent?.id} · This update can be
                        shown on the student's dashboard and sent
                        to their registered college email.
                      </p>
                    </div>


                    <button
                      className="intervention-close"
                      type="button"
                      onClick={() =>
                        setShowInterventionModal(false)
                      }
                    >
                      ×
                    </button>

                  </div>


                  <form
                    className="intervention-form"
                    onSubmit={createIntervention}
                  >

                    <label>
                      <span>INTERVENTION TYPE</span>

                      <select
                        value={interventionType}
                        onChange={(event) =>
                          setInterventionType(
                            event.target.value
                          )
                        }
                      >
                        <option>Academic Support</option>
                        <option>Faculty Mentoring</option>
                        <option>Wellbeing Check-in</option>
                        <option>Attendance Support</option>
                        <option>Other Support</option>
                      </select>
                    </label>


                    <label>
                      <span>MESSAGE TO STUDENT</span>

                      <textarea
                        rows="4"
                        value={interventionMessage}
                        onChange={(event) =>
                          setInterventionMessage(
                            event.target.value
                          )
                        }
                        placeholder="Write the support message the student will see..."
                      ></textarea>
                    </label>


                    <div className="intervention-form-row">

                      <label>
                        <span>RECOMMENDED ACTION</span>

                        <input
                          type="text"
                          value={recommendedAction}
                          onChange={(event) =>
                            setRecommendedAction(
                              event.target.value
                            )
                          }
                          placeholder="e.g. Meet faculty mentor"
                        />
                      </label>


                      <label>
                        <span>FOLLOW-UP DATE</span>

                        <input
                          type="date"
                          value={followUpDate}
                          onChange={(event) =>
                            setFollowUpDate(
                              event.target.value
                            )
                          }
                        />
                      </label>

                    </div>


                    <div className="intervention-delivery-options">

                      <label>
                        <input
                          type="checkbox"
                          checked={showOnDashboard}
                          onChange={(event) =>
                            setShowOnDashboard(
                              event.target.checked
                            )
                          }
                        />

                        <span>
                          <strong>
                            Show on Student Dashboard
                          </strong>

                          <small>
                            Display this message under My Support.
                          </small>
                        </span>
                      </label>


                      <label>
                        <input
                          type="checkbox"
                          checked={sendEmail}
                          onChange={(event) =>
                            setSendEmail(
                              event.target.checked
                            )
                          }
                        />

                        <span>
                          <strong>
                            Send to college email
                          </strong>

                          <small>
                            Backend will use the student's
                            registered college email.
                          </small>
                        </span>
                      </label>

                    </div>


                    <div className="intervention-modal-actions">

                      <button
                        type="button"
                        className="review-secondary-button"
                        onClick={() =>
                          setShowInterventionModal(false)
                        }
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="create-intervention-button"
                      >
                        Create Intervention
                      </button>

                    </div>

                  </form>

                </div>

              </div>

            )}

          </div>

        )}


        {/* =====================================
            SUPPORT MODULES
        ===================================== */}

        {activeModule === "Support" && (
          <div className="support-module-page">

            <section className="support-page-heading">
              <div>
                <p className="faculty-eyebrow">
                  {activeSubPage === "Interventions" ? "SUPPORT · CASE MANAGEMENT" :
                   activeSubPage === "Follow-ups" ? "SUPPORT · NEXT ACTIONS" :
                   "SUPPORT · PROGRESS REVIEW"}
                </p>
                <h1>{activeSubPage}</h1>
                <p>
                  {activeSubPage === "Interventions"
                    ? "Manage support plans created after faculty review and track the next action for each student."
                    : activeSubPage === "Follow-ups"
                    ? "Keep scheduled student check-ins visible and record what changed after support began."
                    : "Review student progress after support and identify cases that may need continued intervention."}
                </p>
              </div>

              <div className="support-heading-count">
                <strong>
  {activeSubPage === "Interventions"
    ? interventions.filter(i => i.status === "Pending").length
    : activeSubPage === "Follow-ups"
    ? filteredFollowUps.length
    : feedbacks.length}
</strong>
                <span>
                  {activeSubPage === "Interventions" ? "active support plans" :
                   activeSubPage === "Follow-ups" ? "upcoming follow-ups" :
                   "recorded outcomes"}
                </span>
              </div>
            </section>

            {activeSubPage === "Interventions" && (
              <>
                <section className="support-summary-grid">
                  <article className="support-summary-card plum">
                    <span>ONGOING CASES</span>
                    <strong>{interventions.filter(i => i.status === "Pending").length}</strong>
                    <p>Students currently receiving support</p>
                  </article>
                  <article className="support-summary-card peach">
                    <span>SESSIONS CONDUCTED</span>
                    <strong>{interventions.length}</strong>
                    <p>Total support sessions recorded</p>
                  </article>
                  <article className="support-summary-card sage">
                    <span>COMPLETED CASES</span>
                    <strong>{interventions.filter(i => i.status === "Completed").length}</strong>
                    <p>Support cases successfully closed</p>
                  </article>
                </section>

                <section className="support-workspace">
                  <div className="support-toolbar">
                    <div className="support-search">
                      <span>⌕</span>
                      <input
                        value={supportSearch}
                        onChange={e => setSupportSearch(e.target.value)}
                        placeholder="Search by student name or ID"
                      />
                    </div>

                    <label className="support-filter">
                      <span>CURRENT STATE</span>
                      <select
                        value={supportStatusFilter}
                        onChange={e => setSupportStatusFilter(e.target.value)}
                      >
                        <option>All Status</option>
                        <option>Pending</option>
                        <option>Completed</option>
                      </select>
                    </label>
                  </div>

                  <div className="support-results">
                    <span>Showing {filteredInterventions.length} intervention cases</span>
                    <button
                      onClick={() => {
                        setSupportSearch("");
                        setSupportStatusFilter("All Status");
                      }}
                    >
                      Clear filters
                    </button>
                  </div>

                  <div className="support-table-wrapper">
                    <table className="support-table intervention-session-table">
                      <thead>
                        <tr>
                          <th>STUDENT</th>
                          <th>INTERVENTION</th>
                          <th>SESSIONS</th>
                          <th>LAST SESSION</th>
                          <th>CURRENT STATE</th>
                          <th></th>
                        </tr>
                      </thead>

                      <tbody>
                        {filteredInterventions.map((intervention) => (
                          <tr key={intervention._id}>
                            <td>
                              <div className="support-student">
                                <div className="support-avatar">{intervention.initials}</div>
                                <div>
                                  <strong>{intervention.studentName}</strong>
                                  <span>{intervention.studentId} · {intervention.id}</span>
                                </div>
                              </div>
                            </td>

                            <td>
                              <span className="intervention-type">{intervention.interventionType}</span>
                            </td>

                            <td>
                              <div className="session-count">
                                <strong>1</strong>
                                <span>{intervention.sessions === 1 ? "session" : "sessions"}</span>
                              </div>
                            </td>

                            <td className="support-muted">{new Date(intervention.createdAt).toLocaleDateString()}</td>

                            <td>
                              <span
                                className={`support-status ${
                                  intervention.status === "Completed" ? "completed" : "active"
                                }`}
                              >
                                {intervention.status}
                              </span>
                            </td>

                            <td>
                              <button
                                className="support-open-button"
                                onClick={() => setSelectedInterventionCase(intervention)}
                              >
                                Open Case →
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>


                </section>
              </>
            )}

         {activeSubPage === "Follow-ups" && (
  <>
    <section className="followup-focus-strip">
      <div>
        <span className="focus-kicker">NEXT FOLLOW-UP</span>

        {interventions.length > 0 ? (
          <>
            <strong>
              {interventions[0].studentName} ·{" "}
              {new Date(interventions[0].followUpDate).toLocaleDateString()}
            </strong>

            <p>
              {interventions[0].interventionType} ·{" "}
              {interventions[0].message}
            </p>
          </>
        ) : (
          <>
            <strong>No Follow-ups</strong>
            <p>No interventions available.</p>
          </>
        )}
      </div>

      <span className="focus-status">
        {interventions.length > 0
          ? interventions[0].status
          : "Pending"}
      </span>
    </section>

    <section className="support-workspace">

      <div className="support-toolbar">

        <div className="support-search">
          <span>⌕</span>

          <input
            value={supportSearch}
            onChange={e => setSupportSearch(e.target.value)}
            placeholder="Search scheduled follow-ups"
          />

        </div>

        <label className="support-filter">

          <span>STATUS</span>

          <select
            value={supportStatusFilter}
            onChange={e => setSupportStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>

        </label>

      </div>

      <div className="support-results">

        <span>
          Showing {filteredFollowUps.length} follow-up records
        </span>

        <button
          onClick={() => {
            setSupportSearch("");
            setSupportStatusFilter("All Status");
          }}
        >
          Clear filters
        </button>

      </div>

      <div className="followup-list">

        {filteredFollowUps.map(item => (

          <article
            className="followup-item"
            key={item._id}
          >

            <div className="followup-date-block">

              <span>FOLLOW-UP</span>

              <strong>
                {new Date(item.followUpDate).getDate()}
              </strong>

              <small>
                {new Date(item.followUpDate).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    year: "numeric",
                  }
                )}
              </small>

            </div>

            <div className="support-student">

              <div className="support-avatar">

                {item.studentName
                  ?.split(" ")
                  .map(word => word[0])
                  .join("")
                  .toUpperCase()}

              </div>

              <div>

                <strong>{item.studentName}</strong>
                

                <span>
                  {item.studentId} · {item.interventionType}
                </span>

              </div>

            </div>

            <div className="followup-note">

              <span>LAST NOTE</span>

              <p>{item.message}</p>

            </div>

            <span
              className={`support-status ${
                item.status === "Completed"
                  ? "completed"
                  : item.status === "Pending"
                  ? "due"
                  : "active"
              }`}
            >
              {item.status}
            </span>

            <button className="followup-action-button">
              {item.status === "Completed"
                ? "View →"
                : "Complete Follow-up →"}
            </button>

          </article>

        ))}

      </div>

    </section>
  </>
)}  
{activeSubPage === "Outcomes" && (
              <>
               <section className="outcome-summary">

  <div>
    <span>TOTAL FEEDBACK</span>
    <strong>{feedbacks.length}</strong>
  </div>

  <div>
    <span>NEEDS ANOTHER SESSION</span>
    <strong>
      {
        feedbacks.filter(
          item => item.needsAnotherSession === "Yes"
        ).length
      }
    </strong>
  </div>

  <div>
    <span>NO FURTHER SESSION</span>
    <strong>
      {
        feedbacks.filter(
          item => item.needsAnotherSession === "No"
        ).length
      }
    </strong>
  </div>

</section>

                <section className="support-workspace">
                  <div className="support-toolbar">
                    <div className="support-search"><span>⌕</span><input value={supportSearch} onChange={e => setSupportSearch(e.target.value)} placeholder="Search outcome records" /></div>
                    <label className="support-filter"><span>OUTCOME</span><select value={supportStatusFilter} onChange={e => setSupportStatusFilter(e.target.value)}><option>All Status</option><option>Yes</option>
<option>No</option></select></label>
                  </div>
                  <div className="support-results"><span>Showing {filteredOutcomes.length} outcome records</span><button onClick={() => {setSupportSearch(""); setSupportStatusFilter("All Status");}}>Clear filters</button></div>
                  <div className="outcome-cards">
                    {filteredOutcomes.map((item) => (

  <article
    className="outcome-card"
    key={item._id}
  >

    <div className="outcome-card-top">

      <div className="support-student">

        <div className="support-avatar">

          {item.studentName
            ?.split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase()}

        </div>

        <div>

          <strong>{item.studentName}</strong>

          <span>
            {item.studentId}
          </span>

        </div>

      </div>

      <span
        className={`outcome-badge ${
          item.needsAnotherSession === "Yes"
            ? "monitoring"
            : "improved"
        }`}
      >
        {item.needsAnotherSession === "Yes"
          ? "Needs Another Session"
          : "Completed"}
      </span>

    </div>

    <div className="outcome-change">

      <div>

        <span>RATING</span>

        <strong>{item.rating}</strong>

      </div>

      <span className="outcome-arrow">→</span>

      <div>

        <span>STUDENT COMMENT</span>

        <strong>{item.comment}</strong>

      </div>

    </div>

    <div className="outcome-card-footer">

      <span>
        Reviewed{" "}
        {new Date(item.createdAt).toLocaleDateString()}
      </span>

      <button>
        View Outcome →
      </button>

    </div>

  </article>

))}
  </div>
                </section>
              </>
            )}

        {selectedInterventionCase && (
            <div
              className="case-modal-backdrop"
              onClick={() => setSelectedInterventionCase(null)}
            >
              <section
                className="case-modal"
                onClick={e => e.stopPropagation()}
                aria-modal="true"
                role="dialog"
              >
                <header className="case-modal-header">
                  <div>
                    <p className="case-modal-eyebrow">
  INTERVENTION CASE
</p>

<h2>{selectedInterventionCase.studentName}</h2>

<p>
  {selectedInterventionCase.studentId} · {selectedInterventionCase.interventionType}
</p>
                  </div>

                  <button
                    className="case-close-button"
                    onClick={() => setSelectedInterventionCase(null)}
                    aria-label="Close case history"
                  >
                    ×
                  </button>
                </header>

                <div className="case-overview-grid">

  <div>
    <span>CASE STATE</span>
    <strong>{selectedInterventionCase.status}</strong>
  </div>

  <div>
    <span>FACULTY</span>
    <strong>
      {selectedInterventionCase.facultyId || "FAC101"}
    </strong>
  </div>

  <div>
    <span>FOLLOW-UP</span>
    <strong>
      {new Date(
        selectedInterventionCase.followUpDate
      ).toLocaleDateString()}
    </strong>
  </div>

  <div>
    <span>CREATED</span>
    <strong>
      {new Date(
        selectedInterventionCase.createdAt
      ).toLocaleDateString()}
    </strong>
  </div>

</div>

                <div className="case-goal">

  <span>MESSAGE TO STUDENT</span>

  <p>
    {selectedInterventionCase.message}
  </p>

</div>

                <div className="case-history-heading">
                  <div>
                    <span>SESSION HISTORY</span>
                    <h3>Recorded support sessions</h3>
                  </div>
                  <small>
  1 Record
</small>
                </div>

                <div className="case-timeline">
                 <article className="case-session">

  <div className="case-timeline-marker">
    <span>1</span>
  </div>

  <div className="case-session-content">

    <div className="case-session-top">

      <div>

        <span>
          {new Date(
            selectedInterventionCase.createdAt
          ).toLocaleDateString()}
        </span>

        <h4>
          {selectedInterventionCase.interventionType}
        </h4>

      </div>

      <small>
        Faculty {selectedInterventionCase.facultyId || "FAC101"}
      </small>

    </div>

    <p>
      {selectedInterventionCase.message}
    </p>

    <strong>
      Recommended Action:
    </strong>

    <p>
      {selectedInterventionCase.recommendedAction}
    </p>

  </div>

</article>
                </div>

                <footer className="case-modal-footer">
                  <p>
                    Future required check-ins are managed separately under
                    <strong> Follow-ups</strong>.
                  </p>
                  <button onClick={() => setSelectedInterventionCase(null)}>
                    Close Case View
                  </button>
                </footer>
              </section>
            </div>
          )}

          </div>
        )}

      </main>

    </div>
  );
}

export default FacultyDashboard;