import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { Students } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';

async function getStudent(email: string): Promise<Students | undefined> {
    try {
        const student = await sql<Students>`SELECT * FROM students WHERE email=${email}`;
        return student.rows[0];
    } catch (error) {
        console.error('Failed to fetch student:', error);
        throw new Error('Failed to fetch student.');
    }
}

async function createStudent(name: string, email: string, password: string): Promise<Students> {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const result = await sql<Students>`
            INSERT INTO students (name, email, password) 
            VALUES (${name}, ${email}, ${hashedPassword}) 
            RETURNING *`;
        return result.rows[0];
    } catch (error) {
        console.error('Failed to create student:', error);
        throw new Error('Failed to create student.');
    }
}
    
export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ 
                        email: z.string().email(), 
                        password: z.string().min(6),
                        name: z.string().optional() // For registration
                    })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password, name } = parsedCredentials.data;

                    // Check if the user is registering or logging in
                    const student = await getStudent(email);

                    if (student) {
                        

                        // Login scenario
                        const passwordMatch = await bcrypt.compare(password, student.password);
                        if (passwordMatch) {
                            return student;
                        } else {
                            console.log('Invalid password');
                            return null;
                        }
                    } else if (name) {
                        // Registration scenario
                        const newStudent = await createStudent(name, email, password);
                        return newStudent;
                    }
                }
                console.log('Invalid credentials');
                return null;
            }
        }),
    ],
});
