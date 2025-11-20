
// import css
import styles from '../styles/QuestionsGenerated.module.css';

// import hooks
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// import context
import { QuestionSessionContext } from '../contexts/QuestionSession/QuestionSession.context';

// import conmponents
import MultipleChoiceQuestions from '../components/questionsGenerated/MultipleChoiceQuestions';
import OpenQuestions from '../components/questionsGenerated/OpenQuestions';


// questions generated
const QuestionsGenerated = () => {

   //// variables
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
                        />
                     ) : (
                        <OpenQuestions
                           id={ question.id }
                           prompt={ question.prompt }
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
                     />
                  ) : (
                     <OpenQuestions
                        id={ questionSet.questions[0].id }
                        prompt={ questionSet.questions[0].prompt }
                     />
                  ) }
               </div>
            )}
         </div>

         <h2 className={ styles.subtitle }>
            questões geradas pela ollama - mistral IA
         </h2>
      </div>
   );
};

export default QuestionsGenerated;