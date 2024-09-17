
import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import { AddAssignment } from "@/app/ui/predictor/button";
import { ExamPredict } from "@/app/ui/predictor/predictExam";
import Breadcrumbs from '@/app/ui/predictor/breadcrumbs';
import { fetchCourseDetail } from "@/app/lib/db/fetchData";
import Table from "@/app/ui/predictor/courseDetail"
import Form from "@/app/ui/predictor/courseEdit";

export default async function Page({ 
    params,
    }: { 
    params: { id: string },
}) {
    const id = params.id;
    const course = await fetchCourseDetail(id);
    const courseCode = course[0].course_code;
    const courseName = course[0].course_name;
    const enrollmentId =course[0].id;
    return (
        <div className="w-full">
            <Breadcrumbs
                breadcrumbs={[
                { label: 'Course', href: '/dashboard/calculator' },
                {
                    label: `${courseCode}  ${courseName}`,
                    href: `/dashboard/calculator/${enrollmentId}/detail`,
                    active: true,

                },
                ]}
            />
            <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}> </h1>
            </div>
            <div className="mt-4 flex items-center gap-2 md:mt-8 justify-between ">
            <AddAssignment id={enrollmentId}/>
            </div>

            <Suspense >
            <Form courses={course}/>
            <Table query={enrollmentId}  />
            </Suspense>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8 ">
            <ExamPredict courseDetails={course}/>
            
            </div>
            
        </div>
        );
}