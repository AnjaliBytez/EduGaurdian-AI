import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/StudentLogin.css";
import axios from "axios";

function StudentLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

 const handleSubmit = async (event) => {
  event.preventDefault();

  if (!email || !password) {
    setError("Please enter your email and password.");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:5000/api/students/login",
      {
        email,
        password,
      }
    );

    // Save logged-in student
    localStorage.setItem(
      "student",
      JSON.stringify(response.data.student)
    );

    setError("");

    navigate("/student-dashboard");

  } catch (error) {
    if (error.response) {
      setError(error.response.data.message);
    } else {
      setError("Unable to connect to server.");
    }
  }
};

  return (
    <div className="student-login-page">

      {/* Top Navigation */}
      <header className="login-header">

        <button
          className="login-brand"
          onClick={() => navigate("/")}
        >
          <span className="login-brand-mark">E</span>
          <span>EduGuardian</span>
        </button>

        <button
          className="back-home"
          onClick={() => navigate("/")}
        >
          ← Back to home
        </button>

      </header>


      {/* Login Content */}
      <main className="login-main">

        <section className="login-container">

          <div className="portal-label">
            <span></span>
            STUDENT PORTAL
            <span></span>
          </div>


          <h1>
            Welcome back.
          </h1>

          <p className="login-subtitle">
            Sign in to continue to your student space.
          </p>


          <form
            className="login-form"
            onSubmit={handleSubmit}
          >

            {/* Email */}

            <div className="form-group">

              <label htmlFor="student-email">
                University Email
              </label>

              <input
                id="student-email"
                type="email"
                placeholder="student@college.edu"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />

            </div>


            {/* Password */}

            <div className="form-group">

              <div className="password-label">

                <label htmlFor="student-password">
                  Password
                </label>

                <a href="#">
                  Forgot password?
                </a>

              </div>


              <div className="password-field">

                <input
                  id="student-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>


            {/* Remember Me */}

            <label className="remember-row">

              <input type="checkbox" />

              <span>
                Keep me signed in
              </span>

            </label>


            {/* Error */}

            {error && (
              <p className="login-error">
                {error}
              </p>
            )}


            {/* Submit */}

            <button
              type="submit"
              className="student-signin-button"
            >
              <span>Sign in</span>
              <span>→</span>
            </button>

          </form>


          <div className="login-security">

            <span className="security-icon">
              ◇
            </span>

            <p>
              Your student information is handled securely
              and used only to provide academic and support insights.
            </p>

          </div>

        </section>

      </main>


      <footer className="login-footer">
        <p>EduGuardian · Student Support Platform</p>
      </footer>

    </div>
  );
}

export default StudentLogin;