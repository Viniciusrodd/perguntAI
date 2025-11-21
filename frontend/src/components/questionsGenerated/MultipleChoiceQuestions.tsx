
// import css
import styles from '../../styles/QuestionsGenerated.module.css';

// import hooks
import React from 'react';

//  custom inteface
interface iquestion {
   id: string;
   prompt: string;
   choices: string[];
}


// multiple choice questions
const MultipleChoiceQuestions: React.FC<iquestion> = ({ id, prompt, choices}) => {
   return (
      <div className={ `${styles.question_container} ${styles.question_container_2}` }key={ id }>
         { choices.length > 1 && (
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

               { choices.map((choices, index) => (
                  <div className={ styles.question } key={`${id}-answer-${index}`}>
                     <div className={ `${styles.question_p_container} ${styles.question_p_container_2}` }>
                        <p className={ styles.question_p_id }>
                           -
                        </p>
                        <p className={ styles.question_p }>
                           { choices }
                        </p>
                     </div>
                     <input 
                        type="radio" 
                        name={ `answer-${id}` } 
                        title='answer' 
                        className={ styles.radio } 
                     />
                  </div>
               ))}
            </>
         ) } 
      </div>
   );
};

export default MultipleChoiceQuestions;