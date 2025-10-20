
// imports
import { Request, Response } from "express";

// import interfaces
import { iGenerationOptions } from "@interfaces/user.interfaces";
import { iApiResponse } from "@interfaces/apiResponse.interface";


// generation questions - class
class GenerationController {

   // question options - setup
   questionOptions: iGenerationOptions = {
      numQuestions: 0,
      difficulty: 'basic',
      questionType: 'open',
   };


   // generation options
   private async generationOptions(
      req: Request, 
      res: Response<iApiResponse>
   ): Promise<void> {
      // check fields sended
      const { numQuestions, difficulty, questionType, language } = req.body;
      if(!numQuestions || !difficulty || !questionType){
        res.status(404).send({
            success: false,
            message: 'Bad request at fields sended'
        }); 
      }

      // question options build
      if(!language) this.questionOptions = { numQuestions, difficulty, questionType }
      else this.questionOptions = { numQuestions, difficulty, questionType, language };
   };


   // generation question

};