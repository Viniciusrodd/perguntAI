
// import css
import styles from '../../styles/QuestionsGenerated.module.css';

// import image
import correctImg from '../../../public/images/questions/correct.png';

// import hooks
import React, { useState, useEffect } from 'react';

// custom interface
interface iquestion {
   id: string;
   prompt: string;
}

// types
type QuestionState = {
   responding: boolean;
   responded: boolean;
};


// open questions
const OpenQuestions: React.FC<iquestion> = ({ 
   id, 
   prompt
}) => {
   //// variables
   const [ questionState, setQuestionState ] = useState<{ [key: string]: QuestionState }>({});


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
      <div className={ styles.question } key={ id }>
         <div className={ styles.question_p_container }>
            <p className={ styles.question_p_id }>
               { id.split('q')[1] }.
            </p>
            <p className={ styles.question_p }>
               <ins>{ prompt }</ins>
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
         ) : !questionState[id]?.responding && questionState[id]?.responded ? (
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