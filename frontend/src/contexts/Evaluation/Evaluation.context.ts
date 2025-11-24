
// imports
import { createContext } from "react";


// evaluation context type
export type EvaluationContextType = {
   // states
   totalQuestions: number;
   correctAnswers: number;
   incorrectAnswers: number;
   accuracy: number; // (0-100)%

   // setters
   setTotalQuestions: (num: number) => void;
   setCorrectAnswers: (correct: number) => void;
   setIncorrectAnswers: (incorrect: number) => void;
   setAccuracy: (accuracy: number) => void;
};


// evaluation context
export const EvaluationContext = createContext<EvaluationContextType>({
   // states
   totalQuestions: 0,
   correctAnswers: 0,
   incorrectAnswers: 0,
   accuracy: 0, // (0-100)%

   // setters
   setTotalQuestions: () => {},
   setCorrectAnswers: () => {},
   setIncorrectAnswers: () => {},
   setAccuracy: () => {}
});