
// import hooks
import { useState, type ReactNode } from "react";

// import options context
import { OptionsContext } from "./OptionsContext";


// props provider
type OptionsPropsProvider = {
   children: ReactNode
};

export type DifficultyType = 'basic' | 'intermediate' | 'advanced';
export type QuestionType = 'open' | 'multipleChoice' | 'mix';


// provider
export const OptionsProvider = ({ children }: OptionsPropsProvider) =>{
   // states
   const [ numQuestions, setNumQuestions ] = useState<number>(0);
   const [ difficulty, setDifficulty ] = useState<DifficultyType>('basic');
   const [ questionType, setQuestionType ] = useState<QuestionType>('open');
   const [ language, setLanguage ] = useState<string>('');
   const [ text, setText ] = useState<string>('');

   return(
      <OptionsContext.Provider value={{ 
         numQuestions, setNumQuestions,
         difficulty, setDifficulty,
         questionType, setQuestionType,
         language, setLanguage,
         text, setText
      }}>
         { children }
      </OptionsContext.Provider>
   );
};