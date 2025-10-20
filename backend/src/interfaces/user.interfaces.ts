
// generations options - user questions choices
export interface iGenerationOptions {
   numQuestions: number;
   difficulty: 'basic' | 'intermediate' | 'advanced';
   questionType: 'open' | 'multipleChoice' | 'mix';
   language?: string;
};

// study material - user question text
export interface iStudyMaterial {
   title?: string;
   text: string;
   createdAt: String;
};

// user answer - user indivual questions response
export interface iUserAnswer {
   questionId: string;
   userResponse: string;
   isCorrect: boolean;
   feedback?: string;
};