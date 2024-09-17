import { sql } from '@vercel/postgres';
import {
    AddCourse,
} from '@/app/lib/definitions';
import { auth } from '@/auth';
import type { Students } from '@/app/lib/definitions';
import { unstable_noStore as noStore } from 'next/cache';
import { 
    getEnrolledCourse, 
    getLatestEnrollments,
    getCourseDetail,
    weightFlag,
} from './queries'; 

export async function fetchStudentId() {
    noStore();
    const stu = await auth();
    const stu_id = await sql<Students>`SELECT * FROM students WHERE email=${stu?.user?.email}`;
    return stu_id;
}

// fetch the last 4 enrollmented courses(Usually 4 courses in a semester)
export async function fetchLatestEnrollments() {
    noStore();
    try {
        const stuId = await fetchStudentId();
        const data = await getLatestEnrollments(stuId.rows[0].id);
        
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the latest enrollments.');
    }
}



export async function fetchEnrolledCourse(
    query: string,
) {
    noStore();
    const stuId = await fetchStudentId();
    try {
    const enrollCourse = await getEnrolledCourse(stuId.rows[0].id,query)

    return enrollCourse.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch course.');
    }
}

export async function fetchCourse() {
    noStore();
    try{
        const data = await sql<AddCourse>`
        SELECT * FROM courses
        `;
        const courses = data.rows;
        return courses;
    }catch(err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch all course.');
    }
}

//fetch assignment info of the enrolled course 
export async function fetchCourseDetail(id:string) {
    noStore();
    try{
        const data = await getCourseDetail(id);
        return data.rows
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch course detail.');
    }
}

export async function weightValid(eid:string) {
    noStore();
    try {
        const data = await weightFlag(eid);
        return data;
    }catch (err) {
        console.error('Database Error:' ,err);
        throw new Error('Failed to fetch weight')
    }
}
