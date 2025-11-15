
// import css
import styles from '../../styles/QuestionsGenerated.module.css';

// import hooks
import React from 'react';

interface iquestion {
   id: string;
   prompt: string;
   acceptableAnswers: string[];
}

// multiple choice questions
const MultipleChoiceQuestions: React.FC<iquestion> = ({ id, prompt, acceptableAnswers}) => {
   return (
      <div className={ styles.question_container } key={ id }>
         { acceptableAnswers.length > 1 && (
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

               { acceptableAnswers.map((acceptableAnswer, index) => (
                  <div className={ styles.question } key={`${id}-answer-${index}`}>
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