
// import hooks
import { useState, type ReactNode } from "react";

// import options context
import { OptionsContext } from "./OptionsContext";


// props provider
type OptionsPropsProvider = {
   children: ReactNode
};


// provider
export const OptionsProvider = ({ children }: OptionsPropsProvider) =>{
   // states
   const [ numQuestions, setNumQuestions ] = useState<number>(0);
   const [ difficulty, setDifficulty ] = useState<string>('');
   const [ questionType, setQuestionType ] = useState<string>('');
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