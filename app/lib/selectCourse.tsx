import { useState, useMemo } from 'react';
import { AddCourse } from '@/app/lib/definitions';

// 钩子函数：处理课程选择逻辑
export function useCourseSelect(courses: AddCourse[]) {
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

    // 处理课程代码选择
    const handleCourseCodeSelect = (course: AddCourse) => {
        setCourseCodeQuery(course.course_code);
        setCourseNameQuery(course.course_name);
        setSelectedCourse(course);
        setCodeDropdownOpen(false);
    };

    // 处理课程名称选择
    const handleCourseNameSelect = (course: AddCourse) => {
        setCourseNameQuery(course.course_name);
        setCourseCodeQuery(course.course_code);
        setSelectedCourse(course);
        setNameDropdownOpen(false);
    };

    // 处理课程代码输入变化
    const handleCourseCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCourseCodeQuery(e.target.value);
        setSelectedCourse(null);
        setCodeDropdownOpen(true);
    };

    // 处理课程名称输入变化
    const handleCourseNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCourseNameQuery(e.target.value);
        setSelectedCourse(null);
        setNameDropdownOpen(true);
    };

    // 处理输入框失去焦点
    const handleBlur = (type: 'code' | 'name') => {
        setTimeout(() => {
            if (type === 'code') setCodeDropdownOpen(false);
            if (type === 'name') setNameDropdownOpen(false);
        }, 200);
    };

    return {
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
    };
}
