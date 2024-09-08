import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { fetchEnrolledCourse } from '@/app/lib/data';

export default async function CourseStatus({ 
    status 
    }: { 
    status: string,
    }) {
    return (
        <span
        className={clsx(
            'inline-flex items-center rounded-full px-2 py-1 text-xs',
            {
            'bg-gray-100 text-gray-500': status === 'upcoming',
            'bg-green-500 text-white': status === 'completed',
            },
        )}
        >
        {status === 'upcoming' ? (
            <>
            upcoming
            <ClockIcon className="ml-1 w-4 text-gray-500" />
            </>
        ) : null}
        {status === 'completed' ? (
            <>
            completed
            <CheckIcon className="ml-1 w-4 text-white" />
            </>
        ) : null}
        </span>
    );
}