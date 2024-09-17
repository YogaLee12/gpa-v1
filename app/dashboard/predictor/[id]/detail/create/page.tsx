import Form from "@/app/ui/predictor/detail-form";
import { weightValid } from "@/app/lib/db/fetchData";

export default async function Page({
    params 
    }: { 
    params: { id: string } }
) {
    const eid = params.id
    const weightFlag = await weightValid(eid);
    
    
    const weightRange = 100 - weightFlag.rows.reduce((acc,row) => {return acc + row.weight},0);
    // console.log(eid)
    return (
        <main>
        <Form eid={eid} weightRange={weightRange}/>
    </main>
    );
}