import { UpdateCourse, DeleteCourse } from '@/app/ui/calculator/button';
import CourseStatus from '@/app/ui/calculator/status';
import { fetchEnrolledCourse } from '@/app/lib/db/fetchData';
import Link from 'next/link';

export default async function CoursesTable({
    query,
    // currentPage,
    }: {
    query: string;
    // currentPage: number;
    }) {
    const enrollCourses = await fetchEnrolledCourse(query);
    


    return (
        <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
            <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
                {enrollCourses?.map((enrollCourse) => (
                <div
                    key={enrollCourse.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                >
                    <div className="flex items-center justify-between border-b pb-4">
                    <div>
                        <div className="mb-2 flex items-center">
                        <p>{enrollCourse.course_code}</p>
                        </div>
                        <p className="text-md text-black">{enrollCourse.course_name}</p>
                    </div>
                    <CourseStatus status={enrollCourse.status === 'upcoming'? ('upcoming'):(
                        enrollCourse.gpa_point.toString()
                    )} />
                    </div>
                    <div className="flex w-full items-center justify-between pt-4">
                    <div>
                        <p className="text-sm font-sm">
                        {enrollCourse.year} semester:{enrollCourse.semester}
                        </p>
                    </div>
                    <div className="flex justify-end gap-2">
                        <UpdateCourse id={enrollCourse.id} />
                        <DeleteCourse id={enrollCourse.id} />
                    </div>
                    </div>
                </div>
                ))}
            </div>
            <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Course Code
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                    Course Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                    semester
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                    Status
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Edit</span>
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white">
                    
                {enrollCourses?.map((enrollCourse) => (
                
                    <tr
                    
                    key={enrollCourse.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                    
                    <td className="whitespace-nowrap ">
                        <Link className="flex items-center gap-3 py-3 pl-6 pr-3" href={`/dashboard/calculator/${enrollCourse.id}/detail`}>
                        {enrollCourse.course_code}
                        </Link>
                    </td>
                    
                    <td className="whitespace-nowrap ">
                        <Link className='px-3 py-3' href={`/dashboard/calculator/${enrollCourse.id}/detail`}>{enrollCourse.course_name}</Link>
                    </td>

                    <td className="whitespace-nowrap px-3 py-3">
                        <Link className='px-3 py-3' href={`/dashboard/calculator/${enrollCourse.id}/detail`}>
                        {enrollCourse.year} semester:{enrollCourse.semester}
                        </Link>
                    </td>
                    
                    <td className="whitespace-nowrap px-3 py-3">
                        <CourseStatus status={enrollCourse.status === 'upcoming'? ('upcoming'):(
                        enrollCourse.gpa_point.toString()
                    )}  />
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                        <UpdateCourse id={enrollCourse.id} />
                        <DeleteCourse id={enrollCourse.id} />
                        </div>
                    </td>
                    </tr>
                    
                ))}
                
                </tbody>
            </table>
            </div>
        </div>
        </div>
    );
}