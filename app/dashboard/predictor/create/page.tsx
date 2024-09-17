import Form from '@/app/ui/predictor/create-form';
import { fetchCourse } from '@/app/lib/db/fetchData';
    
export default async function Page() {
    const course = await fetchCourse();
    
    return (
    <main>
        
        
        <Form courses={course} />
    </main>
    );
}