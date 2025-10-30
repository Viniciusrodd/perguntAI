
// interfaces imports
import { iQuestionsSet } from "./model.interfaces";
import { iUserAnswer } from "./user.interfaces";


// evaluation interface - final avaliation
export interface iEvaluationResult {
   totalQuestions: number;
   correctAnswers: number;
   incorrectAnswers: number;
   accuracy: number; // (0-100)%
   generatedAt: string | number | Date;
   questionSet: iQuestionsSet;
   userAnswers: iUserAnswer[];
};