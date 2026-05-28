<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Job Portal - Add Job</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
                crossorigin="anonymous">
            <link rel="stylesheet" type="text/css" href="style.css">
        </head>

        <body>

            <!-- Navbar -->
            <nav class="navbar navbar-expand-lg jp-navbar">
                <div class="container">
                    <a class="navbar-brand jp-brand" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"
                            stroke="#818cf8" stroke-width="1.8">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M20 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                        </svg>
                        Job Portal
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item"><a class="nav-link jp-nav-link" href="home">Home</a></li>
                            <li class="nav-item"><a class="nav-link jp-nav-link" href="viewalljobs">All Jobs</a></li>
                            <li class="nav-item"><a class="nav-link jp-nav-link" href="https://telusko.com/">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <!-- Page Content -->
            <section class="jp-form-section">

                <div class="jp-form-header">
                    <span class="jp-badge">New Listing</span>
                    <h1 class="jp-form-title">Post a new job</h1>
                    <p class="jp-form-subtitle">Fill in the details below to add a new job listing.</p>
                </div>

                <div class="jp-form-card">
                    <form action="handleForm" method="post">

                        <!-- Row 1: Post ID + Post Profile -->
                        <div class="row g-3 mb-3">
                            <div class="col-md-4">
                                <label for="postId" class="jp-label">Post ID</label>
                                <input type="text" class="form-control jp-input" id="postId" name="postId"
                                    placeholder="e.g. 101" required>
                            </div>
                            <div class="col-md-8">
                                <label for="postProfile" class="jp-label">Post Profile</label>
                                <input type="text" class="form-control jp-input" id="postProfile" name="postProfile"
                                    placeholder="e.g. Backend Developer" required>
                            </div>
                        </div>

                        <!-- Row 2: Description -->
                        <div class="mb-3">
                            <label for="postDesc" class="jp-label">Post Description</label>
                            <textarea class="form-control jp-input" id="postDesc" name="postDesc" rows="3"
                                placeholder="Describe the role, responsibilities, and requirements..."
                                required></textarea>
                        </div>

                        <!-- Row 3: Experience + Tech Stack -->
                        <div class="row g-3 mb-4">
                            <div class="col-md-4">
                                <label for="reqExperience" class="jp-label">Required Experience (years)</label>
                                <input type="number" class="form-control jp-input" id="reqExperience"
                                    name="reqExperience" placeholder="e.g. 2" min="0" required>
                            </div>
                            <div class="col-md-8">
                                <label for="postTechStack" class="jp-label">
                                    Tech Stack
                                    <span class="jp-label-hint">(hold Ctrl / Cmd to select multiple)</span>
                                </label>
                                <select multiple class="form-select jp-input jp-select" id="postTechStack"
                                    name="postTechStack" required>
                                    <optgroup label="Languages">
                                        <option value="Java">Java</option>
                                        <option value="JavaScript">JavaScript</option>
                                        <option value="TypeScript">TypeScript</option>
                                        <option value="Swift">Swift</option>
                                        <option value="Go">Go</option>
                                        <option value="Kotlin">Kotlin</option>
                                        <option value="Rust">Rust</option>
                                        <option value="PHP">PHP</option>
                                        <option value="HTML5">HTML5</option>
                                        <option value="CSS3">CSS3</option>
                                    </optgroup>
                                    <optgroup label="Frontend">
                                        <option value="React Native">React Native</option>
                                        <option value="Vue.js">Vue.js</option>
                                        <option value="Angular">Angular</option>
                                        <option value="Flutter">Flutter</option>
                                    </optgroup>
                                    <optgroup label="Backend">
                                        <option value="Node.js">Node.js</option>
                                        <option value="Express.js">Express.js</option>
                                        <option value="Django">Django</option>
                                        <option value="Flask">Flask</option>
                                        <option value="Ruby on Rails">Ruby on Rails</option>
                                        <option value="Laravel">Laravel</option>
                                    </optgroup>
                                    <optgroup label="Cloud & DevOps">
                                        <option value="Docker">Docker</option>
                                        <option value="Kubernetes">Kubernetes</option>
                                        <option value="Jenkins">Jenkins</option>
                                        <option value="AWS (Amazon Web Services)">AWS</option>
                                        <option value="Azure">Azure</option>
                                        <option value="Google Cloud">Google Cloud</option>
                                        <option value="DevOps">DevOps</option>
                                    </optgroup>
                                    <optgroup label="AI & Data">
                                        <option value="Machine Learning">Machine Learning</option>
                                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                                        <option value="TensorFlow">TensorFlow</option>
                                        <option value="PyTorch">PyTorch</option>
                                        <option value="Elasticsearch">Elasticsearch</option>
                                        <option value="Apache Kafka">Apache Kafka</option>
                                    </optgroup>
                                    <optgroup label="Methodologies">
                                        <option value="Agile">Agile</option>
                                        <option value="Scrum">Scrum</option>
                                        <option value="Kanban">Kanban</option>
                                    </optgroup>
                                    <optgroup label="Security">
                                        <option value="Cybersecurity">Cybersecurity</option>
                                        <option value="CISSP (Certified Information Systems Security Professional)">
                                            CISSP</option>
                                        <option value="CompTIA Security+">CompTIA Security+</option>
                                        <option value="Certified Ethical Hacker (CEH)">CEH</option>
                                    </optgroup>
                                    <optgroup label="Other">
                                        <option value="GraphQL">GraphQL</option>
                                        <option value="Blockchain">Blockchain</option>
                                        <option value="Unity">Unity</option>
                                        <option value="Game Development">Game Development</option>
                                        <option value="Raspberry Pi">Raspberry Pi</option>
                                        <option value="Arduino">Arduino</option>
                                        <option value="IoT (Internet of Things)">IoT</option>
                                    </optgroup>
                                </select>
                            </div>
                        </div>

                        <!-- Submit -->
                        <div class="d-flex align-items-center gap-3">
                            <button type="submit" class="jp-submit-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14M5 12h14" />
                                </svg>
                                Post Job
                            </button>
                            <a href="home" class="jp-cancel-link">Cancel</a>
                        </div>

                    </form>
                </div>

            </section>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
                crossorigin="anonymous"></script>
        </body>

        </html>