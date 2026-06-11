# Job Portal Application
A full-stack application for managing job postings with AI-powered Job Description Generation. The project is split into a frontend UI and a backend API.

## Project Structure
* `/jobapp-backend`: Spring Boot REST API.
* `/jobapp-frontend`: React single-page application.

## Technologies Used
* **Frontend:** React, React Router, CSS
* **Backend:** Spring Boot, Spring Data JPA, Spring AI (OpenAI GPT)
* **Database:** PostgreSQL
* **DevOps:** Docker, docker-compose
* **Docs:** Springdoc OpenAPI (Swagger UI)

## Features
* View, add, search, and delete job postings
* AI-powered Job Description Generator — enter a job profile and auto-generate a professional JD using OpenAI GPT
* Bean validation with meaningful error messages
* Global exception handling via @RestControllerAdvice
* Interactive API docs via Swagger UI at /swagger-ui.html

## How to Run Locally

### Backend
1. Navigate to `jobapp-backend`.
2. Configure your database and AI details in `src/main/resources/application.properties`:
   spring.datasource.url=jdbc:postgresql://localhost:5432/jobapp_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.ai.openai.api-key=sk-your-openai-api-key
   spring.ai.openai.chat.options.model=gpt-4o-mini
3. Run the application using your IDE or by running `./mvnw spring-boot:run`.

### Frontend
1. Navigate to `jobapp-frontend`.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the development server at http://localhost:3000.

### Run with Docker
1. Navigate to `jobapp-backend`.
2. Run `docker-compose up --build` to start the app and PostgreSQL together.

## API Endpoints
GET     /api/jobs                        Get all job postings
POST    /api/jobs                        Create a new job posting
GET     /api/jobs/{id}                   Get job by ID
DELETE  /api/jobs/{id}                   Delete a job posting
GET     /api/jobs/search?keyword=        Search jobs by profile
GET     /api/ai/generate-jd?profile=     AI-generate a job description