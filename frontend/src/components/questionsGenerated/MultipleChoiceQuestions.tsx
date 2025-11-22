
// import css
import styles from '../../styles/QuestionsGenerated.module.css';

// import images
import loadingImg from '../../../public/images/home/loading.png';

// import hooks
import React from 'react';

//  custom inteface
interface iquestion {
   id: string;
   prompt: string;
   choices: string[];
   onAnswerSelect: (questionId: string, answer: string) => void;
   answersResponded: boolean;
}


// multiple choice questions
const MultipleChoiceQuestions: React.FC<iquestion> = ({ 
   id, 
   prompt, 
   choices, 
   onAnswerSelect,
   answersResponded 
}) => {

   // handle multiple choice
   const handleMultipleChoice = (choice: string) =>{
      onAnswerSelect(id, choice.split(') ')[1]);
   };


   // jsx


   return (
      <div className={ `${styles.question_container} ${styles.question_container_2}` } key={ id }>
         { choices.length > 0 && (
            <>
               <div className={ styles.question }>
                  <div className={ styles.question_p_container }>
                     <p className={ styles.question_p_id }>
                        { id.split('q')[1] }.
                     </p>
                     <p className={ styles.question_p }>
                        <ins>{ prompt }</ins>
                     </p>
                  </div>
               </div>

               { answersResponded ? (
                  <img 
                     src={ loadingImg } 
                     alt="loading_png"
                     className='loading_img' 
                  />
               ) : (
                  choices.map((choice, index) => (
                     <div className={ styles.question } key={`${id}-answer-${index}`}>
                        <div className={ `${styles.question_p_container} ${styles.question_p_container_2}` }>
                           <p className={ styles.question_p_id }>
                              -
                           </p>
                           <p className={ styles.question_p }>
                              { choice }
                           </p>
                        </div>
                        <input 
                           type="radio" 
                           name={ `answer-${id}` } 
                           title='answer' 
                           className={ styles.radio }
                           onChange={ () => handleMultipleChoice(choice) } 
                        />
                     </div>
                  ))
               ) }
            </>
         ) } 
      </div>
   );
};

export default MultipleChoiceQuestions;