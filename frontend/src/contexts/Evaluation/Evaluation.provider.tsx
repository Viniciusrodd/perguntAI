
// import hooks
import { useState, type ReactNode } from "react";

// import evaluation context
import { EvaluationContext } from "./Evaluation.context";

// types
type EvaluationPropsProvider = {
   children: ReactNode
};


// provider
export const EvaluationProvider = ({ children }: EvaluationPropsProvider) =>{
   // states
   const [ totalQuestions, setTotalQuestions ] = useState<number>(0);
   const [ correctAnswers, setCorrectAnswers ] = useState<number>(0);
   const [ incorrectAnswers, setIncorrectAnswers ] = useState<number>(0);
   const [ accuracy, setAccuracy ] = useState<number>(0);
   const [ PDFPath, setPDFPath ] = useState<string>('');

   return(
      <EvaluationContext.Provider value={{
         totalQuestions, setTotalQuestions,
         correctAnswers, setCorrectAnswers,
         incorrectAnswers, setIncorrectAnswers,
         accuracy, setAccuracy,
         PDFPath, setPDFPath
      }}>
         { children }
      </EvaluationContext.Provider>
   );
};