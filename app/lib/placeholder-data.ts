const students = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',
        name: 'student1',
        email: 'stu@stu.com',
        password: '123',
        avatar_url:'',
    },
];

const courses = [
    {
        id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
        course_code: 'CSSE1001',
        course_name:'Introduction to Software Engineering'
    }
];

const enrollments = [
    {
        id: 'e52bca0b-94c7-4063-91f0-b04a54d9241e',
        user_id: students[0].id,
        course_id: courses[0].id,
        year: 2023,
        semester: '1',
        gpa_point: null,
    }
];

const assignments = [
    {
        id: '4dce3e98-865a-41ba-a684-6b5838e4d5b2',
        enrollment_id: enrollments[0].id,
        assignment_name: 'A1',
        grade: 30,
    },
    {
        id: '1d65ead6-2b52-4cdb-b95d-d395acd41076',
        enrollment_id: enrollments[0].id,
        assignment_name: 'A2',
        grade: 20,
    },
    {
        id: '41d2380a-e5a8-4b1c-b03f-17e1fe4b5e78',
        enrollment_id: enrollments[0].id,
        assignment_name: 'exam',
        grade: 30,
    },
];

export { students, courses, enrollments, assignments };
