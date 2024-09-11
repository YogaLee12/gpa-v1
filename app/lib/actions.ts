'use server'

import { signIn } from "@/auth";
import { sql } from "@vercel/postgres";
import { error } from "console";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { courseExists, 
    fetchCourseId, 
    insertCourse,
    insertEnrollment,
    } from "@/app/lib/db/queries";
import { fetchStudentId } from "@/app/lib/data";



export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
    ) {
        try {
        await signIn('credentials', formData);
        } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
            case 'CredentialsSignin':
                return 'Invalid credentials.';
            default:
                return 'Something went wrong.';
            }
        }
        throw error;
    }
}


export async function register(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
        } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
            case 'CredentialsSignin':
                return 'Invalid credentials.';
            default:
                return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function deleteCourse(id:string) {
    await sql `DELETE FROM enrollments WHERE id = ${id}`;
    revalidatePath('dashborad/calculator');
    
}

const FormSchema = z.object({
    id: z.string(),
    course_code: z.string({
        invalid_type_error:'Please select/enter a course code'
    }),
    course_name: z.coerce.string({
        invalid_type_error:'Please select/enter a course name'
    }),
    year: z.string(),
    semester:z.string(),
    gpa: z.coerce.number(),
    status:z.enum(['upcoming','completed']),

})

export type State = {
    errors?: {
        course_code?: string[];
        course_name?: string[];
        year?: string[];
        semester?: string[];
        gpa?: string[]
        status?:string[];
    };
    message?: string | null;
} ;

const AddCourse = FormSchema.omit({id:true});
export async function addCourse(
    // prevState:State,
    formData: FormData
    ) {
    
    const stuId = (await fetchStudentId()).rows[0].id;
    // console.log(stuId);
    const validatedFields = AddCourse.safeParse({
        course_code: formData.get('course_code'),
        course_name: formData.get('course_name'),
        year: formData.get('year'),
        semester: formData.get('semester'),
        gpa:formData.get('gpa'),
        status: formData.get('status'),
    });
    if (!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message:'Missing fields. failed to add course'
        };
    }
    const {
        course_code,
        course_name,
        year,
        semester,
        gpa,
        status,
    } = validatedFields.data;

    course_code.toLocaleUpperCase;

    const iscourseExists = await courseExists(course_code);
    if (iscourseExists){
        // console.log(course_code,'is in course table')
        const courseId = await fetchCourseId(course_code);
        insertEnrollment(stuId,courseId,Number.parseInt(year),semester,gpa,status,);
    }else{
        insertCourse(course_code,course_name);
        const courseId = await fetchCourseId(course_code);
        insertEnrollment(stuId,courseId,Number.parseInt(year),semester,gpa,status);
    }
    
    revalidatePath('/dashboard/calculator')
    redirect('/dashboard/calculator')
}