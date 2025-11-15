
// import css
import styles from '../styles/QuestionsGenerated.module.css';

// import images
import correctImg from '../../public/images/questions/correct.png';

// import hooks
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// import context
import { QuestionSessionContext } from '../contexts/QuestionSession/QuestionSession.context';

// types
type QuestionState = {
   responding: boolean;
   responded: boolean;
};


// questions generated
const QuestionsGenerated = () => {

   //// variables
   const [ questionState, setQuestionState ] = useState<{ [key: string]: QuestionState }>({});
   const { sessionID } = useParams<{ sessionID: string }>();
   const navigate = useNavigate();
   const { 
      sessionId,
      questionSet,
      answers,
      currentIndex,
      finished 
   } = useContext(QuestionSessionContext);


   //// functions


   useEffect(() =>{
      //if(!sessionID || sessionID !== sessionId) navigate('/');
      console.log(sessionId);
      console.log(questionSet);
      console.log(answers);
      console.log(currentIndex);
      console.log(finished);
   }, [
         sessionID,
         sessionId,
         questionSet,
         answers,
         currentIndex,
         finished,
         navigate
      ]);

   // handle response btt click
   const handleResponseClick = (questionId: string) => {
      setQuestionState(prev => ({
         ...prev,
         [questionId]: {
            responding: true,
            responded: false
         } 
      }));
   };

   // handle response cancel btt click
   const handleCancelResponse = (questionId: string) => {
      setQuestionState(prev => ({
         ...prev,
         [questionId]: {
            responding: false,
            responded: false
         }
      }));
   };      

   // handle response btt
   const handleResponseSend_btt = (questionId: string) =>{
      setQuestionState(prev => ({
         ...prev,
         [questionId]: {
            responding: false,
            responded: true
         }
      }));
   };

   useEffect(() =>{
      console.log('question state: ', questionState);
   }, [ questionState, setQuestionState ])


   //// jsx


   return (
      <div className={ styles.questions_container }>
         <h1 className={ styles.title }>
            Questões geradas
         </h1>

         <div className={ styles.questions }>
            { questionSet.questions && questionSet.questions.map((question) =>(
               <div className={ styles.question_container } key={ question.id }>
{/* MULTIPLE CHOICE QUESTIONS */}
                  { question.acceptableAnswers.length > 1 ? (
                     <>
                     <div className={ styles.question } key={ question.id }>
                        <div className={ styles.question_p_container }>
                           <p className={ styles.question_p_id }>
                              { question.id.split('q')[1] }.
                           </p>
                           <p className={ styles.question_p }>
                              <ins>{ question.prompt }</ins>
                           </p>
                        </div>
                     </div>

                     { question.acceptableAnswers.map((acceptableAnswer) =>(
                        <div className={ styles.question } key={ question.id }>
                           <div className={ `${styles.question_p_container} ${styles.question_p_container_2}` }>
                              <p className={ styles.question_p_id }>
                                 -
                              </p>
                              <p className={ styles.question_p }>
                                 { acceptableAnswer }
                              </p>
                           </div>
                           <input 
                              type="radio" 
                              name={ `answer-${question.id}` } 
                              title='answer' 
                              className={ styles.radio } 
                           />
                        </div>
                     )) }
                     </>
                  ) : (
                     <div className={ styles.question } key={ question.id }>
{/* OPEN QUESTIONS */}
                        <div className={ styles.question_p_container }>
                           <p className={ styles.question_p_id }>
                              { question.id.split('q')[1] }.
                           </p>
                           <p className={ styles.question_p }>
                              <ins>{ question.prompt }</ins>
                           </p>
                        </div>

                        { !questionState[question.id]?.responding && !questionState[question.id]?.responded ? (
                           <button 
                              type='button' 
                              className={ styles.question_button } 
                              onClick={ () => handleResponseClick(question.id) }
                           >
                              Responder
                           </button>
                        ) : !questionState[question.id]?.responding && questionState[question.id]?.responded ? (
                           <img 
                              src={ correctImg } 
                              alt="correct_img"  
                              className={ styles.correct_img }
                           />
                        ) : (
                           <div className={ styles.question_answer_container }>
                              <input 
                                 type="text" 
                                 name="userResponse" 
                                 placeholder='Insira sua resposta' 
                                 className={ styles.input_response }
                              />
                              <button 
                                 type='button' 
                                 className={ styles.question_button } 
                                 onClick={ () => handleResponseSend_btt(question.id) }
                              >
                                 Enviar
                              </button>
                              <button 
                                 type='button' 
                                 className={ `${styles.question_button} ${styles.question_button_cancel}` } 
                                 onClick={ () => handleCancelResponse(question.id) }
                              >
                                 Cancelar
                              </button>
                           </div>
                        ) }
                     </div>
                  ) }
               </div>
            )) }
         </div>

         <h2 className={ styles.subtitle }>
            questões geradas pela ollama - mistral IA
         </h2>
      </div>
   );
};

export default QuestionsGenerated;