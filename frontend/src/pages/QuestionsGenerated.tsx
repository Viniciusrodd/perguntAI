
// import css
import styles from '../styles/QuestionsGenerated.module.css';

// import images
import home_img from '../../public/images/questions/home.png';

// import hooks
import { useContext} from 'react';
import { useNavigate } from 'react-router-dom';

// import context
import { QuestionSessionContext } from '../contexts/QuestionSession/QuestionSession.context';

// import conmponents
import MultipleChoiceQuestions from '../components/questionsGenerated/MultipleChoiceQuestions';
import OpenQuestions from '../components/questionsGenerated/OpenQuestions';


// questions generated
const QuestionsGenerated = () => {

   //// variables
   const navigate = useNavigate();
   const { questionSet } = useContext(QuestionSessionContext);


   //// functions


   // welcome redirect
   const welcome_redirect = () =>{
      navigate('/');
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

         <button type='button' className={ styles.btt_sendAnswers }>
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