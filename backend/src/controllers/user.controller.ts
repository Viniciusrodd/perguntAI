
// imports
import { Request, Response } from "express";

// import interfaces
import { iUserAnswer } from "@interfaces/user.interfaces";
import { iApiResponse } from "@interfaces/apiResponse.interface";
import { iQuestionSession } from "@interfaces/model.interfaces";
import { iEvaluationResult } from "@interfaces/pdf.interfaces";
import { iAnswerGenerationReqBody } from '@interfaces/userController.interfaces';

// import services
import { modelService } from "@root/services/model.service";
import { pdfService } from "@root/services/pdf.service";


// user controller - class
class UserController {
   
   // answer to model interaction - public
   public async answersGeneration(
      req: Request<{}, {}, iAnswerGenerationReqBody>,
      res: Response<iApiResponse>
   ): Promise<Response> {
      // validation the requests
      const { 
         userResponses, // iUserResponse[]
         questionSession, // iQuestionSession
      } = req.body;

      if(!userResponses || userResponses.length == 0 || !questionSession){
         return res.status(404).send({
            success: false,
            message: '❌ Bad request at fields sended'
         }); 
      }

      // call ollama request service...
      const userAnswer: iUserAnswer[] = await modelService.ollamaAnswerRequest(
         userResponses, 
         questionSession
      );

      // set finished question session
      const finishQuestionSession: iQuestionSession = {
         sessionId: questionSession.sessionId,
         questionSet: questionSession.questionSet,
         answers: userAnswer,
         currentIndex: questionSession.currentIndex,
         finished: true
      };

      // call session finish
      const evaluationResult: iEvaluationResult = await this.sessionFinish(finishQuestionSession);

      return res.status(200).send({
         success: true,
         message: '✔️ Evaluation result successfully generated',
         data: evaluationResult
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

      try {
         const filepath = await pdfService.evaluationResultGeneration(evaluationResult);
         console.log('✔️ PDF success generation in: ', filepath);
         evaluationResult.pdfPath = filepath; // add pdfPath property
      } catch (error) {
         console.log('❌ PDF generation error: ', error);
      }

      // return evaluation result set
      return evaluationResult;
   };

};
export const userController: UserController = new UserController();