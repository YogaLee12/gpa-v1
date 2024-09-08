import Form from '@/app/ui/calculator/create-form';
import { fetchCourse } from '@/app/lib/data';
    
export default async function Page() {
    const course = await fetchCourse();
    
    return (
    <main>
        
        
        <Form courses={course} />
    </main>
    );
}