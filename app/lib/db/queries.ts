import { sql } from "@vercel/postgres";
import exp from "constants";

export async function courseExists(course_code:string) {
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
    await sql`INSERT INTO courses (course_code, course_name)
    VALUES (${course_code}, ${course_name})`
}

export async function fetchCourseId(course_code:string) {
    const course_id = await sql`
        SELECT id FROM courses
        WHERE course_code = ${course_code}
    `
    return course_id.rows[0].id;
}

export async function insertEnrollment(
    user_id:string,
    course_id:string,
    year:number,
    semester:string,
    status:'upcoming' | 'completed'
    ) {
    await sql`
    INSERT INTO enrollments (user_id,course_id,year,semester,status)
    VALUES(${user_id},${course_id},${year},${semester},${status})
    `
}