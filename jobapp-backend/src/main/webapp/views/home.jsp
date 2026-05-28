<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Job Portal</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
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

        <!-- Hero Section -->
        <section class="jp-hero">
            <span class="jp-badge">Spring Boot Project</span>
            <h1 class="jp-hero-title">Find your next opportunity</h1>
            <p class="jp-hero-subtitle">
                Browse open positions or post a new job listing to connect with top talent.
            </p>

            <!-- Action Cards -->
            <div class="row justify-content-center g-3 jp-cards-wrapper">
                <div class="col-md-5">
                    <a href="/viewalljobs" class="jp-action-card">
                        <div class="jp-card-icon jp-icon-blue">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                                <circle cx="11" cy="11" r="8" />
                                <path stroke-linecap="round" d="m21 21-4.35-4.35" />
                            </svg>
                        </div>
                        <h5 class="jp-card-title">Browse jobs</h5>
                        <p class="jp-card-desc">View all available job listings in one place.</p>
                        <span class="jp-card-cta">
                            View all jobs
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 18l6-6-6-6" />
                            </svg>
                        </span>
                    </a>
                </div>
                <div class="col-md-5">
                    <a href="/addjob" class="jp-action-card">
                        <div class="jp-card-icon jp-icon-green">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14M5 12h14" />
                            </svg>
                        </div>
                        <h5 class="jp-card-title">Post a job</h5>
                        <p class="jp-card-desc">Add a new listing and reach the right candidates.</p>
                        <span class="jp-card-cta">
                            Add job
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 18l6-6-6-6" />
                            </svg>
                        </span>
                    </a>
                </div>
            </div>

            <!-- Stats Row -->
            <div class="jp-stats-row">
                <div class="jp-stat-item">
                    <div class="jp-stat-num">${totalJobs}</div>
                    <div class="jp-stat-label">Open positions</div>
                </div>
                <div class="jp-stat-divider"></div>
                <div class="jp-stat-item">
                    <div class="jp-stat-num">1</div>
                    <div class="jp-stat-label">Companies</div>
                </div>
                <div class="jp-stat-divider"></div>
                <div class="jp-stat-item">
                    <div class="jp-stat-num">${totalTechStacks}</div>
                    <div class="jp-stat-label">Tech stacks</div>
                </div>
            </div>
        </section>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
            crossorigin="anonymous"></script>
    </body>

    </html>