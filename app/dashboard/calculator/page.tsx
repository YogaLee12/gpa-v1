import Search from "@/app/ui/search";
import Table from "@/app/ui/calculator/courseTable"
import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import { CourseTableSkeleton } from "@/app/ui/skeletons";



export default async function Page({
    searchParams,} : {
        searchParams ?:{
            query ?: string;
        };
    }) {
        const query = searchParams?.query || '';

        return (
            <div className="w-full">
            <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>Course List</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Search Courses..." />
            
            </div>

            <Suspense key={query } fallback={<CourseTableSkeleton />}>
            <Table query={query}  />
            </Suspense>
        </div>
        )
    
}