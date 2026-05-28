<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Job Post Details</title>
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
                        Telusko Job Portal
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
            <section class="jp-detail-section">

                <div class="jp-form-header">
                    <span class="jp-badge">Job Details</span>
                    <h1 class="jp-form-title">${jobPost.postProfile}</h1>
                    <p class="jp-form-subtitle">Full details about this job listing.</p>
                </div>

                <div class="jp-detail-card">

                    <!-- Experience Badge -->
                    <div class="jp-detail-exp-badge">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        ${jobPost.reqExperience} years experience required
                    </div>

                    <!-- Description -->
                    <div class="jp-detail-block">
                        <p class="jp-detail-label">Description</p>
                        <p class="jp-detail-value">${jobPost.postDesc}</p>
                    </div>

                    <div class="jp-detail-divider"></div>

                    <!-- Tech Stack -->
                    <div class="jp-detail-block">
                        <p class="jp-detail-label">Tech Stack</p>
                        <div class="jp-tech-tags">
                            <c:forEach var="tech" items="${jobPost.postTechStack}">
                                <span class="jp-tech-tag">${tech}</span>
                            </c:forEach>
                        </div>
                    </div>

                    <div class="jp-detail-divider"></div>

                    <!-- Actions -->
                    <div class="d-flex align-items-center gap-3 mt-2">
                        <a href="viewalljobs" class="jp-submit-btn text-decoration-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to all jobs
                        </a>
                        <a href="home" class="jp-cancel-link">Go to Home</a>
                    </div>

                </div>

            </section>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
                crossorigin="anonymous"></script>
        </body>

        </html>