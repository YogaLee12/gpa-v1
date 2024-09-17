import { calculGPA} from "./definitions";


export async function calculatingGPA(courseDetail:calculGPA[]) {
    const totalGrade = courseDetail.reduce((acc, course) => acc + (course.gpa_point * course.unit),0)
    
    const totalUnits = courseDetail.reduce((acc,course) => acc + course.unit,0);
    if (totalUnits ===0 ){
        return 0;
    }
    console.log(9/4)
    const gpa = totalGrade/totalUnits;

    return gpa.toFixed(5);
}