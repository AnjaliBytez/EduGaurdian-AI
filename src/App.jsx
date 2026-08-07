import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import StudentLogin from "./pages/StudentLogin";
import FacultyLogin from "./pages/FacultyLogin";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route
        path="/student-login"
        element={<StudentLogin />}
      />

      <Route
  path="/faculty-login"
  element={<FacultyLogin />}
/>

<Route
  path="/student-dashboard"
  element={<StudentDashboard />}
/>

<Route
  path="/faculty-dashboard"
  element={<FacultyDashboard />}
/>

    </Routes>
  );
}

export default App;