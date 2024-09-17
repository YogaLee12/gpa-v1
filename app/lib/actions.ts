'use server'

import { signIn } from "@/auth";
import { sql } from "@vercel/postgres";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { 
    courseExists, 
    fetchCourseId, 
    insertCourse,
    insertEnrollment,
    insertAssignment,
    } from "@/app/lib/db/queries";
import { 
    fetchStudentId,
    weightValid
} from "@/app/lib/db/fetchData";



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
    revalidatePath('dashborad/predictor');
    
}
export async function deleteAssignment(id:string) {
    await sql `DELETE FROM assignments WHERE id = ${id}`;
    revalidatePath('dashborad/predictor/');
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
    unit: z.coerce.number(),
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
        unit:string[];
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
        unit: formData.get('unit'),
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
        unit,
    } = validatedFields.data;

    course_code.toLocaleUpperCase;

    const iscourseExists = await courseExists(course_code);
    if (iscourseExists){
        // console.log(course_code,'is in course table')
        const courseId = await fetchCourseId(course_code);
        insertEnrollment(stuId,courseId,Number.parseInt(year),semester,gpa,status,);
    }else{
        insertCourse(course_code,course_name,unit);
        const courseId = await fetchCourseId(course_code);
        insertEnrollment(stuId,courseId,Number.parseInt(year),semester,gpa,status);
    }
    
    revalidatePath('/dashboard/predictor')
    redirect('/dashboard/predictor')
}


const assignmentFormSchema = z.object({
    id: z.string(),
    AssignmentName: z.string(),
    grade: z.coerce.number(),
    weight: z.coerce.number(),
    eid:z.string(),
})
const AddAssignment = assignmentFormSchema.omit({id:true});
export async function addAssignment(
    formData:FormData,
){
    const validatedFields = AddAssignment.safeParse({
        eid: formData.get('eid'),
        AssignmentName: formData.get('assignmentName'),
        grade: formData.get('grade') ,
        weight: formData.get('weight'),
    });
    if (!validatedFields.success) {
        return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Add Assignment.',
        };
    }
    
    const {
        eid,
        AssignmentName,
        grade,
        weight
    } = validatedFields.data
    
    
    
    insertAssignment(eid,AssignmentName,grade,weight)
    revalidatePath(`/dashboard/predictor/${eid}/detail`)
    redirect(`/dashboard/predictor/${eid}/detail`)
}