
// interfaces imports
import type { 
   iStudyMaterial, iGenerationOptions, iUserAnswer 
} from "./user.interfaces";


// question - IA questions generation
export interface iQuestion {
   id: string;
   prompt: string;
   acceptableAnswers: string[]; // correct answers
   type: 'open' | 'multipleChoice' | 'mix';
   choices?: string[];
}


// questionsSet - questions list generates by IA
export interface iQuestionsSet {
   id: string;
   material: iStudyMaterial;
   options: iGenerationOptions;
   questions: iQuestion[];
   generatedAt: String;
}


// exercise session - questions set + user answers 
export interface iQuestionSession {
   sessionId: string;
   questionSet: iQuestionsSet;
   answers: iUserAnswer[];
   currentIndex: number;
   finished: boolean;
}