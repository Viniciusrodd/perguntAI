
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

   return(
      <EvaluationContext.Provider value={{
         totalQuestions, setTotalQuestions,
         correctAnswers, setCorrectAnswers,
         incorrectAnswers, setIncorrectAnswers,
         accuracy, setAccuracy
      }}>
         { children }
      </EvaluationContext.Provider>
   );
};