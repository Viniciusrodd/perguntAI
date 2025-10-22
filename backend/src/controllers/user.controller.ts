
// imports
import { v4 as uuid } from 'uuid';
import { Request, Response } from "express";

// import interfaces
import { iUserAnswer } from "@interfaces/user.interfaces";
import { iApiResponse } from "@interfaces/apiResponse.interface";
import { iQuestionSession } from '@interfaces/model.interfaces';

// import services
import { modelService } from "@root/services/model.service";


// user controller - class
export class UserController {

   // user answer - setup
   private userAnswer: iUserAnswer = {
      questionId: '0',
      userResponse: '',
      isCorrect: false,
      feedback: ''
   };

   
   // answer to model interaction - public
   public async answerGeneration(
      req: Request,
      res: Response<iApiResponse>
   ): Promise<Response> {
      // validation the requests
      const { 
         questionId, 
         userResponse,
         questionSession
      } = req.body;
      if(!questionId || !userResponse || !questionSession){
         return res.status(404).send({
            success: false,
            message: '❌ Bad request at fields sended'
         }); 
      }

      // call ollama request service...

   };

};