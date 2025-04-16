# Job Portal Application

## Overview

This is a Job Portal application built using Node.js, Express, EJS as the front-end templating language and follows MVC architecture. It allows recruiters to post and manage job listings and provide a user-friendly platform for job seekers to find and apply for suitable roles.


## Key Features

- **Recrutier Authentication:** Secure user authentication system for the employers.
- **Job Listings:** Browse through a comprehensive list of job opportunities.
- **Application Submission:** Job seekers can submit applications to the desired positions.
- **Job Management:** Employers can add, update, delete the jobs and can see job applications for a particular job.
- **Responsive Design:** The application is designed to be responsive for a seamless experience on various devices.


## Technologies Used

- **Node.js:** Server-side runtime environment.
- **Express.js:** Web application framework for Node.js.
- **EJS:** Templating engine for generating dynamic HTML markup.

## NPM Packages Used

- **express:** Web application framework for Node.js.
- **ejs:** Templating engine for rendering dynamic HTML pages.
- **express-ejs-layouts:** Layout support for ejs.
- **dotenv:** Loads environment variables from a .env file.
- **express-session:** Middleware for handling sessions in Express.
- **express-validator:** Validates incoming request data.
- **moment:** Formatting date as required.
- **multer:** Handling file uploads.
- **nodemailer:** Used for sending emails.
- **cookie-parser:** Saving cookies at client-side.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/job-portal-app.git
cd job-portal-app
```

2. Set up environment variables:
Create a .env file in the root directory and configure the following:

```env
PORT=3000
AUTH_USER_MAIL=your_email
AUTH_USER_PASS=your_pass
```

The email and password is required for nodemailer to send mails. You can use your Gmail ID and create a app password. 

3. Start the application:

```bash
npm start
```

Visit http://localhost:3000 in your web browser.

## More Details & Functionalities

- Implemented **Job search functionality** to allow users to filter jobs using the search input in the navbar.
- Implemented **resource-based authorization** so that only the recruiter who posted a job can update or delete it.
- Displayed the recrutier's **last visit date and time** on the frontend to provide personalized information using **Cookies**.
- Added **confirmation dialogs** for delete operation to prevent accidental modifications.
- Implemented a **validation middleware** for consistent form validation across the application.
- Implemented an email notification system to send **confirmation emails** to applicants after they apply to a job.
- Utilized **In-memory data structures** for user and job management operations.