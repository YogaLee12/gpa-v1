
import LatestEnrollment from '@/app/ui/dashboard/latest-enrollments';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestEnrollments } from '@/app/lib/data';
import { sth } from '@/app/lib/fetchUserName';

export default async function Page(){
    const LatestEnrollments = await fetchLatestEnrollments();
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
            Welcom  {sth?.user?.name} !
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
            <LatestEnrollment latestEnrollments={LatestEnrollments} />
            </div>
        </main>
        );
}