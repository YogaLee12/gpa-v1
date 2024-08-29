import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function Logo() {
    return (
        <div className={`${lusitana.className} flex flex-row items-center leading-none text-white`} >

            <AcademicCapIcon className="h-12 w-12 rotate-[15deg]" />

        <p className="text-[44px] ml-[3rem]">GPA Hero</p>
        </div>
    );
}

export function DashboardLogo() {
    return (
        <div className={`${lusitana.className} flex flex-row items-center leading-none text-white`} >

        <p className="text-[44px] ml-[3rem]">GPA Hero</p>
        </div>
    );
}
