
// imports
import { Request, Response } from "express";

// import interfaces
import { iUserAnswer } from "@interfaces/user.interfaces";
import { iApiResponse } from "@interfaces/apiResponse.interface";
import { iQuestionSession } from "@interfaces/model.interfaces";
import { iEvaluationResult } from "@interfaces/pdf.interfaces";

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

      // finished session check
      if(questionSession.finished === true){
         const evaluationResult: iEvaluationResult = await this.sessionFinish(questionSession);

         return res.status(200).send({
            success: true,
            message: '✅ Evaluation result successfully generated',
            data: evaluationResult
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
         message: '✅ Answer generated successfully',
         data: userAnswerSet
      });
   };


   // session finished - private
   private async sessionFinish(
      questionSession: iQuestionSession
   ): Promise<iEvaluationResult> {
      // utils
      const totalQuestions = questionSession.questionSet.questions.length;
      const correctAnswers = questionSession.answers.filter(r => r.isCorrect === true).length;
      const incorrectAnswers = questionSession.answers.filter(r => r.isCorrect === false).length;
      const accuracy = totalQuestions > 0
         ? Math.round((correctAnswers / totalQuestions) * 100)
         : 0;

      // evaluation result set
      const evaluationResult: iEvaluationResult = {
         totalQuestions: totalQuestions,
         correctAnswers: correctAnswers,
         incorrectAnswers: incorrectAnswers,
         accuracy: accuracy,
         generatedAt: new Date().toISOString().split('T')[0],
         questionSet: questionSession.questionSet,
         userAnswers: questionSession.answers
      };
      return evaluationResult;
   };

};
export const userController: UserController = new UserController();