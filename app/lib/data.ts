import { sql } from '@vercel/postgres';
import {
    CustomerField,
    CustomersTableType,
    InvoiceForm,
    InvoicesTable,
    LatestInvoiceRaw,
    Revenue,
    LatestEnrollments,
} from './definitions';
import { auth } from '@/auth';
import { formatCurrency } from './utils';
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


