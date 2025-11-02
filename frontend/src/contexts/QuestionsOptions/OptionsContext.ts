
import { createContext } from "react";


// types
export type DifficultyType = 'basic' | 'intermediate' | 'advanced';
export type QuestionType = 'open' | 'multipleChoice' | 'mix';


// questions context type
export type OptionsContextType = {
   numQuestions: number;
   setNumQuestions: (num: number) => void;
   difficulty: DifficultyType;
   setDifficulty: (difficult: DifficultyType) => void;
   questionType: QuestionType;
   setQuestionType: (type: QuestionType) => void;
   language: string;
   setLanguage: (lang: string) => void;
   text: string;
   setText: (text: string) => void;
};

// options context
export const OptionsContext = createContext<OptionsContextType>({
   numQuestions: 0,
   setNumQuestions: () => {},
   difficulty: 'basic',
   setDifficulty: () => {},
   questionType: 'open',
   setQuestionType: () => {},
   language: '',
   setLanguage: () => {},
   text: '',
   setText: () => {}
});
