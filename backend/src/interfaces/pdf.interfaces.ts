
// interfaces imports
import { iQuestionsSet } from "@interfaces/model.interfaces";
import { iUserAnswer } from "@interfaces/user.interfaces";


// evaluation interface - final avaliation
export interface iEvaluationResult {
   totalQuestions: number;
   correctAnswers: number;
   incorrectAnswers: number;
   accuracy: number; // (0-100)%
   generatedAt: String;
   questionSet: iQuestionsSet;
   userAnswers: iUserAnswer[];
};