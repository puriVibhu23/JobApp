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
} from "@tabler/icons-react";
import "./App.css";

function App() {
  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [newJob, setNewJob] = useState({
    postId: "",
    postProfile: "",
    postDesc: "",
    reqExperience: "",
    postTechStack: "",
  });

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

  // 🛠️ UPDATED: Explicitly handle plain text response from backend cleanly
  const deleteJob = (id) => {
    fetch(`http://localhost:8080/api/jobs/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          fetchJobs(); // Instantly refresh layout from DB
        } else {
          console.error("Server returned an error on deletion");
        }
      })
      .catch((err) => console.error("Error deleting job:", err));
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
                    <div className="form-group full-width">
                      <label>Job Description</label>
                      <input
                        type="text"
                        placeholder="e.g. Spring Boot experience required"
                        value={newJob.postDesc}
                        onChange={(e) =>
                          setNewJob({ ...newJob, postDesc: e.target.value })
                        }
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
