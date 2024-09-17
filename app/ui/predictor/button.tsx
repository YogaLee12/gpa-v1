'use client'

import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteCourse,deleteAssignment } from '@/app/lib/actions'
import { useState } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';



export function AddCourse() {
    return (
        <Link
        href="/dashboard/predictor/create"
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
        <span className="hidden md:block">Add Course</span>
        <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
}
export function AddAssignment({id}:{id:string}) {
    return (
        
        <Link
        href={`/dashboard/predictor/${id}/detail/create`}
        className="flex h-10 items-center rounded-lg bg-purple-600 px-4 text-sm font-medium text-white transition-colors hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
        <span className="hidden md:block">Add Assignment</span>
        <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
}

export function UpdateCourse({ 
    id,
}: { 
    id: string,
}) {
    return (
        <Link
        href={`/dashboard/predictor/${id}/detail`}
        className="rounded-md border p-2 hover:bg-gray-100"
        >
        <PencilIcon className="w-5" />
        </Link>
    );
}

export function DeleteCourse({ id }: { id: string }) {
    const deleteCourseWithID = deleteCourse.bind(null, id);
    const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const confirmed = window.confirm('Are you sure you want to delete this course?');
        if (confirmed) {
            deleteCourseWithID(); // 执行删除操作
        }
    };
    
    return (
        <form onSubmit={handleDelete} >
        <button className="rounded-md border p-2 hover:bg-gray-100">
            <span className="sr-only">Delete</span>
            <TrashIcon className="w-5" />
        </button>
        </form>
    );
}
export function DeleteAssignment({ id }: { id: string }){
    const deleteAssignmentWithID = deleteAssignment.bind(null, id);
    const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const confirmed = window.confirm('Are you sure you want to delete this Assignment?');
        if (confirmed) {
            deleteAssignmentWithID(); // 执行删除操作
        }
    };
    return (
        <form onSubmit={handleDelete}>
        <button className="rounded-md border p-2 hover:bg-gray-100">
            <span className="sr-only">Delete</span>
            <TrashIcon className="w-5" />
        </button>
        </form>
    );
}




