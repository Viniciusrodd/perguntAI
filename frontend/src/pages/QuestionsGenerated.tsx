
// import css
import styles from '../styles/QuestionsGenerated.module.css';

// import images
import home_img from '../../public/images/questions/home.png';

// import hooks
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import context
import { QuestionSessionContext } from '../contexts/QuestionSession/QuestionSession.context';

// import conmponents
import MultipleChoiceQuestions from '../components/questionsGenerated/MultipleChoiceQuestions';
import OpenQuestions from '../components/questionsGenerated/OpenQuestions';

// import services
import { questionService } from '../services/question.service';

// types
import type { 
   iAnswerGenerationReqBody, iUserResponse
} from '../../../shared/interfaces/userController.interfaces';


// questions generated
const QuestionsGenerated = () => {

   //// variables
   const navigate = useNavigate();
   const { sessionId, questionSet, answers, finished } = useContext(QuestionSessionContext);
   const [ multipleChoiceAnswers, setMultipleChoiceAnswers ] = useState<{ [key: string]: string }>({});
   const [ openQuestionAnswers, setOpenQuestionAnswers ] = useState<{ [key: string]: string }>({});


   //// functions


   // welcome redirect
   const welcome_redirect = () =>{
      navigate('/');
   };

   // handle multiple choices
   const handleMultipleChoiceAnswer = (questionId: string, answer: string) => {
      setMultipleChoiceAnswers(prev => ({
         ...prev,
         [questionId]: answer
      }));
   };

   // handle open question
   const handleOpenQuestionAnswer = (questionId: string, answer: string) => {
      setOpenQuestionAnswers(prev => ({
         ...prev,
         [questionId]: answer
      }));
   };

   // send response
   const sendResponses = async () =>{
      const userResponses: iUserResponse[] = [];

      // multiple answers - build
      Object.entries(multipleChoiceAnswers).forEach(([questionId, userResponse]) => {
         userResponses.push({
            questionId,
            userResponse
         });
      });

      // open answers - build
      Object.entries(openQuestionAnswers).forEach(([questionId, userResponse]) => {
         userResponses.push({
            questionId,
            userResponse
         });
      });

      // request body - build
      const requestBody: iAnswerGenerationReqBody = {
         userResponses,
         questionSession: {
            sessionId,
            questionSet,
            answers,
            currentIndex: 1,
            finished
         }
      };

      // question service...
      try{
         const response = await questionService.answersGeneration(requestBody);
         if(!response){
            console.error('⚠️ Unexpected return from API:', response);
         }

         console.log('✅ Evaluation result generated with success:', response);
      }
      catch(error){
         console.error('❌ Error at answers generations service request', error);
      }
   };


   //// jsx


   return (
      <div className={ styles.questions_container }>
         <h1 className={ styles.title }>
            Questões geradas
         </h1>

         <div className={ styles.questions }>
            { questionSet.questions.length > 1 ? (
               questionSet.questions.map((question) =>(
                  <div className={ styles.question_container } key={ question.id }>
                     { question.choices ? (
                        <MultipleChoiceQuestions 
                           id={ question.id } 
                           prompt={ question.prompt }
                           choices={ question.choices! }
                           onAnswerSelect={ handleMultipleChoiceAnswer }
                        />
                     ) : (
                        <OpenQuestions
                           id={ question.id }
                           prompt={ question.prompt }
                           onAnswerSubmit={ handleOpenQuestionAnswer }
                        />
                     ) }
                  </div>
               ))
            ) : (
               <div className={ styles.question_container } key={ questionSet.questions[0].id }>
                  { questionSet.questions[0].type == 'multipleChoice' ? (
                     <MultipleChoiceQuestions 
                        id={ questionSet.questions[0].id } 
                        prompt={ questionSet.questions[0].prompt }
                        choices={ questionSet.questions[0].choices! }
                        onAnswerSelect={ handleMultipleChoiceAnswer }
                     />
                  ) : (
                     <OpenQuestions
                        id={ questionSet.questions[0].id }
                        prompt={ questionSet.questions[0].prompt }
                        onAnswerSubmit={ handleOpenQuestionAnswer }
                     />
                  ) }
               </div>
            )}
         </div>

         <button type='button' className={ styles.btt_sendAnswers } onClick={ sendResponses }>
            Enviar respostas
         </button>

         <button 
            type='button'
            data-tooltip='Retornar á tela inicial' 
            className={`tooltip_btt tooltip`}>
            <img 
               src={ home_img } 
               alt="home"
               className={ styles.home_img }
               onClick={ welcome_redirect }
            />
         </button>
      </div>
   );
};

export default QuestionsGenerated;