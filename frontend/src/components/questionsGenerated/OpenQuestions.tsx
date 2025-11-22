
// import css
import styles from '../../styles/QuestionsGenerated.module.css';

// import image
import eye from '../../../public/images/questions/eye.png';
import loadingImg from '../../../public/images/home/loading.png';

// import hooks
import React, { useState } from 'react';

// custom interface
interface iquestion {
   id: string;
   prompt: string;
   onAnswerSubmit: (questionId: string, answer: string) => void;
   answersResponded: boolean;
}

// types
type QuestionState = {
   responding: boolean;
   responded: boolean;
};

type Response = {
   response: string;
}


// open questions
const OpenQuestions: React.FC<iquestion> = ({ 
   id, 
   prompt,
   onAnswerSubmit,
   answersResponded
}) => {
   //// variables
   const [ questionState, setQuestionState ] = useState<{ [key: string]: QuestionState }>({});
   const [ userResponse, setUserResponse ] = useState<{ [key: string]: Response }>({});


   //// functions


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

   // user response
   const handleUserResponse = (questionId: string, value: string) =>{
      setUserResponse(prev => ({
         ...prev,
         [questionId]: {
            response: value
         }
      }))
   };

   // handle response btt + call onAnswerSubmit
   const handleResponseSend_btt = (questionId: string) =>{
      setQuestionState(prev => ({
         ...prev,
         [questionId]: {
            responding: false,
            responded: true
         }
      }));

      // call onAnswerSubmit
      if(userResponse[questionId]?.response){
         onAnswerSubmit(questionId, userResponse[questionId].response);
      }
   };


   //// jsx
   

   return (
      <div className={ styles.question } key={ id }>
         <div className={ styles.question_p_container }>
            <p className={ styles.question_p_id }>
               { id.split('q')[1] }.
            </p>
            <p className={ styles.question_p }>
               { prompt }
            </p>
         </div>

         { !questionState[id]?.responding && !questionState[id]?.responded ? (
            <button 
               type='button' 
               className={ styles.question_button } 
               onClick={ () => handleResponseClick(id) }
            >
               Responder
            </button>
         ) : !questionState[id]?.responding && questionState[id]?.responded && !answersResponded ? (
            <img 
               src={ eye } 
               alt="eye_img"  
               data-tooltip='Visualizar a resposta' 
               className={ `${styles.responded_img} tooltip_btt tooltip}` }
               onClick={ () => handleResponseClick(id) }
            />
         ) : answersResponded && !questionState[id]?.responding && questionState[id]?.responded ? (
            <img 
               src={ loadingImg } 
               alt="loading_png"
               className='loading_img' 
            />
         ) : (
            <div className={ styles.question_answer_container }>
               <input 
                  type="text" 
                  name="userResponse" 
                  placeholder={ userResponse[id]?.response || 'Insira sua resposta' } 
                  autoComplete='off'
                  className={ styles.input_response }
                  onChange={ (e: React.ChangeEvent<HTMLInputElement>) => handleUserResponse(id, e.target.value) }
               />
               <button 
                  type='button' 
                  className={ styles.question_button } 
                  onClick={ () => handleResponseSend_btt(id) }
               >
                  Enviar
               </button>
               <button 
                  type='button' 
                  className={ `${styles.question_button} ${styles.question_button_cancel}` } 
                  onClick={ () => handleCancelResponse(id) }
               >
                  Cancelar
               </button>
            </div>
         ) }
      </div>
   );
};

export default OpenQuestions;