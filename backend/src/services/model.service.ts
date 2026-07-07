
// imports
import axios from "axios";

// import interfaces
import { iUserAnswer, iGenerationOptions, iStudyMaterial } from "@interfaces/user.interfaces";
import { iQuestion, iQuestionsSet, iQuestionSession } from "@interfaces/model.interfaces";
import { iUserResponse } from "@interfaces/userController.interfaces";

// import error handler
import { getErrorMessage } from "@root/utils/errorHandler";

// import utils
import { prompt_question, prompt_answer } from "@utils/prompts";

// import env
import dotenv from 'dotenv';
dotenv.config({});



// model service - class
class ModelService {
   getErrorMessage = getErrorMessage;

   // ollama question request - public
   public async ollamaQuestionRequest(
      questionOptions: iGenerationOptions,
      studyMaterial: iStudyMaterial 
   ): Promise<iQuestion[]> {
      try{
         // validations
         if(questionOptions.numQuestions <= 0) throw new Error('❌ Questions is empty');
         if(studyMaterial.text === '') throw new Error('❌ Text material is empty');

         // prompt generation
         const prompt: string = prompt_question(questionOptions, studyMaterial);

         // get model response
         const llm_response = await axios.post(
            process.env.AMBIENCE === 'dev' ? process.env.OLLAMA_URL_DEV as string : process.env.OLLAMA_URL_PRODUCTION as string, 
         {
            'model': process.env.AMBIENCE === 'dev' ? 'mistral' : 'mistral:7b-instruct-q4_0',
            'prompt': prompt,
            'stream': false
         });
         const result = typeof llm_response.data === 'string' 
         ? llm_response.data
         : llm_response.data.response;

         // clean result
         const clean = result.trim();

         // convert clean result to object
         const parsedResult: iQuestion[] = JSON.parse(clean);
         return parsedResult;
      }
      catch(error: unknown){
         console.error('Ollama question request service internal error', this.getErrorMessage(error));
         return [];
      }
   };

   
   // ollama user response request - public
   public async ollamaAnswerRequest(
      userResponses: iUserResponse[],
      questionSession: iQuestionSession

   ): Promise<iUserAnswer[]> {
      try{
         // validations
         if(userResponses.length == 0) throw new Error('❌ User response is empty');
         if(questionSession.finished === true) throw new Error('❌ Question session already finished');

         // split (questions ids) and (questions responses)
         const questionIds = userResponses.map(r => r.questionId);
         const responses = userResponses.map(r => r.userResponse);

         // prompt generation
         const prompt: string = prompt_answer(
            questionIds, 
            responses, 
            questionSession
         );

         // get model response
         const llm_response = await axios.post(
            process.env.AMBIENCE === 'dev' ? process.env.OLLAMA_URL_DEV as string : process.env.OLLAMA_URL_PRODUCTION as string, 
         {
            'model': process.env.AMBIENCE === 'dev' ? 'mistral' : 'mistral:7b-instruct-q4_0',
            'prompt': prompt,
            'stream': false
         });
         const result = typeof llm_response.data === 'string' 
         ? llm_response.data
         : llm_response.data.response;

         // clean result
         const clean = result.trim();

         // convert clean result to object
         const parsedResult: iUserAnswer[] = JSON.parse(clean);
         return parsedResult;
      }
      catch(error: unknown){
         console.error('Ollama answer service internal error', this.getErrorMessage(error));
         throw new Error(`Ollama answer service internal error: ${this.getErrorMessage(error)}`);
      }
   };

};
export const modelService: ModelService = new ModelService();