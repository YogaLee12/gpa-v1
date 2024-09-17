import { CourseDetail } from "./definitions";


export async function gradePredict(
    course:CourseDetail[],
    targetGrade: number,
    examWeight: number,
    MinimumScore: number
) {
    const assignmentGrade = course.reduce((sum,courseInfo) => {return sum + courseInfo.grade;},0);
    const minEscore = examWeight * (MinimumScore * 0.01);
    console.log(minEscore)
    const predictExamGrade = targetGrade - assignmentGrade;

    const finalScore = minEscore > predictExamGrade ? minEscore : predictExamGrade;
    return finalScore
}