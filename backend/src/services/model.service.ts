
// imports
import axios from "axios";

// import interfaces
import { iUserAnswer, iGenerationOptions, iStudyMaterial } from "@interfaces/user.interfaces";
import { iQuestion, iQuestionsSet, iQuestionSession } from "@interfaces/model.interfaces";

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
         const llm_response = await axios.post(process.env.OLLAMA_URL as string, {
            'model': 'mistral',
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
      questionId: string, 
      userResponse: string,
      questionSession: iQuestionSession

   ): Promise<iUserAnswer> {
      try{
         // validations
         if(questionId === '') throw new Error('❌ Question id is empty');
         if(userResponse === '') throw new Error('❌ User response is empty');
         if(questionSession.finished === true) throw new Error('❌ Question session already finished');

         // prompt generation
         const prompt: string = prompt_answer(questionId, userResponse, questionSession);

         // get model response
         const llm_response = await axios.post(process.env.OLLAMA_URL as string, {
            'model': 'mistral',
            'prompt': prompt,
            'stream': false
         });
         const result = typeof llm_response.data === 'string' 
         ? llm_response.data
         : llm_response.data.response;

         // clean result
         const clean = result.trim();

         // convert clean result to object
         const parsedResult: iUserAnswer = JSON.parse(clean);
         return parsedResult;
      }
      catch(error: unknown){
         console.error('Ollama answer service internal error', this.getErrorMessage(error));
         throw new Error(`Ollama answer service internal error: ${this.getErrorMessage(error)}`);
      }
   };

};
export const modelService: ModelService = new ModelService();