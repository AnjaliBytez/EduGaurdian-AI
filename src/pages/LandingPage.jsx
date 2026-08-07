import "../styles/LandingPage.css";
import { Link } from "react-router-dom";
function LandingPage() {
  return (
    <div className="landing-page">

      {/* Navigation */}
      <nav className="navbar">
        <a href="#" className="brand">
          <span className="brand-mark">E</span>
          <span>EduGuardian</span>
        </a>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#approach">How it works</a>
        </div>

        <div className="nav-actions">
          <Link to="/faculty-login" className="faculty-link">
  Faculty Login
</Link>

     <Link to="/student-login" className="student-login">
  Student Login
  <span>→</span>
</Link>
        </div>
      </nav>


      {/* Hero */}
      <main>
        <section className="hero">

          <div className="hero-label">
            Student success, understood earlier
          </div>

          <h1>
            Notice the signs.
            <span> Support at the right time.</span>
          </h1>

          <p className="hero-description">
            EduGuardian brings academic insights, student wellbeing and
            faculty support together to help institutions respond before
            challenges grow.
          </p>

          <div className="hero-actions">
            <a href="#" className="primary-button">
              Enter Platform
              <span>→</span>
            </a>

            <a href="#about" className="text-button">
              Discover EduGuardian
            </a>
          </div>

          <div className="hero-note">
            Designed for thoughtful, proactive student support.
          </div>

        </section>


        {/* About */}
        <section className="about-section" id="about">

          <p className="section-label">THE IDEA</p>

          <h2>
            Support shouldn't begin only when a student asks for it.
          </h2>

          <p className="section-description">
            EduGuardian helps understand students through both academic
            patterns and voluntary wellbeing assessments, creating an
            opportunity for timely and meaningful faculty guidance.
          </p>

        </section>


        {/* Features */}
        <section className="features-section" id="features">

          <div className="section-heading">
            <p className="section-label">WHAT IT BRINGS TOGETHER</p>

            <h2>
              One platform. A clearer view of student progress.
            </h2>
          </div>

          <div className="feature-list">

            <article className="feature-item">
              <span className="feature-number">01</span>

              <div>
                <h3>Academic Signals</h3>
                <p>
                  Understand attendance, performance and engagement patterns
                  without overwhelming students or faculty with data.
                </p>
              </div>
            </article>

            <article className="feature-item">
              <span className="feature-number">02</span>

              <div>
                <h3>Wellbeing Check-ins</h3>
                <p>
                  Give students a simple space to reflect on stress, study
                  habits, sleep and their overall wellbeing.
                </p>
              </div>
            </article>

            <article className="feature-item">
              <span className="feature-number">03</span>

              <div>
                <h3>Early Risk Insights</h3>
                <p>
                  Bring multiple signals together to identify students who
                  may benefit from additional support.
                </p>
              </div>
            </article>

            <article className="feature-item">
              <span className="feature-number">04</span>

              <div>
                <h3>Faculty Guidance</h3>
                <p>
                  Connect students requiring attention with faculty mentors
                  and follow their progress over time.
                </p>
              </div>
            </article>

          </div>

        </section>


        {/* Approach */}
        <section className="approach-section" id="approach">

          <p className="section-label light-label">A THOUGHTFUL APPROACH</p>

          <h2>
            From understanding
            <span> to meaningful support.</span>
          </h2>

          <div className="process">

            <div className="process-step">
              <span>01</span>
              <h3>Observe</h3>
              <p>
                Academic and wellbeing signals create a broader understanding.
              </p>
            </div>

            <div className="process-line"></div>

            <div className="process-step">
              <span>02</span>
              <h3>Understand</h3>
              <p>
                Intelligent analysis highlights students who may need attention.
              </p>
            </div>

            <div className="process-line"></div>

            <div className="process-step">
              <span>03</span>
              <h3>Support</h3>
              <p>
                Faculty guidance and follow-ups help students move forward.
              </p>
            </div>

          </div>

        </section>


        {/* CTA */}
        <section className="cta-section">

          <p className="section-label">BETTER SUPPORT STARTS EARLIER</p>

          <h2>
            Create space for every student to move forward.
          </h2>

          <a href="#" className="primary-button">
            Explore the Platform
            <span>→</span>
          </a>

        </section>

      </main>


      {/* Footer */}
      <footer className="footer">

        <div className="footer-brand">
          <span className="brand-mark footer-mark">E</span>

          <div>
            <strong>EduGuardian</strong>
            <p>Adaptive Student Monitoring & Intervention</p>
          </div>
        </div>

        <p className="copyright">
          © 2026 EduGuardian
        </p>

      </footer>

    </div>
  );
}

export default LandingPage;