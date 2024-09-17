// This file contains type definitions for the data.


export type Students = {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar_url: string;
};

export type Courses = {
    id: string;
    course_code: string;
    course_name: string;
};

export type Enrollments = {
    id: string;
    user_id: string;
    course_id: string;
    year: string;
    semester:  string;
    gpa_point: string;
};

export type Assignments = {
    id: string;
    enrollment_id: string;
    assignment_name: string;
    grade: string;
    weight:string;
};

export type LatestEnrollments = {
    id: string;
    course_name: string;
    course_code: string;
};


export type EnrolledCoursesTable = {
    id: string;
    user_id:string;
    course_id: string;
    course_code: string;
    course_name:string;
    year:string;
    semester: string;
    gpa_point: number;
    status:'upcoming' | 'completed';
};

export type AddCourse ={
    id:string;
    course_code:string;
    course_name: string;
    year:string;
    semester:string;
    unit:string;
    status:'upcoming' | 'completed';
}

export type CourseDetail = {
    id: string;
    course_code: string;
    course_name: string;
    assignment_name:string;
    grade: number;
    gap_point:number;
    weight:string;
    aid: string;
    year: string;
    status:'upcoming' | 'completed';
    semester: string;
    unit: string;
}

export type calculGPA={
    grade:number;
    gpa_point:number;
    unit:number;
}