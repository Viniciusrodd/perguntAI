
// imports
import { createContext } from "react";

// types
export type DifficultyType = 'basic' | 'intermediate' | 'advanced';
export type QuestionType = 'open' | 'multipleChoice' | 'mix';


// questions context type
export type OptionsContextType = {
   // states
   numQuestions: number;
   difficulty: DifficultyType;
   questionType: QuestionType;
   language: string;
   text: string;
   
   // setters
   setNumQuestions: (num: number) => void;
   setDifficulty: (difficult: DifficultyType) => void;
   setQuestionType: (type: QuestionType) => void;
   setLanguage: (lang: string) => void;
   setText: (text: string) => void;
};


// options context
export const OptionsContext = createContext<OptionsContextType>({
   // states
   numQuestions: 0,
   difficulty: 'basic',
   questionType: 'open',
   language: '',
   text: '',

   // setters
   setNumQuestions: () => {},
   setDifficulty: () => {},
   setQuestionType: () => {},
   setLanguage: () => {},
   setText: () => {}
});