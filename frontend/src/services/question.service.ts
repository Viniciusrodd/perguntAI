

// imports
import axios from "axios";

// import interfaces
import type { 
   iGenerationOptions, iStudyMaterial 
} from './../../../shared/interfaces/user.interfaces';
import type { iQuestionSession } from './../../../shared/interfaces/model.interfaces';


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
      return res.data;      
   };

};

export const questionService = new QuestionService(); 