
// import css
import styles from '../styles/QuestionsGenerated.module.css';

// import images
import home_img from '../../public/images/questions/home.png';
import loadingImg from '../../public/images/home/loading.png';

// import hooks
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import context
import { QuestionSessionContext } from '../contexts/QuestionSession/QuestionSession.context';
import { LoadingContext } from '../contexts/Loading/Loading.context';
import { EvaluationContext } from '../contexts/Evaluation/Evaluation.context';

// import conmponents
import MultipleChoiceQuestions from '../components/questionsGenerated/MultipleChoiceQuestions';
import OpenQuestions from '../components/questionsGenerated/OpenQuestions';
import Modal from '../components/Modal';

// import services
import { questionService } from '../services/question.service';

// types
import type { 
   iAnswerGenerationReqBody, iUserResponse
} from '../../../shared/interfaces/userController.interfaces';
import type { iModalConfig } from '../../../shared/interfaces/modal.interface';


// questions generated
const QuestionsGenerated = () => {

   //// variables
   const navigate = useNavigate();

   // states
   const [ redirect, setRedirect ] = useState<boolean>(false);
   const [ multipleChoiceAnswers, setMultipleChoiceAnswers ] = useState<{ [key: string]: string }>({});
   const [ openQuestionAnswers, setOpenQuestionAnswers ] = useState<{ [key: string]: string }>({});
   const [ modal_display, setModal_display ] = useState<boolean>(false);
   const [ modal_title, setModal_title ] = useState<string>('');
   const [ modal_msg, setModal_msg ] = useState<string>('');
   const [ modal_btt, setmodal_btt ] = useState<boolean | string>(false);
   const [ modal_btt_2, setModal_btt_2 ] = useState<boolean | string>(false);
   const [ questions_responded, set_questions_responded ] = useState<boolean>(false);
   
   // contexts
   const { sessionId, questionSet, answers, finished } = useContext(QuestionSessionContext);
   const { loading, setLoading } = useContext(LoadingContext);
   const { 
      setTotalQuestions, 
      setCorrectAnswers, 
      setIncorrectAnswers, 
      setAccuracy,
      setPDFPath
   } = useContext(EvaluationContext);


   //// functions


   // redirect
   useEffect(() =>{
      if(redirect){
         const clearMessage = setTimeout(() =>{
            modal_config({
               title: '', msg: '', btt1: false, 
               btt2: false, display: false
            });

            setLoading(false);
            set_questions_responded(false);

            navigate(`/evaluation`);            
         }, 6000);

         return () =>{
            clearTimeout(clearMessage);
         };
      }
   }, [redirect, navigate, setLoading, set_questions_responded]);
   
   // modal config
   const modal_config = ({ title, msg, btt1, btt2, display }: iModalConfig) => {
      setModal_title(title ?? '');
      setModal_msg(msg ?? '');
      setmodal_btt(btt1 ?? false);
      setModal_btt_2(btt2 ?? false);
      setModal_display(display ?? false);
   };   

   // close modal
   const closeModal = () =>{
      modal_config({
         title: '', msg: '', btt1: false, 
         btt2: false, display: false
      });
   };

   // welcome redirect
   const welcome_redirect = () =>{
      navigate('/');
   };

   // handle multiple choices
   const handleMultipleChoiceAnswer = (questionId: string, answer: string) => {
      setMultipleChoiceAnswers(prev => ({
         ...prev,
         [questionId]: answer
      }));
   };

   // handle open question
   const handleOpenQuestionAnswer = (questionId: string, answer: string) => {
      setOpenQuestionAnswers(prev => ({
         ...prev,
         [questionId]: answer
      }));
   };

   // send response
   const sendResponses = async () =>{
      setLoading(true);
      set_questions_responded(true);

      const userResponses: iUserResponse[] = [];

      // multiple answers - build
      Object.entries(multipleChoiceAnswers).forEach(([questionId, userResponse]) => {
         userResponses.push({
            questionId,
            userResponse
         });
      });

      // open answers - build
      Object.entries(openQuestionAnswers).forEach(([questionId, userResponse]) => {
         userResponses.push({
            questionId,
            userResponse
         });
      });

      // data - build
      const data: iAnswerGenerationReqBody = {
         userResponses,
         questionSession: {
            sessionId,
            questionSet,
            answers,
            currentIndex: 1,
            finished
         }
      };

      // question service...
      try{
         const response = await questionService.answersGeneration(data);
         if(!response){
            console.error('⚠️ Unexpected return from API:', response);
         }

         // fields set
         setTotalQuestions(response.totalQuestions);
         setCorrectAnswers(response.correctAnswers);
         setIncorrectAnswers(response.incorrectAnswers);
         setAccuracy(response.accuracy);
         setPDFPath(response.pdfPath || '');

         modal_config({
            title: 'Sucesso ✔️', 
            msg: `🤖 Suas respostas foram enviadas 🤖 \n você será redirecionado para o relatório de avaliação...`, 
            btt1: false, btt2: false, display: true
         });

         setRedirect(true);
      }
      catch(error){
         console.error('❌ Error at answers generations service request', error);
         modal_config({
            title: 'Só um segundo ❗️', 
            msg: `Erro interno ao enviar respostas ❌`, 
            btt1: false, btt2: 'Voltar', display: true
         });
      }
   };


   //// jsx


   return (
      <div className={ styles.questions_container }>
         { /* modal */ }
         <Modal 
            title={ modal_title }
            msg={ modal_msg }
            btt1={ modal_btt }
            btt2={ modal_btt_2 }
            display={ modal_display }
            onClose={ closeModal }
         />          
         
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
                           onAnswerSelect={ handleMultipleChoiceAnswer }
                           answersResponded={ questions_responded }
                        />
                     ) : (
                        <OpenQuestions
                           id={ question.id }
                           prompt={ question.prompt }
                           onAnswerSubmit={ handleOpenQuestionAnswer }
                           answersResponded={ questions_responded }
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
                        onAnswerSelect={ handleMultipleChoiceAnswer }
                        answersResponded={ questions_responded }
                     />
                  ) : (
                     <OpenQuestions
                        id={ questionSet.questions[0].id }
                        prompt={ questionSet.questions[0].prompt }
                        onAnswerSubmit={ handleOpenQuestionAnswer }
                        answersResponded={ questions_responded }
                     />
                  ) }
               </div>
            )}
         </div>

         { loading ? (
            <>
               <img 
                  src={ loadingImg } 
                  alt="loading_png"
                  className='loading_img' 
               />
               <p className='loading_msg'>
                  Enviando as respostas...
               </p>
            </>
         ) : (
            <>
               <button type='button' className={ styles.btt_sendAnswers } onClick={ sendResponses }>
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
            </>
         ) }
      </div>
   );
};

export default QuestionsGenerated;