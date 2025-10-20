
// interfaces imports
import { iQuestionsSet } from "./model.interfaces";
import { iUserAnswer } from "./user.interfaces";


// evaluation interface - final avaliation
interface iEvaluationResult {
   totalQuestions: number;
   correctAnswers: number;
   incorrectAnswers: number;
   accuracy: number; // (0-100)%
   generatedAt: Date;
   exerciseSet: iQuestionsSet;
   userAnswers: iUserAnswer[];
};