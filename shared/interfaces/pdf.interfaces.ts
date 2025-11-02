
// interfaces imports
import type { iQuestionsSet } from "./model.interfaces";
import type { iUserAnswer } from "./user.interfaces";


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