

// imports
import axios from "axios";

// import interfaces
import type { 
   iGenerationOptions, iStudyMaterial 
} from './../../../shared/interfaces/user.interfaces';
import type { iQuestionSession } from './../../../shared/interfaces/model.interfaces';
import type { 
   iAnswerGenerationReqBody 
} from "../../../shared/interfaces/userController.interfaces";
import type { iEvaluationResult } from './../../../shared/interfaces/pdf.interfaces';


// question frontend service
class QuestionService {

   // questions request
   public async questionGeneration(
      options: iGenerationOptions,
      material: iStudyMaterial
   ): Promise<iQuestionSession>{
      const payload = {
         numQuestions: options.numQuestions,
         difficulty: options.difficulty,
         questionType: options.questionType,
         language: options.language ?? '',
         text: material.text
      };

      const res = await axios.post('http://localhost:5111/questions', payload);
      return res.data.data;      
   };


   // answer generation request
   public async answersGeneration(
      answers: iAnswerGenerationReqBody
   ): Promise<iEvaluationResult>{
      const res = await axios.post('http://localhost:5111/answers', answers);
      return res.data.data;
   };

};

export const questionService = new QuestionService(); 