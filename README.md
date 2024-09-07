# Next.js GPA calculator

This is a GPA calculator developed based on Next.js, which allows users to enter course information and calculate their own gpa. It also allows users to predict their scores in advance.
    
## system requirements
    Node.js 18.17.0 or later
    Operating system: macOS, windows or linux

## To run locally
    This project use pnpm as package manager
        pnpm run dev (or : npm run dev)
        default port 3000

## Database
    PostgreSQL (on vercel)

### Database table
    students:
        id: unique identifier (PK)
        user_name: user name
        email: user for sign in 
        password: for sign in
        avatar_url: profile picture url(nullable) [may be not using any profile pictrue]

    courses:
        id: unique identifier (PK)
        course_code: course code (eg: CSSE1001A)
        course_name: course name

    enrollments:
        id: unique identifier of enrollment record(PK)
        user_id: connect with `users` table, to show user enrolled in this course (FK)
        course_id: connect with `courses` table, the course user enrolled in
        year: the year the course been enrolled(2023)
        semester: the semseter the course been enrolled (1,2,summer)
        gpa_point: the gpa of this course(nullable)

    assignments:
        id: unique identifier(PK)
        enrollment_id: connect with `enrollment` table, mark this home belong to which course
        assignment_name: name of the assignment (Homework 1, Project 1, final_exam)
        grade: assignment result.
