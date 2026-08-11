import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FacultyLogin.css";
import axios from "axios";

function FacultyLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
  event.preventDefault();

  if (!email || !password) {
    setError("Please enter your faculty email and password.");
    return;
  }

  try {
    const response = await axios.post(
     "https://eduguardian-backend.onrender.com/api/faculty/login",
      {
        email,
        password,
      }
    );

    // Save logged-in faculty
    localStorage.setItem(
      "faculty",
      JSON.stringify(response.data.faculty)
    );

    setError("");

    navigate("/faculty-dashboard");

  } catch (error) {

    if (error.response) {
      setError(error.response.data.message);
    } else {
      setError("Unable to connect to server.");
    }

  }
};

  return (
    <div className="faculty-login-page">

      {/* Header */}
      <header className="faculty-login-header">

        <button
          className="faculty-brand"
          onClick={() => navigate("/")}
        >
          <span className="faculty-brand-mark">E</span>
          <span>EduGuardian</span>
        </button>

        <button
          className="faculty-back-home"
          onClick={() => navigate("/")}
        >
          ← Back to home
        </button>

      </header>


      {/* Main Login Area */}
      <main className="faculty-login-main">

        <section className="faculty-login-container">

          <div className="faculty-portal-label">
            <span></span>
            FACULTY PORTAL
            <span></span>
          </div>

          <h1>Welcome back.</h1>

          <p className="faculty-login-subtitle">
            Access your mentoring and student support workspace.
          </p>


          <form
            className="faculty-login-form"
            onSubmit={handleSubmit}
          >

            {/* Email */}
            <div className="faculty-form-group">

              <label htmlFor="faculty-email">
                Faculty Email
              </label>

              <input
                id="faculty-email"
                type="email"
                placeholder="faculty@college.edu"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />

            </div>


            {/* Password */}
            <div className="faculty-form-group">

              <div className="faculty-password-label">

                <label htmlFor="faculty-password">
                  Password
                </label>

                <a href="#">
                  Forgot password?
                </a>

              </div>


              <div className="faculty-password-field">

                <input
                  id="faculty-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                />

                <button
                  type="button"
                  className="faculty-password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>


            {/* Keep Signed In */}
            <label className="faculty-remember-row">

              <input type="checkbox" />

              <span>
                Keep me signed in
              </span>

            </label>


            {/* Error */}
            {error && (
              <p className="faculty-login-error">
                {error}
              </p>
            )}


            {/* Login Button */}
            <button
              type="submit"
              className="faculty-signin-button"
            >
              <span>Access Dashboard</span>
              <span>→</span>
            </button>

          </form>


          {/* Small information note */}
          <div className="faculty-login-note">

            <span>◇</span>

            <p>
              Faculty access is intended for authorized
              AI&DS department mentors and student support staff.
            </p>

          </div>

        </section>

      </main>


      <footer className="faculty-login-footer">
        EduGuardian · AI&DS Department
      </footer>

    </div>
  );
}

export default FacultyLogin;