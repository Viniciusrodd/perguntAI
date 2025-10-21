
// imports
import { v4 as uuid } from 'uuid';
import { Request, Response } from "express";

// import interfaces
import { iGenerationOptions, iStudyMaterial } from "@interfaces/user.interfaces";
import { iApiResponse } from "@interfaces/apiResponse.interface";
import { iQuestion, iQuestionsSet } from "@interfaces/model.interfaces";

// import services
import { modelService } from "@root/services/model.service";


// generation questions - class
export class GenerationController {

   // question options - setup
   private questionOptions: iGenerationOptions = {
      numQuestions: 0,
      difficulty: 'basic',
      questionType: 'open',
      language: 'português'
   };

   private studyMaterial: iStudyMaterial = {
      text: '',
      createdAt: new Date().toISOString().split('T')[0]
   }

   
   // generation question - public
   public async questionGeneration(
      req: Request, 
      res: Response<iApiResponse>
   ): Promise<Response> {
      // call private building methods...
      await this.generationOptions(req, res);
      await this.generationMaterial(req, res);

      // call ollama request service with question set
      const questions: iQuestion[] = await modelService.ollamaRequest(
         this.questionOptions, 
         this.studyMaterial
      );

      // final questions set
      const questionSet: iQuestionsSet = {
         id: uuid(),
         material: this.studyMaterial,
         options: this.questionOptions,
         questions,
         generatedAt: new Date().toISOString().split('T')[0]
      }

      return res.status(200).send({
         success: true,
         message: '✅ Questions generated successfully',
         data: questionSet
      });
   };


   // generation options - private
   private async generationOptions(
      req: Request, 
      res: Response<iApiResponse>
   ): Promise<void | Response> {
      // check fields sended
      const { numQuestions, difficulty, questionType, language } = req.body;
      const num = Number(numQuestions); // number convert
      if(!num || !difficulty || !questionType){
         return res.status(404).send({
            success: false,
            message: '❌ Bad request at fields sended'
         }); 
      }

      // question options build
      if(!language) this.questionOptions = { numQuestions: num, difficulty, questionType }
      else this.questionOptions = { numQuestions: num, difficulty, questionType, language };
   };


   // generation material - private
   private async generationMaterial(
      req: Request,
      res: Response<iApiResponse>
   ): Promise<void | Response> {
      // check fields sended
      const { text } = req.body;
      if(!text){
         return res.status(404).send({
            success: false,
            message: '❌ Bad request at fields sended'
         })
      }

      // material build
      this.studyMaterial = { text }
   };

};
export const generationController: GenerationController = new GenerationController();