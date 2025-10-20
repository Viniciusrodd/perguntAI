
// interfaces imports
import { iStudyMaterial, iGenerationOptions, iUserAnswer } from "@interfaces/user.interfaces";


// question - IA questions generation
export interface iQuestion {
   id: string;
   prompt: string;
   acceptableAnswers: string[]; // correct answers
   type: 'open' | 'multipleChoice';
   choices?: string[];
};


// questionsSet - questions list generates by IA
export interface iQuestionsSet {
   id: string;
   material: iStudyMaterial;
   options: iGenerationOptions;
   questions: iQuestion[];
   generatedAt: Date;
};


// exercise session - questions set + user answers 
export interface iExerciseSession {
   sessionId: string;
   questionSet: iQuestionsSet;
   answers: iUserAnswer[];
   currentIndex: number;
   finished: boolean;
};