'use client';

import { AddCourse } from '@/app/lib/definitions';
import Link from 'next/link';
import { UserCircleIcon,CheckIcon,ClockIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useCourseSelect } from '@/app/lib/selectCourse'; // 引入外部钩子
import { addCourse } from '@/app/lib/actions';
import { useState } from 'react';
import { SEMESTERS,YEARS,useCourseStatus, STATUS_COMPLETED, STATUS_UPCOMING } from '@/app/lib/createPageConstants';

export default function Form({ courses }: { courses: AddCourse[] }) {
    const {
        courseCodeQuery,
        courseNameQuery,
        isCodeDropdownOpen,
        isNameDropdownOpen,
        filteredCoursesByCode,
        filteredCoursesByName,
        setCodeDropdownOpen,
        handleCourseCodeSelect,
        handleCourseNameSelect,
        handleCourseCodeChange,
        handleCourseNameChange,
        handleBlur,
    } = useCourseSelect(courses); // 使用钩子

    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
    const { selectedStatus, gpa, handleStatusChange, handleGpaChange } = useCourseStatus();


    return (
        <form action={addCourse}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Course Code Input */}
                <div className="mb-4">
                    <label htmlFor="course_code" className="mb-2 block text-sm font-medium">
                        Course Code
                    </label>
                    <div className="relative">
                        <input
                            id="course_code"
                            name="course_code"
                            type="text"
                            value={courseCodeQuery}
                            onChange={handleCourseCodeChange}
                            onFocus={() => setCodeDropdownOpen(true)} // 聚焦时打开下拉框
                            onBlur={() => handleBlur('code')} // 失去焦点时关闭下拉框
                            placeholder="Enter course code"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 "
                            aria-describedby="course-code-error"
                            autoComplete='off'
                        />
                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                    {isCodeDropdownOpen && filteredCoursesByCode.length > 0 && (
                        <ul className="absolute z-10 w-full border border-gray-200 bg-white mt-1 rounded-md max-h-48 overflow-y-auto">
                            {filteredCoursesByCode.map((course) => (
                                <li
                                    key={course.id}
                                    onClick={() => handleCourseCodeSelect(course)}
                                    className="cursor-pointer p-2 hover:bg-gray-100"
                                >
                                    {course.course_code} - {course.course_name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Course Name Input */}
                <div className="mb-4">
                    <label htmlFor="course_name" className="mb-2 block text-sm font-medium">
                        Course Name
                    </label>
                    <div className="relative">
                        <input
                            id="course_name"
                            name="course_name"
                            type="text"
                            value={courseNameQuery}
                            onChange={handleCourseNameChange}
                            onFocus={() => setCodeDropdownOpen(true)} // 聚焦时打开下拉框
                            onBlur={() => handleBlur('name')} // 失去焦点时关闭下拉框
                            placeholder="Enter course name"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            aria-describedby="course-name-error"
                            autoComplete='off'
                        />
                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                    {isNameDropdownOpen && filteredCoursesByName.length > 0 && (
                        <ul className="absolute z-10 w-full border border-gray-200 bg-white mt-1 rounded-md max-h-48 overflow-y-auto">
                            {filteredCoursesByName.map((course) => (
                                <li
                                    key={course.id}
                                    onClick={() => handleCourseNameSelect(course)}
                                    className="cursor-pointer p-2 hover:bg-gray-100"
                                >
                                    {course.course_code} - {course.course_name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Year and semester */}
                <div className="mb-4 flex gap-4">
            {/* Year Selection */}
            <div className="relative">
                <label htmlFor="year" className="mb-2 block text-sm font-medium">
                    Year
                </label>
                <select
                    id="year"
                    name="year"
                    value={selectedYear ?? ''}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                >
                    <option value="" disabled>Select Year</option>
                    {YEARS.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            {/* Semester Selection */}
            <div className="relative">
                <label htmlFor="semester" className="mb-2 block text-sm font-medium">
                    Semester
                </label>
                <select
                    id="semester"
                    name="semester"
                    value={selectedSemester ?? ''}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                >
                    <option value="" disabled>Select Semester</option>
                    {SEMESTERS.map((semester) => (
                        <option key={semester} value={semester}>
                            {semester}
                        </option>
                    ))}
                </select>
            </div>
                </div>
                {/* status */}
                <fieldset>
            <legend className="mb-2 block text-sm font-medium">
                Set course status
            </legend>
            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                <div className="flex gap-4">
            {/* upcoming Status */}
                <div className="flex items-center">
                    <input
                    id="upcoming"
                    name="status"
                    type="radio"
                    value="upcoming"
                    checked={selectedStatus === STATUS_UPCOMING}
                    onChange={handleStatusChange}
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    
                    />
                    <label
                    htmlFor="upcoming"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                    >
                    upcoming <ClockIcon className="h-4 w-4" />
                    </label>
                </div>
            {/* completed Status */}
                    <div className="flex items-center">
                    <input
                    id="completed"
                    name="status"
                    type="radio"
                    value="completed"
                    checked={selectedStatus === STATUS_COMPLETED}
                    onChange={handleStatusChange}
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    />
                    <label
                    htmlFor="completed"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                    >
                    Completed <CheckIcon className="h-4 w-4" />
                    </label>
                    </div>
                {/* GPA input  */}
                {selectedStatus === STATUS_COMPLETED && (
                    <div className="mt-3">
                    <input
                        id="gpa"
                        name="gpa"
                        type="number"
                        step="1.0"
                        onChange={handleGpaChange}
                        placeholder="Enter Your GPA"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                    />
                    </div>
                )}

                </div>
                </div>
                <div>
            </div>
                </fieldset>

            </div>

            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/calculator"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Create Course</Button>
            </div>
        </form>
    );
}
