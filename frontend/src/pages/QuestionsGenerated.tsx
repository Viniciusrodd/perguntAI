
// import css
import styles from '../styles/QuestionsGenerated.module.css';

// import hooks
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// import context
import { QuestionSessionContext } from '../contexts/QuestionSession/QuestionSession.context';


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
      if(!sessionID || sessionID !== sessionId) navigate('/');
      console.log(      
         sessionId,
         questionSet,
         answers,
         currentIndex,
         finished 
      );
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
      </div>
   );
};

export default QuestionsGenerated;