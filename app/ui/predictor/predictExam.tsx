'use client'
import { CourseDetail } from "@/app/lib/definitions";
import { gradePredict } from '@/app/lib/gradePredict';

export function ExamPredict({ courseDetails }: { courseDetails: CourseDetail[] }) {
    
    const weightRange = 100 - courseDetails.reduce((sum,courseInfo) => {return sum + Number.parseFloat(courseInfo.weight);},0)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
    // use FormData get value from the form.
        const formData = new FormData(e.currentTarget);
        const targetGrade = parseFloat(formData.get('targetGrade') as string);
        const examWeight = parseFloat(formData.get('examWeight') as string);
        const MinimumScore = parseFloat(formData.get('MinimumScore') as string);

        if (isNaN(targetGrade) || isNaN(examWeight) || examWeight <= 0){
            alert('Invalid input value');
            return;
        }
        try {
            const result = await gradePredict(courseDetails,targetGrade,examWeight,MinimumScore);
            console.log(result)
            alert(`Required Exam Grade: ${result}`);
        } catch (error) {
            console.error('Error calculating exam grade:', error);
            alert('An error occurred while calculationg the required exam grade.')
        }
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit}
            className="mt-4 space-y-4">
                <div>
                    <label htmlFor="targetGrade" className="block text-sm font-medium">
                        Target Grade
                    </label>
                    <input
                        id="targetGrade"
                        name="targetGrade"
                        type="number"
                        step="0.1"
                        className="block w-full rounded-md border-gray-300 p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="examWeight" className="block text-sm font-medium">
                        Exam Weight
                    </label>
                    <input
                        id="examWeight"
                        name="examWeight"
                        type="number"
                        step="0.1"
                        className="block w-full rounded-md border-gray-300 p-2"
                        placeholder={`Enter Exam Weight form 1 to ${weightRange}`}
                        max={weightRange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="examWeight" className="block text-sm font-medium">
                    Minimum passing score(%)
                    </label>
                    <input
                        id="MinimumScore"
                        name="MinimumScore"
                        type="number"
                        step="0.01"
                        placeholder="Enter minimun required as percentage"
                        className="block w-full rounded-md border-gray-300 p-2"
                        required
                    />
                </div>
                <button type="submit" className="rounded-md bg-blue-600 text-white p-2 hover:bg-blue-700">
                    Calculate Required Exam Grade
                </button>

            </form>
        </div>
    );
}
