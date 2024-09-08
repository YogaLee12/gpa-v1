'use client';

import { AddCourse } from '@/app/lib/definitions';
import Link from 'next/link';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useState, useMemo, useActionState } from 'react';
import { addCourse,State } from '@/app/lib/actions';


export default function Form({ courses }: { courses: AddCourse[] }) {
    const [courseCodeQuery, setCourseCodeQuery] = useState(''); // 用户输入的课程代码
    const [courseNameQuery, setCourseNameQuery] = useState(''); // 用户输入的课程名称
    const [isCodeDropdownOpen, setCodeDropdownOpen] = useState(false); // 控制课程代码下拉选项的显示
    const [isNameDropdownOpen, setNameDropdownOpen] = useState(false); // 控制课程名称下拉选项的显示
    const [selectedCourse, setSelectedCourse] = useState<AddCourse | null>(null); // 选中的课程

    // 根据课程代码过滤课程列表
    const filteredCoursesByCode = useMemo(() => {
        return courses.filter((course) =>
            course.course_code.toLowerCase().includes(courseCodeQuery.toLowerCase())
        );
    }, [courseCodeQuery, courses]);

    // 根据课程名称过滤课程列表
    const filteredCoursesByName = useMemo(() => {
        return courses.filter((course) =>
            course.course_name.toLowerCase().includes(courseNameQuery.toLowerCase())
        );
    }, [courseNameQuery, courses]);

    // 当选择课程代码下拉框项时
    const handleCourseCodeSelect = (course: AddCourse) => {
        setCourseCodeQuery(course.course_code); // 设置课程代码
        setCourseNameQuery(course.course_name); // 设置课程名称
        setSelectedCourse(course); // 记录选中的课程
        setCodeDropdownOpen(false); // 关闭课程代码下拉框
    };

    // 当选择课程名称下拉框项时
    const handleCourseNameSelect = (course: AddCourse) => {
        setCourseNameQuery(course.course_name); // 设置课程名称
        setCourseCodeQuery(course.course_code); // 设置课程代码
        setSelectedCourse(course); // 记录选中的课程
        setNameDropdownOpen(false); // 关闭课程名称下拉框
    };

    // 处理课程代码输入变化
    const handleCourseCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCourseCodeQuery(e.target.value); // 更新课程代码输入框
        setSelectedCourse(null); // 清除已选课程
        setCodeDropdownOpen(true); // 打开课程代码下拉框
    };

    // 处理课程名称输入变化
    const handleCourseNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCourseNameQuery(e.target.value); // 更新课程名称输入框
        setSelectedCourse(null); // 清除已选课程
        setNameDropdownOpen(true); // 打开课程名称下拉框
    };

    // 处理失去焦点
    const handleBlur = (type: 'code' | 'name') => {
        setTimeout(() => {
            if (type === 'code') setCodeDropdownOpen(false);
            if (type === 'name') setNameDropdownOpen(false);
        }, 200);
    };


    

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
                            id='course_code'
                            name='course_code'
                            type="text"
                            value={courseCodeQuery}
                            onChange={handleCourseCodeChange}
                            onFocus={() => setCodeDropdownOpen(true)} // 聚焦时打开下拉框
                            onBlur={() => handleBlur('code')} // 失去焦点时关闭下拉框
                            placeholder="Enter course code"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            aria-describedby="course-code-error"
                        />
                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        
                    </div>
                    {/* 显示课程代码下拉建议 */}
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
                            id='course_name'
                            name='course_name'
                            type="text"
                            value={courseNameQuery}
                            onChange={handleCourseNameChange}
                            onFocus={() => setNameDropdownOpen(true)} // 聚焦时打开下拉框
                            onBlur={() => handleBlur('name')} // 失去焦点时关闭下拉框
                            placeholder="Enter course name"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            aria-describedby="course-name-error"
                        />
                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        
                    </div>
                    {/* 显示课程名称下拉建议 */}
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

                <div id="course-error" aria-live="polite" aria-atomic="true">
                <div aria-live="polite" aria-atomic="true">
                
            </div>
                </div>
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
