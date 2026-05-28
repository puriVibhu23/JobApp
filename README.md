# Job Portal Application

A full-stack application for managing job postings. The project is split into a frontend UI and a backend API.

## Project Structure
* `/jobapp-backend`: Spring Boot REST API.
* `/jobapp-frontend`: React single-page application.

## Technologies Used
* **Frontend:** React, React Router, CSS
* **Backend:** Spring Boot, Spring Data JPA
* **Database:** PostgreSQL

## How to Run Locally

### Backend
1. Navigate to `jobapp-backend`.
2. Configure your database details in `src/main/resources/application.properties`.
3. Run the application using your IDE or by running `./mvnw spring-boot:run`.

### Frontend
1. Navigate to `jobapp-frontend`.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the development server at `http://localhost:3000`.