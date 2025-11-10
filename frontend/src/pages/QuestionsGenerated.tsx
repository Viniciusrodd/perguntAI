
// import css
import styles from '../styles/QuestionsGenerated.module.css';

// import hooks
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// import context
import { QuestionSessionContext } from '../contexts/QuestionSession/QuestionSession.context';


// questions generated
const QuestionsGenerated = () => {

   //// variables
   const [respondingQuestionsBtt, setRespondingQuestionsBtt] = useState<{[key: string]: boolean}>({});   
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
      setRespondingQuestionsBtt(prev => ({
         ...prev,
         [questionId]: true
      }));
   };

   // handle response cancel btt click
   const handleCancelResponse = (questionId: string) => {
      setRespondingQuestionsBtt(prev => ({
         ...prev,
         [questionId]: false
      }));
   };      


   //// jsx


   return (
      <div className={ styles.questions_container }>
         <h1 className={ styles.title }>
            Questões geradas
         </h1>

         <div className={ styles.questions }>
            { questionSet.questions && questionSet.questions.map((question, index) =>(
               <div className={ styles.question_container } key={ index }>
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

                     { question.acceptableAnswers.map((acceptableAnswer, index) =>(
                        <div className={ styles.question } key={ index }>
                           <div className={ `${styles.question_p_container} ${styles.question_p_container_2}` }>
                              <p className={ styles.question_p_id }>
                                 -
                              </p>
                              <p className={ styles.question_p }>
                                 { acceptableAnswer }
                              </p>
                           </div>
                           <input type="radio" name="answer" title='answer' className={styles.radio} />
                        </div>
                     )) }
                     </>
                  ) : (
                     <div className={ styles.question } key={ question.id }>
                        <div className={ styles.question_p_container }>
                           <p className={ styles.question_p_id }>
                              { question.id.split('q')[1] }.
                           </p>
                           <p className={ styles.question_p }>
                              <ins>{ question.prompt }</ins>
                           </p>
                        </div>

                        { !respondingQuestionsBtt[question.id] ? (
                           <button 
                              type='button' 
                              className={ styles.question_button } 
                              onClick={ () => handleResponseClick(question.id) }
                           >
                              Responder
                           </button>
                        ) : (
                           <div className={ styles.question_answer_container }>
                              <input 
                                 type="text" 
                                 name="userResponse" 
                                 placeholder='Insira sua resposta' 
                                 className={ styles.input_response }
                              />
                              <button type='button' className={ styles.question_button }>
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