import { useState } from 'react';

export const SEMESTERS = ['1', '2', 'summer'];

export const CURRENT_YEAR = new Date().getFullYear();

export const YEARS = Array.from({ length: 30 }, (_, i) => CURRENT_YEAR - i);


export function useCourseStatus() {
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [gpa, setGpa] = useState('');
    
        const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSelectedStatus(prevStatus => (prevStatus === value ? null : value));
        };
    
        const handleGpaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGpa(e.target.value);
        };
    
        return {
        selectedStatus,
        gpa,
        handleStatusChange,
        handleGpaChange,
    };
}
    
  // 状态常量
    export const STATUS_COMPLETED = 'completed';
    export const STATUS_UPCOMING = 'upcoming';