'use server'

import { signIn } from "@/auth";
import { sql } from "@vercel/postgres";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from 'bcrypt';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";




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

export const FormStu = z.object({
            id:z.string(),
            name:z.string(),
            email:z.string(),
            password: z.string().min(6),
        });

export const RegisterStu = FormStu.omit({id:true});

export async function register(
    // prevSate:string | undefined,
    formData: FormData,
) {

        
        // get form data
        const validatedStu = RegisterStu.safeParse( {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            });
        
        // valid form fields
        if (!validatedStu.success){
            return {
                errors: validatedStu.error.flatten().fieldErrors,
                message: 'All fields are required.',
            };
        }
        
        const {name, email,password} = validatedStu.data;
        try {
            const exsitingStu = await sql`
                SELECT * FROM students WHERE email = ${email};
            `
            
            if (exsitingStu.rows.length>0){
                return {message:'Email already registered.'};
                
            }else{
                const hashedPassword = await bcrypt.hash(password, 10);
                try {
                    await sql`
                    INSERT INTO students (name , email, password)
                    VALUES (${name}, ${email}, ${hashedPassword})
                    `;
                } catch (error) {
                    // If a database error occurs, return a more specific error.
                    return {
                    message: 'Database Error: Failed to Create Invoice.',
                    };
                }
        
        }
            

        } catch (error) {
            console.error('Database Error',error);
            return{message:'Internal server error'};
        }
        revalidatePath('/login');
        redirect('/login');
        
}