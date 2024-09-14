import { sql } from "@vercel/postgres";
import { EnrolledCoursesTable,
        LatestEnrollments,
        CourseDetail
} from '@/app/lib/definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function courseExists(course_code:string) {
    noStore()
    const result = await sql`
    select 1 from courses where course_code = ${course_code}
    `
    if (result.rows.length > 0) {
        return true;
    }else{
        return false;
    }
}

export async function insertCourse(
    course_code:string,
    course_name:string) {
    noStore();
    await sql`INSERT INTO courses (course_code, course_name)
    VALUES (${course_code}, ${course_name})`
}

export async function fetchCourseId(course_code:string) {
    noStore();
    const data = await sql`
        SELECT id FROM courses
        WHERE course_code = ${course_code}
    `
    return data.rows[0].id;
}

export async function insertEnrollment(
    user_id:string,
    course_id:string,
    year:number,
    semester:string,
    gpa: number | null,
    status:'upcoming' | 'completed',
    
    ) {
    noStore();
    await sql`
    INSERT INTO enrollments (user_id,course_id,year,semester,gpa_point,status)
    VALUES(${user_id},${course_id},${year},${semester},${gpa},${status})
    `
}

export async function getEnrolledCourse(
    stuId: string,
    query: string
) {
    noStore()
    const data = 
    await sql<EnrolledCoursesTable>`
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
            e.user_id = ${stuId} AND (
            c.course_name ILIKE ${`%${query}%`} OR
            c.course_code ILIKE ${`%${query}%`} OR
            e.year::text ILIKE ${`%${query}%`} )
            
        ORDER BY e.year DESC 
        `
        return data
}

export async function getLatestEnrollments(stuId:string,) {
    noStore();
    const data = await sql<LatestEnrollments>`
    SELECT c.course_name, c.course_code 
    FROM enrollments e
    JOIN courses c ON e.course_id = c.id
    JOIN students s ON s.id = e.user_id
    WHERE s.id = ${stuId}
    ORDER BY e.year DESC
    LIMIT 4`;
    return data;
}

export async function getCourseDetail(
    enrollmentId:string
) {
    noStore();
    const data = await sql<CourseDetail>`
    SELECT 
    a.id,
    a.assignment_name,
    a.grade,
    e.gpa_point,
    c.course_code,
    c.course_name
    FROM assignments a
    JOIN enrollments e ON e.id = a.enrollment_id
    JOIN courses c ON e.course_id = c.id
    WHERE a.enrollment_id = ${enrollmentId}
    `
    return data;
}