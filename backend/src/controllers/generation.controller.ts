
// imports
import { Request, Response } from "express";

// import interfaces
import { iGenerationOptions, iStudyMaterial } from "@interfaces/user.interfaces";
import { iApiResponse } from "@interfaces/apiResponse.interface";


// generation questions - class
class GenerationController {

   // question options - setup
   private questionOptions: iGenerationOptions = {
      numQuestions: 0,
      difficulty: 'basic',
      questionType: 'open',
      language: ''
   };

   private studyMaterial: iStudyMaterial = {
      title: '',
      text: '',
      createdAt: new Date().toISOString().split('T')[0]
   }


   // generation question - public



   // generation options - private
   private generationOptions(
      req: Request, 
      res: Response<iApiResponse>
   ): void {
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


   // generation material - private
   private generationMaterial(
      req: Request,
      res: Response<iApiResponse>
   ): void {
      // check fields sended
      const { title, text, createdAt } = req.body;
      if(!text || !createdAt){
         res.status(404).send({
            success: false,
            message: 'Bad request at fields sended'
         })
      }

      // material build
      if(!title) this.studyMaterial = { text, createdAt }
      else this.studyMaterial = { title, text, createdAt };
   };

};