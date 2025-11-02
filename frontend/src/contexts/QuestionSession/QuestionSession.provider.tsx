
// import hooks
import { useState, type ReactNode } from "react";

// import question session context
import { QuestionSessionContext } from './QuestionSession.context';

// import interfaces
import type { iQuestionsSet } from "../../../../shared/interfaces/model.interfaces";
import type { iUserAnswer } from "../../../../shared/interfaces/user.interfaces";

// types
type QuestionSessionPropsProvider = {
   children: ReactNode
};


// provider
export const QuestionSessionProvider = ({ children }: QuestionSessionPropsProvider) =>{
   // states
   const [ sessionId, setSessionId ] = useState<string>('');
   const [ questionSet, setQuestionSet ] = useState<iQuestionsSet>({} as iQuestionsSet);
   const [ answers, setAnswers ] = useState<iUserAnswer[]>([]);
   const [ currentIndex, setCurrentIndex ] = useState<number>(0);
   const [ finished, setFinished ] = useState<boolean>(false);

   return (
      <QuestionSessionContext.Provider value={{ 
         sessionId, setSessionId,
         questionSet, setQuestionSet,
         answers, setAnswers,
         currentIndex, setCurrentIndex,
         finished, setFinished
      }}>
         { children }
      </QuestionSessionContext.Provider>
   );
};