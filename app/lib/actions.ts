'use server'

import { signIn } from "@/auth";
import { sql } from "@vercel/postgres";
import { error } from "console";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { formatDynamicAPIAccesses } from "next/dist/server/app-render/dynamic-rendering";
import { z } from "zod";



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
    course_name: z.string({
        invalid_type_error:'Please select/enter a course name'
    }),

})

export type State = {
    errors?: {
        course_code?: string[];
        course_name?: string[];
    };
    message?: string | null;
} ;

const AddCourse = FormSchema.omit({id:true});
export async function addCourse(
    
    formData: FormData
    ) {
    const validatedFields = AddCourse.safeParse({
        course_code: formData.get('course_code'),
        course_name: formData.get('course_name')
    });

    if (!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message:'Missing fields. failed to add course'
        };
    }

    const {course_code,course_name} = validatedFields.data;
    console.log('course code:',{course_code},', course name:',{course_name})
    await sql`INSERT INTO courses (course_code, course_name)
    VALUES (${course_code}, ${course_name})`
}