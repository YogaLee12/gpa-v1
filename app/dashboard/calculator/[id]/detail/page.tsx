
import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import { AddAssignment } from "@/app/ui/calculator/button"
import Breadcrumbs from '@/app/ui/calculator/breadcrumbs';
import { fetchCourseDetail } from "@/app/lib/db/fetchData";
import Table from "@/app/ui/calculator/courseDetail"

export default async function Page({ 
    params 
    }: { 
    params: { id: string } 

}) {
    const id = params.id;
    const course = await fetchCourseDetail(id);
    const courseCode = course.map((coursename) => coursename.course_code)[0];
    const courseName = course.map((coursename) => coursename.course_name)[0]
    return (
        <div className="w-full">
            <Breadcrumbs
                breadcrumbs={[
                { label: 'Course', href: '/dashboard/calculator' },
                {
                    label: `${courseCode} ${courseName}`,
                    href: `/dashboard/calculator/${id}/detail`,
                    active: true,

                },
                ]}
            />
            <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}> </h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <AddAssignment />
            </div>

            <Suspense >
            <Table query={id}  />
            </Suspense>
            
        </div>
        );
}