import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import {
  IconBriefcase,
  IconPlus,
  IconSearch,
  IconCode,
  IconDeviceDesktop,
  IconTrash,
  IconClock,
  IconHome,
  IconMail,
  IconList,
  IconSparkles,
  IconFileText,
  IconUpload,
  IconCheck,
  IconAlertTriangle,
  IconBulb,
} from "@tabler/icons-react";
import "./App.css";

function App() {
  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [newJob, setNewJob] = useState({
    postId: "",
    postProfile: "",
    postDesc: "",
    reqExperience: "",
    postTechStack: "",
  });

  // ✨ Resume Reviewer States
  const [resumeFile, setResumeFile] = useState(null);
  const [reviewProfile, setReviewProfile] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewResult, setReviewResult] = useState(null);
  const [reviewError, setReviewError] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    fetch(`http://localhost:8080/api/jobs?t=${new Date().getTime()}`)
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Error fetching jobs:", err));
  };

  const searchJobs = () => {
    if (keyword.trim() === "") {
      fetchJobs();
      return;
    }
    fetch(`http://localhost:8080/api/jobs/search?keyword=${keyword}`)
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Error searching jobs:", err));
  };

  const deleteJob = (id) => {
    fetch(`http://localhost:8080/api/jobs/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          fetchJobs();
        } else {
          console.error("Server returned an error on deletion");
        }
      })
      .catch((err) => console.error("Error deleting job:", err));
  };

  // ✨ AI: Generate Job Description
  const generateJD = () => {
    if (!newJob.postProfile.trim()) {
      alert("Please enter a Job Profile first!");
      return;
    }
    setIsGenerating(true);
    fetch(
      `http://localhost:8080/api/ai/generate-jd?profile=${encodeURIComponent(
        newJob.postProfile,
      )}`,
    )
      .then((res) => res.text())
      .then((data) => {
        setNewJob({ ...newJob, postDesc: data });
        setIsGenerating(false);
      })
      .catch((err) => {
        console.error("Error generating JD:", err);
        setIsGenerating(false);
      });
  };

  // ✨ AI: Review Resume
  const reviewResume = () => {
    if (!resumeFile) {
      alert("Please upload a PDF resume first!");
      return;
    }
    if (!reviewProfile.trim()) {
      alert("Please enter a Job Profile!");
      return;
    }

    setIsReviewing(true);
    setReviewResult(null);
    setReviewError("");

    const formData = new FormData();
    formData.append("file", resumeFile);
    formData.append("jobProfile", reviewProfile);

    fetch("http://localhost:8080/api/ai/review-resume", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.text())
      .then((data) => {
        try {
          // Strip markdown code fences if present
          const clean = data.replace(/```json|```/g, "").trim();
          const parsed = JSON.parse(clean);
          setReviewResult(parsed);
        } catch (e) {
          setReviewError("Could not parse AI response. Please try again.");
        }
        setIsReviewing(false);
      })
      .catch((err) => {
        console.error("Error reviewing resume:", err);
        setReviewError("Something went wrong. Please try again.");
        setIsReviewing(false);
      });
  };

  // Score color helper
  const getScoreColor = (score) => {
    if (score >= 75) return "#34d399";
    if (score >= 50) return "#fbbf24";
    return "#f87171";
  };

  const addJob = (e) => {
    e.preventDefault();

    if (parseInt(newJob.postId) <= 0 || isNaN(parseInt(newJob.postId))) {
      alert("Invalid Post ID! Please enter a number greater than 0.");
      return;
    }

    const jobToAdd = {
      ...newJob,
      postId: parseInt(newJob.postId),
      reqExperience: parseInt(newJob.reqExperience),
      postTechStack: newJob.postTechStack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    fetch("http://localhost:8080/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobToAdd),
    })
      .then(() => {
        fetchJobs();
        setNewJob({
          postId: "",
          postProfile: "",
          postDesc: "",
          reqExperience: "",
          postTechStack: "",
        });
        alert("Job posted successfully!");
      })
      .catch((err) => console.error("Error adding job:", err));
  };

  return (
    <Router>
      <div className="app">
        {/* Navigation Bar */}
        <div className="navbar">
          <Link to="/" className="logo">
            <IconBriefcase size={20} stroke={1.5} color="#a78bfa" />
            Job Portal
          </Link>
          <div className="nav-links">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <IconHome size={16} /> Home
            </NavLink>
            <NavLink
              to="/all-jobs"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <IconList size={16} /> All Jobs
            </NavLink>
            <NavLink
              to="/add-job"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <IconPlus size={16} /> Add Job
            </NavLink>
            {/* ✨ NEW: Resume Reviewer Nav Link */}
            <NavLink
              to="/review-resume"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <IconFileText size={16} /> Resume Review
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <IconMail size={16} /> Contact
            </NavLink>
          </div>
        </div>

        {/* Page Routes */}
        <Routes>
          {/* HOME PAGE */}
          <Route
            path="/"
            element={
              <div className="hero-section">
                <h1>Find Your Next Role</h1>
                <p>
                  Explore opportunities or post new openings in our sleek,
                  localized developer hub.
                </p>
                <div className="home-stats">
                  <div className="stat-card">
                    <h3>{jobs.length}</h3>
                    <p>Active Postings</p>
                  </div>
                </div>
                <Link
                  to="/all-jobs"
                  className="btn-add"
                  style={{
                    textDecoration: "none",
                    display: "inline-flex",
                    marginTop: "1.5rem",
                  }}
                >
                  Browse All Jobs
                </Link>
              </div>
            }
          />

          {/* ALL JOBS PAGE */}
          <Route
            path="/all-jobs"
            element={
              <>
                <div className="search-row">
                  <input
                    className="search-input"
                    type="text"
                    placeholder="Search by profile..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && searchJobs()}
                  />
                  <button className="btn-search" onClick={searchJobs}>
                    <IconSearch size={16} stroke={2} /> Search
                  </button>
                  <button
                    className="btn-all"
                    onClick={() => {
                      setKeyword("");
                      fetchJobs();
                    }}
                  >
                    Show all
                  </button>
                </div>

                <div className="jobs-header">
                  <p className="section-title" style={{ margin: 0 }}>
                    All jobs
                  </p>
                  <span className="jobs-count">{jobs.length} results</span>
                </div>

                {jobs.length === 0 ? (
                  <p
                    style={{
                      color: "#6b6b80",
                      fontSize: "14px",
                      textAlign: "center",
                      marginTop: "20px",
                    }}
                  >
                    No jobs found.
                  </p>
                ) : (
                  jobs.map((job) => (
                    <div className="job-card" key={job.postId}>
                      <div className="job-left">
                        <div className="job-profile">
                          {job.postProfile
                            ?.toLowerCase()
                            .includes("frontend") ? (
                            <IconDeviceDesktop
                              size={18}
                              stroke={1.5}
                              color="#7c3aed"
                            />
                          ) : (
                            <IconCode size={18} stroke={1.5} color="#7c3aed" />
                          )}
                          {job.postProfile}
                        </div>
                        <div className="job-desc">{job.postDesc}</div>
                        <div className="job-meta">
                          <span className="meta-item">
                            <IconClock size={14} stroke={1.5} />{" "}
                            {job.reqExperience} years exp
                          </span>
                        </div>
                        <div className="tech-tags">
                          {Array.isArray(job.postTechStack) &&
                            job.postTechStack.map((tech, idx) => (
                              <span className="tech-tag" key={idx}>
                                {tech}
                              </span>
                            ))}
                        </div>
                      </div>
                      <button
                        className="btn-delete"
                        onClick={() => deleteJob(job.postId)}
                      >
                        <IconTrash size={14} stroke={1.5} /> Delete
                      </button>
                    </div>
                  ))
                )}
              </>
            }
          />

          {/* ADD JOB PAGE */}
          <Route
            path="/add-job"
            element={
              <>
                <p className="section-title">Post a new job</p>
                <form onSubmit={addJob} className="form-card">
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Post ID</label>
                      <input
                        type="text"
                        placeholder="e.g. 101"
                        value={newJob.postId}
                        onChange={(e) =>
                          setNewJob({ ...newJob, postId: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Job Profile</label>
                      <input
                        type="text"
                        placeholder="e.g. Backend Developer"
                        value={newJob.postProfile}
                        onChange={(e) =>
                          setNewJob({ ...newJob, postProfile: e.target.value })
                        }
                      />
                    </div>

                    {/* ✨ AI-POWERED JOB DESCRIPTION FIELD */}
                    <div className="form-group full-width">
                      <div className="label-row">
                        <label>Job Description</label>
                        <button
                          type="button"
                          className="btn-generate"
                          onClick={generateJD}
                          disabled={isGenerating}
                        >
                          <IconSparkles size={14} stroke={2} />
                          {isGenerating ? "Generating..." : "Generate with AI"}
                        </button>
                      </div>
                      <textarea
                        placeholder="Enter description or click 'Generate with AI' after filling Job Profile..."
                        value={newJob.postDesc}
                        onChange={(e) =>
                          setNewJob({ ...newJob, postDesc: e.target.value })
                        }
                        rows={6}
                        className="jd-textarea"
                      />
                    </div>

                    <div className="form-group">
                      <label>Experience (years)</label>
                      <input
                        type="text"
                        placeholder="e.g. 2"
                        value={newJob.reqExperience}
                        onChange={(e) =>
                          setNewJob({
                            ...newJob,
                            reqExperience: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Tech Stack</label>
                      <input
                        type="text"
                        placeholder="Java, Spring Boot, PostgreSQL"
                        value={newJob.postTechStack}
                        onChange={(e) =>
                          setNewJob({
                            ...newJob,
                            postTechStack: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn-add">
                    <IconPlus size={16} stroke={2} />
                    Add Job
                  </button>
                </form>
              </>
            }
          />

          {/* ✨ RESUME REVIEWER PAGE */}
          <Route
            path="/review-resume"
            element={
              <>
                <p className="section-title">AI Resume Reviewer</p>
                <div className="form-card">
                  <div className="form-grid">
                    {/* PDF Upload */}
                    <div className="form-group full-width">
                      <label>Upload Resume (PDF)</label>
                      <div
                        className="upload-box"
                        onClick={() =>
                          document.getElementById("resumeInput").click()
                        }
                      >
                        <IconUpload size={24} stroke={1.5} color="#7c3aed" />
                        <span className="upload-text">
                          {resumeFile ? resumeFile.name : "Click to upload PDF"}
                        </span>
                        <span className="upload-hint">Max size: 10MB</span>
                      </div>
                      <input
                        id="resumeInput"
                        type="file"
                        accept=".pdf"
                        style={{ display: "none" }}
                        onChange={(e) => setResumeFile(e.target.files[0])}
                      />
                    </div>

                    {/* Job Profile Input */}
                    <div className="form-group full-width">
                      <label>Job Profile to Match Against</label>
                      <input
                        type="text"
                        placeholder="e.g. Backend Developer, DevOps Engineer"
                        value={reviewProfile}
                        onChange={(e) => setReviewProfile(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Review Button */}
                  <button
                    className="btn-generate"
                    onClick={reviewResume}
                    disabled={isReviewing}
                    style={{
                      padding: "10px 20px",
                      fontSize: "14px",
                      marginTop: "4px",
                    }}
                  >
                    <IconSparkles size={16} stroke={2} />
                    {isReviewing ? "Reviewing..." : "Review Resume with AI"}
                  </button>
                </div>

                {/* Error */}
                {reviewError && (
                  <div className="review-error">{reviewError}</div>
                )}

                {/* ✅ Results */}
                {reviewResult && (
                  <div className="review-results">
                    {/* Match Score */}
                    <div className="score-card">
                      <div
                        className="score-circle"
                        style={{
                          borderColor: getScoreColor(reviewResult.matchScore),
                        }}
                      >
                        <span
                          className="score-number"
                          style={{
                            color: getScoreColor(reviewResult.matchScore),
                          }}
                        >
                          {reviewResult.matchScore}
                        </span>
                        <span className="score-label">/ 100</span>
                      </div>
                      <div>
                        <p className="score-title">Match Score</p>
                        <p className="score-subtitle">
                          {reviewResult.matchScore >= 75
                            ? "Strong match! 🎉"
                            : reviewResult.matchScore >= 50
                              ? "Decent match, room to improve"
                              : "Needs improvement"}
                        </p>
                      </div>
                    </div>

                    {/* 3 Cards — Strengths, Missing Skills, Tips */}
                    <div className="review-cards">
                      {/* Strengths */}
                      <div className="review-card">
                        <div className="review-card-header">
                          <IconCheck size={16} color="#34d399" />
                          <span style={{ color: "#34d399" }}>Strengths</span>
                        </div>
                        <ul className="review-list">
                          {reviewResult.strengths?.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Missing Skills */}
                      <div className="review-card">
                        <div className="review-card-header">
                          <IconAlertTriangle size={16} color="#f87171" />
                          <span style={{ color: "#f87171" }}>
                            Missing Skills
                          </span>
                        </div>
                        <ul className="review-list">
                          {reviewResult.missingSkills?.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Tips */}
                      <div className="review-card">
                        <div className="review-card-header">
                          <IconBulb size={16} color="#fbbf24" />
                          <span style={{ color: "#fbbf24" }}>
                            Tips to Improve
                          </span>
                        </div>
                        <ul className="review-list">
                          {reviewResult.tips?.map((t, i) => (
                            <li key={i}>{t}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </>
            }
          />

          {/* CONTACT PAGE */}
          <Route
            path="/contact"
            element={
              <div
                className="form-card"
                style={{ textAlign: "center", padding: "3rem 1.5rem" }}
              >
                <h2 style={{ color: "#a78bfa", marginBottom: "1rem" }}>
                  Get In Touch
                </h2>
                <p
                  style={{
                    color: "#6b6b80",
                    marginBottom: "2rem",
                    fontSize: "14px",
                  }}
                >
                  Have questions about the job portal setup or running into
                  Docker orchestration issues? Drop a message.
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    maxWidth: "400px",
                    margin: "0 auto",
                  }}
                  className="form-group"
                >
                  <input type="text" placeholder="Your Name" />
                  <input type="email" placeholder="Your Email" />
                  <input
                    type="text"
                    placeholder="Your Message"
                    style={{ height: "80px" }}
                  />
                  <button
                    className="btn-add"
                    style={{ justifyContent: "center" }}
                    onClick={() => alert("Message sent!")}
                  >
                    Send Message
                  </button>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
