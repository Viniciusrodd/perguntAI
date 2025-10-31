
import { createContext } from "react";


// questions context type
export type OptionsContextType = {
   numQuestions: number;
   setNumQuestions: (num: number) => void;
   difficulty: string;
   setDifficulty: (difficult: string) => void;
   questionType: string;
   setQuestionType: (type: string) => void;
   language: string;
   setLanguage: (lang: string) => void;
   text: string;
   setText: (text: string) => void;
};

// options context
export const OptionsContext = createContext<OptionsContextType>({
   numQuestions: 0,
   setNumQuestions: () => {},
   difficulty: '',
   setDifficulty: () => {},
   questionType: '',
   setQuestionType: () => {},
   language: '',
   setLanguage: () => {},
   text: '',
   setText: () => {}
});
