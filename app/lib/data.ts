import { sql } from '@vercel/postgres';
import {
    LatestEnrollments,
    EnrolledCoursesTable,
    Courses,
    AddCourse
} from './definitions';
import { auth } from '@/auth';
import type { Students } from '@/app/lib/definitions';
import { unstable_noStore as noStore } from 'next/cache';

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
        const data = await sql<LatestEnrollments>`
        SELECT c.course_name, c.course_code 
        FROM enrollments e
        JOIN courses c ON e.course_id = c.id
        JOIN students s ON s.id = e.user_id
        WHERE s.id = ${stuId.rows[0].id}
        ORDER BY e.year DESC
        LIMIT 4`;
        
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
    const enrollCourse = await sql<EnrolledCoursesTable>`
        SELECT
            c.course_code,
            c.course_name,
            e.year,
            e.semester,
            e.gpa_point,
            e.status,
            e.id
        FROM enrollments e
        JOIN courses c ON e.course_id = c.id
        WHERE
            e.user_id = ${stuId.rows[0].id} AND (
            c.course_name ILIKE ${`%${query}%`} OR
            c.course_code ILIKE ${`%${query}%`} OR
            e.year::text ILIKE ${`%${query}%`} )
            
        ORDER BY e.year DESC
    `;

    return enrollCourse.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch course.');
    }
}

export async function fetchCourse() {
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


