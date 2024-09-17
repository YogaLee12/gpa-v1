'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { addAssignment,State } from '@/app/lib/actions';

export default  function Form(
    {eid,
    weightRange
} : {
    eid:string,
    weightRange:number
}) {
    // const initialState: State = { message: null, errors: {} };  
    // const [state, formAction] = useActionState(addAssignment, initialState);
    return (
        <form action={addAssignment}>
        <input type="hidden" name="eid" value={eid} />
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
            {/* Assignment Name */}
            <div className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                Assignment Name
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                <input
                    id="assignmentName"
                    name="assignmentName"
                    type="string"
                    placeholder="Enter Assignment Name"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500  "
                    autoComplete='off'
                    
                />
                </div>
            </div>
                
            </div>
            

            {/* Grade box */}
            <div className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                grade
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                <input
                    id="grade"
                    name="grade"
                    type="number"
                    step="0.1"
                    placeholder="Enter Assignment grade"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 "
                    autoComplete='off'
                    
                />
                </div>
            </div>
            </div>
            

            {/* Assignment weight */}
            <div className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                Weight
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                <input
                    id="weight"
                    name="weight"
                    type="number"
                    step="0.1"
                    placeholder={`Enter Assignment Weight form 1 to ${weightRange}`}
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 "
                    autoComplete='off'
                    max={weightRange}
                />
                </div>
            </div>
                
            </div>
            
            

        </div>
        
        <div className="mt-6 flex justify-end gap-4">
            <Link
            href=
            {`/dashboard/predictor/${eid}/detail`}
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
            Cancel
            </Link>
            <Button type="submit">Save</Button>
        </div>
        </form>
    );
}