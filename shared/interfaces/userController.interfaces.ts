
// imports
import type { iQuestionSession } from './model.interfaces';

// user response
export interface iUserResponse {
   questionId: string;
   userResponse: string
};

// Answer Generation Request Body
export interface iAnswerGenerationReqBody {
   userResponses: iUserResponse[];
   questionSession: iQuestionSession;
}
