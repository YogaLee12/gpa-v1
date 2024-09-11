import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default async function CourseStatus({ 
    status 
    }: { 
    status: string,
    }) {
        console.log(status)
    return (
        <span
        className={clsx(
            'inline-flex items-center rounded-full px-2 py-1 text-xs',
            {
            'bg-gray-100 text-gray-500': status === 'upcoming',
            'bg-green-500 text-white': status !== 'upcoming',
            },
        )}
        >
        {status === 'upcoming' ? (
            <>
            upcoming
            <ClockIcon className="ml-1 w-4 text-gray-500" />
            </>
        ) : null}
        {status !== 'upcoming' ? (
            <>
            {status.toString() }{<CheckIcon className="ml-1 w-4 text-white" />}
            </>
        ) : null}
        </span>
    );
}