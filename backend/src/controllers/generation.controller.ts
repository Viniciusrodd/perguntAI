
// imports
import { Request, Response } from "express";

// import interfaces
import { iGenerationOptions, iStudyMaterial } from "@interfaces/user.interfaces";
import { iApiResponse } from "@interfaces/apiResponse.interface";

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
   public async questionGeneration(req: Request, res: Response): Promise<void> {
      // call private building methods...
      await this.generationOptions(req, res);
      await this.generationMaterial(req, res);

      // call ollama request service with question set
      await modelService.ollamaRequest(
         this.questionOptions, 
         this.studyMaterial
      );
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