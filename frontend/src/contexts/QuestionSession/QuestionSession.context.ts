
// imports
import { createContext } from "react";

// import interfaces
import type { iQuestionsSet } from "../../../../shared/interfaces/model.interfaces";
import type { iUserAnswer } from "../../../../shared/interfaces/user.interfaces";


// question session type
export type QuestionSessionContextType = {
   // states
   sessionId: string;
   questionSet: iQuestionsSet;
   answers: iUserAnswer[];
   currentIndex: number;
   finished: boolean;

   // setters
   setSessionId: (id: string) => void;
   setQuestionSet: (questionSet: iQuestionsSet) => void;
   setAnswers: (answers: iUserAnswer[]) => void;
   setCurrentIndex: (index: number) => void;
   setFinished: (finished: boolean) => void;
};


// questions set values - for questions session context
const questionSetInitValues: iQuestionsSet = {
   // states
   id: '',
   material: {
      text: '',
      createdAt: ''
   },
   options: {
      numQuestions: 0,
      difficulty: 'basic',
      questionType: 'open',
      language: ''
   },
   questions: [],
   generatedAt: ''   
};


// questions session context
export const QuestionSessionContext = createContext<QuestionSessionContextType>({
   // states
   sessionId: '',
   questionSet: questionSetInitValues,
   answers: [],
   currentIndex: 0,
   finished: false,
   
   // setters
   setSessionId: () => {},
   setQuestionSet: () => {},
   setAnswers: () => {},
   setCurrentIndex: () => {},
   setFinished: () => {},
});