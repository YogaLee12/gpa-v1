import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { Students } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';

export async function getStudent(email: string): Promise<Students | undefined> {
    try {
        const student = await sql<Students>`SELECT * FROM students WHERE email=${email}`;
        return student.rows[0];
    } catch (error) {
        console.error('Failed to fetch student:', error);
        throw new Error('Failed to fetch student.');
    }
}
    
export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
        async authorize(credentials) {
            const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);
    
            if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const student = await getStudent(email);
            if (!student) return null;
            const passwordMatch = await bcrypt.compare(password, student.password);

            if (passwordMatch) 
                return student;
            }
            
            console.log('Invalid credentials')
            return null;
        },
        }),
    ],
    
});