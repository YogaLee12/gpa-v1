// import bcrypt from 'bcrypt'; // pwd hash
// import { db } from '@vercel/postgres';
// import { users, courses, enrollments, assignments } from '../lib/placeholder-data';

// const client = await db.connect();

// async function seedUsers() {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//     await client.sql`
//         CREATE TABLE IF NOT EXISTS users (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         email TEXT NOT NULL UNIQUE,
//         password TEXT NOT NULL,
//         avatar_url VARCHAR(255)
//         );
//     `;

//     const insertedUsers = await Promise.all(
//         users.map(async (user) => {
//         const hashedPassword = await bcrypt.hash(user.password, 10);
//         return client.sql`
//             INSERT INTO users (id, name, email, password,avatar_url)
//             VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword},${user.avatar_url})
//             ON CONFLICT (id) DO NOTHING;
//         `;
//         }),
//     );

//     return insertedUsers;
// }

// async function seedCourses() {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//     await client.sql`
//         CREATE TABLE IF NOT EXISTS enrollments (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         course_code VARCHAR(10) NOT NULL,
//         course_name VARCHAR(255) NOT NULL,
//         );
//     `;

//     const insertedCourses = await Promise.all(
//         courses.map(
//         (course) => client.sql`
//             INSERT INTO invoices (id, courses_code,course_name)
//             VALUES (${course.id}, ${course.course_code}, ${course.course_name})
//             ON CONFLICT (id) DO NOTHING;
//         `,
//         ),
//     );

//     return insertedCourses;
// }

// async function seedEnrollements() {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//     await client.sql`
//         CREATE TABLE IF NOT EXISTS enrollments (
//             id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//             user_id UUID NOT NULL,
//             course_id UUID NOT NULL,
//             year INT(8),
//             semester VARCHAR(50),
//             gpa_point INT(2)
//         );
//     `;

//     const insertedEnrollments = await Promise.all(
//         enrollments.map(
//         (enrollment) => client.sql`
//             INSERT INTO enrollments (id, user_id, course_id, year, semester, gpa_point)
//             VALUES (${enrollment.id}, ${enrollment.user_id}, ${enrollment.course_id}, ${enrollment.year},${enrollment.semester},${enrollment.gpa_point})
//             ON CONFLICT (id) DO NOTHING;
//         `,
//         ),
//     );

//     return insertedEnrollments;
// }

// async function seedAssignments() {
//     await client.sql`
//         CREATE TABLE IF NOT EXISTS assignments (
//             id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//             enrollment_id UUID NOT NULL,
//             assignment_name VARCHAR(255),
//             grade INT(3)
//         );
//     `;

//     const insertedAssignments = await Promise.all(
//         assignments.map(
//         (assignment) => client.sql`
//             INSERT INTO assignments (id, enrollment_id,assignment_name,grade)
//             VALUES (${assignment.id}, ${assignment.enrollment_id},${assignment.assgnment_name},${assignment.grade})
//         `,
//         ),
//     );

//     return insertedAssignments;
// }

// export async function GET() {
//     try {
//         await client.sql`BEGIN`;
//         await seedUsers();
//         await seedEnrollements();
//         await seedCourses();
//         await seedAssignments();
//         await client.sql`COMMIT`;

//         return Response.json({ message: 'Database seeded successfully' });
//     } catch (error) {
//         await client.sql`ROLLBACK`;
//         return Response.json({ error }, { status: 500 });
//     }
// }
