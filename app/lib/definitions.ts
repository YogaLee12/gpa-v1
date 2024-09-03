// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.

import internal from "stream";

// However, these types are generated automatically if you're using an ORM such as Prisma.
export type Students = {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar_url: string;
};

export type Courses = {
    id: string;
    course_code: string;
    course_name: string;
};

export type Enrollments = {
    id: string;
    user_id: string;
    course_id: string;
    year: string;
    semester:  string;
    gpa_point: string;
};

export type Assignments = {
    id: string;
    enrollment_id: string;
    assignment_name: string;
    grade: string;
};

export type LatestEnrollments = {
    id: string;
    course_name: string;
    course_code: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
// export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
// 	amount: number;
// };

export type EnrolledCoursesTable = {
	course_id: string;
	course_code: string;
    course_name:string;
	gpa_point: number;
};

export type CustomersTableType = {
	id: string;
	name: string;
	email: string;
	image_url: string;
	total_invoices: number;
	total_pending: number;
	total_paid: number;
};

export type FormattedCustomersTable = {
    id: string;
    name: string;
    email: string;
    image_url: string;
    total_invoices: number;
    total_pending: string;
    total_paid: string;
};

export type CustomerField = {
    id: string;
    name: string;
};

export type InvoiceForm = {
    id: string;
    customer_id: string;
    amount: number;
    status: 'pending' | 'paid';
};
