
// imports
import { Request, Response } from "express";

// import interfaces
import { iUserAnswer } from "@interfaces/user.interfaces";
import { iApiResponse } from "@interfaces/apiResponse.interface";

// import services
import { modelService } from "@root/services/model.service";


// user controller - class
class UserController {
   
   // answer to model interaction - public
   public async answerGeneration(
      req: Request,
      res: Response<iApiResponse>
   ): Promise<Response> {
      // validation the requests
      const { 
         userResponse,
         questionSession
      } = req.body;
      const { questionId } = req.params;

      if(!questionId || !userResponse || !questionSession){
         return res.status(404).send({
            success: false,
            message: '❌ Bad request at fields sended'
         }); 
      }

      // call ollama request service...
      const userAnswer: iUserAnswer = await modelService.ollamaAnswerRequest(
         questionId, 
         userResponse, 
         questionSession
      );

      // set user answer
      const userAnswerSet: iUserAnswer = {
         questionId: userAnswer.questionId,
         userResponse: userAnswer.userResponse,
         isCorrect: userAnswer.isCorrect,
         feedback: userAnswer.feedback
      };

      return res.status(200).send({
         success: true,
         message: '✅ Questions generated successfully',
         data: userAnswerSet
      });
   };

};
export const userController: UserController = new UserController();