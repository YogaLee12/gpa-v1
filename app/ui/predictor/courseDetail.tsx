import { UpdateCourse, DeleteAssignment } from '@/app/ui/predictor/button';
import { fetchCourseDetail } from '@/app/lib/db/fetchData';

export default async function CoursesDetail({
    query,
    // currentPage,
    }: {
    query: string;
    // currentPage: number;
    }) {
    const enrollCourses = await fetchCourseDetail(query);
    


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
                        <p className='font-blod text-xl '>{enrollCourse.assignment_name}</p>
                        </div>
                    </div><div>
                    <p className='font-blod text-xl inline'> {enrollCourse.grade}</p> 
                    <p className='text-sm text-gray-500 '>/ {enrollCourse.weight}</p></div>
                    </div>
                    <div className="flex w-full items-center justify-between pt-4">
                    
                    <div className="flex justify-end gap-2">
                        <UpdateCourse id={enrollCourse.id} />
                        <DeleteAssignment id={enrollCourse.aid} />
                    </div>
                    </div>
                </div>
                ))}
            </div>
            <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Item
                    </th>
                    
                    <th scope="col" className="px-3 py-5 font-medium">
                    grade
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
                        <div className='px-3 py-3 font-blod text-xl ' >{enrollCourse.assignment_name}</div>
                    </td>

                    
                    
                    <td className="whitespace-nowrap px-3 py-3">
                        <p className='font-blod text-xl '>{enrollCourse.grade} </p>
                        <p className='text-sm text-gray-500 '>  / {enrollCourse.weight}</p>
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                        <UpdateCourse id={enrollCourse.id} />
                        <DeleteAssignment id={enrollCourse.aid} />
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