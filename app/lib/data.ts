import { sql } from '@vercel/postgres';
import {
    CustomerField,
    CustomersTableType,
    InvoiceForm,
    LatestEnrollments,
    EnrolledCoursesTable
} from './definitions';


// dashboard page fetch the enrollment data
export async function fetchLatestEnrollments() {
    try {
        const data = await sql<LatestEnrollments>`
        SELECT c.course_name, c.course_code 
        FROM enrollments e
        JOIN courses c ON e.course_id = c.id
        ORDER BY e.year DESC
        LIMIT 4`;

        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the latest enrollments.');
    }
}

export async function fetchCardData() {
    try {
        // You can probably combine these into a single SQL query
        // However, we are intentionally splitting them to demonstrate
        // how to initialize multiple queries in parallel with JS.
        const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
        const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
        const invoiceStatusPromise = sql`SELECT
            SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
            SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
            FROM invoices`;

        const data = await Promise.all([
        invoiceCountPromise,
        customerCountPromise,
        invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');

    return {
        numberOfCustomers,
        numberOfInvoices,
    };
        } catch (error) {
            console.error('Database Error:', error);
            throw new Error('Failed to fetch card data.');
        }
}

export async function fetchEnrolledCourses(
    query: string,
    currentPage: number,
) {

    try {
        const invoices = await sql<EnrolledCoursesTable>`
        SELECT 
            c.course_name, 
            c.course_code,
            e.year,
            e.semester,
            e.gpa_point
        FROM 
            enrollments e
        JOIN 
            courses c ON e.course_id = c.id
        ORDER BY 
            e.year DESC, 
            e.semester DESC;
        `;

        return invoices.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch invoices.');
    }
}

// export async function fetchInvoicesPages(query: string) {
//     try {
//         const count = await sql`SELECT COUNT(*)
//         FROM invoices
//         JOIN customers ON invoices.customer_id = customers.id
//         WHERE
//         customers.name ILIKE ${`%${query}%`} OR
//         customers.email ILIKE ${`%${query}%`} OR
//         invoices.amount::text ILIKE ${`%${query}%`} OR
//         invoices.date::text ILIKE ${`%${query}%`} OR
//         invoices.status ILIKE ${`%${query}%`}
//     `;

//         const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
//         return totalPages;
//     } catch (error) {
//         console.error('Database Error:', error);
//         throw new Error('Failed to fetch total number of invoices.');
//     }
// }

export async function fetchInvoiceById(id: string) {
    try {
        const data = await sql<InvoiceForm>`
        SELECT
            invoices.id,
            invoices.customer_id,
            invoices.amount,
            invoices.status
        FROM invoices
        WHERE invoices.id = ${id};
        `;

        const invoice = data.rows.map((invoice) => ({
        ...invoice,
        // Convert amount from cents to dollars
        amount: invoice.amount / 100,
        }));

        return invoice[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch invoice.');
    }
}

export async function fetchCustomers() {
    try {
        const data = await sql<CustomerField>`
        SELECT
            id,
            name
        FROM customers
        ORDER BY name ASC
        `;

    const customers = data.rows;
    return customers;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch all customers.');
    }
}

export async function fetchFilteredCustomers(query: string) {
    try {
        const data = await sql<CustomersTableType>`
            SELECT
            customers.id,
            customers.name,
            customers.email,
            customers.image_url,
            COUNT(invoices.id) AS total_invoices,
            SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
            SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
            FROM customers
            LEFT JOIN invoices ON customers.id = invoices.customer_id
            WHERE
            customers.name ILIKE ${`%${query}%`} OR
            customers.email ILIKE ${`%${query}%`}
            GROUP BY customers.id, customers.name, customers.email, customers.image_url
            ORDER BY customers.name ASC
        `;

        const customers = data.rows.map((customer) => ({
        ...customer,
        // total_pending: formatCurrency(customer.total_pending),
        // total_paid: formatCurrency(customer.total_paid),
        }));

        return customers;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch customer table.');
    }
}
