
// import css
import styles from '../../styles/home/Questions.module.css';

// import components
import NextPageBtt from '../NextPageBtt';
import ExitBtt from '../ExitBtt';
import ProgressBar from '../ProgressBar';
import Modal from '../Modal';

// import hooks
import { useNavigate } from 'react-router-dom';
import React, { useContext, useState, useEffect } from 'react';

// import context
import { OptionsContext } from '../../contexts/QuestionsOptions/Options.context';
import { QuestionSessionContext } from '../../contexts/QuestionSession/QuestionSession.context';
import { LoadingContext } from '../../contexts/Loading/Loading.context';

// import service
import { questionService } from '../../services/question.service';

// import interfaces
import type { 
   iGenerationOptions, iStudyMaterial 
} from '../../../../shared/interfaces/user.interfaces';
import type { iModalConfig } from '../../../../shared/interfaces/modal.interface';

// types
export type DifficultyType = 'basic' | 'intermediate' | 'advanced';
export type QuestionType = 'open' | 'multipleChoice' | 'mix';


// language
const Language = () => {
   
   //// variables
   const navigate = useNavigate();
   const [ modal_display, setModal_display ] = useState<boolean>(false);
   const [ modal_title, setModal_title ] = useState<string>('');
   const [ modal_msg, setModal_msg ] = useState<string>('');
   const [ modal_btt, setmodal_btt ] = useState<boolean | string>(false);
   const [ modal_btt_2, setModal_btt_2 ] = useState<boolean | string>(false);
   const [ modal_event, setModal_event ] = useState<string>('');
   const [ destiny_redirect, setDestiny_redirect ] = useState<string>('');
   const [ redirect, setRedirect ] = useState<boolean>(false);


   //// contexts
   const { 
      numQuestions, difficulty, questionType, 
      text, language, setLanguage 
   } = useContext(OptionsContext);

   const {
      sessionId, 
      setSessionId,
      setQuestionSet,
      setAnswers,
      setCurrentIndex,
      setFinished
   } = useContext(QuestionSessionContext);

   const options: iGenerationOptions = {
      numQuestions, difficulty, questionType, language
   };
   const material: iStudyMaterial = { text };

   const { setLoading } = useContext(LoadingContext);


   //// functions


   // redirect
   useEffect(() =>{
      if(redirect){
         const clearMessage = setTimeout(() =>{
            modal_config({
               title: '', msg: '', btt1: false, 
               btt2: false, display: false
            });

            navigate(`/questions/${sessionId}`);            
         }, 6000);

         return () =>{
            clearTimeout(clearMessage);
         };
      }
   }, [redirect, navigate, sessionId]);


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

   // modal event handler
   const modal_event_handler = () =>{
      if(modal_event === 'redirect'){
         navigate(`/home/${ destiny_redirect }`)
      }
   };

   // modal check setup
   const modal_check = (
      datatype: string | number | DifficultyType | QuestionType, 
      problem: string,
      destiny: string
   ) =>{
      if(datatype === '' || datatype === 0 || !datatype){
         modal_config({
            title: 'Só um segundo ❗️', 
            msg: `É necessário inserir ${problem} para prosseguir 🔍`, 
            btt1: 'Inserir', btt2: false, display: true
         });

         // destiny redirect set
         setDestiny_redirect(destiny);

         // call btt1 event
         setModal_event('redirect');
      }
   };

   // check
   const check = () =>{
      if(text === '') modal_check(text, 'texto', 'baseText');      
      else if(numQuestions === 0) modal_check(numQuestions, 'quantidade de questões', 'questionsNumber');
      else if(!difficulty) modal_check(difficulty, 'dificuldade', 'difficulty');
      else if(!questionType) modal_check(questionType, 'tipo de questão', 'questionsType');
      else if(language === ''){
         modal_config({
            title: 'Só um segundo ❗️', 
            msg: `É necessário inserir uma linguagem para prosseguir 🔍`, 
            btt1: false, btt2: 'Voltar', display: true
         });
      }else{
         nextBtt();
      }
   }    

   // questions - navigate
   const nextBtt = async () =>{
      setLoading(true);
      await questionGenerationRequest();
   };

   // question generation request
   const questionGenerationRequest = async () =>{
      try{
         // send question options
         const response = await questionService.questionGeneration(options, material);
         if(!response){
            console.error('⚠️ Unexpected return from API:', response);
         }

         // fields set
         setSessionId(response.sessionId);
         setQuestionSet(response.questionSet);
         setAnswers(response.answers || []);
         setCurrentIndex(response.currentIndex ?? 0);
         setFinished(response.finished ?? false);

         console.log('✅ question generation success:', response);
         modal_config({
            title: 'Sucesso ✔️', 
            msg: `🤖 Suas questões foram geradas 🤖 \n você será redirecionado para elas...`, 
            btt1: false, btt2: false, display: true
         });

         setLoading(false);
         setRedirect(true);
      }  
      catch(error){
         console.error('❌ Error at generate questions at language component', error);
         modal_config({
            title: 'Só um segundo ❗️', 
            msg: `Erro interno ao gerar as questões ❌`, 
            btt1: false, btt2: 'Voltar', display: true
         });
      }    
   };


   //// jsx


   return (
      <div className='questions_default_container'>
         { /* modal */ }
         <Modal 
            title={ modal_title }
            msg={ modal_msg }
            btt1={ modal_btt }
            btt2={ modal_btt_2 }
            display={ modal_display }
            onClose={ closeModal }
            modalEvent={ modal_event_handler }
         />          
       
         { /* progress bar 100% */ }
         <ProgressBar />

         <h1 className='title_default'>
            Em qual linguagem ?
         </h1>

         <div className={ styles.questions_container }>
            <select 
               title='questions' 
               name="questions" 
               className={ styles.questions_select }
               value={ language }
               onChange={ (e: React.ChangeEvent<HTMLSelectElement>) => setLanguage(e.target.value) }
            >
               <option value="">Selecione uma opção</option>
               <option value="portuguese">Português</option>
               <option value="english">Inglês</option>
            </select>
         </div>

         { /* next page button */ }
         <NextPageBtt destiny={ check } />

         { /* exit button */ }
         <ExitBtt destiny='questionsType' />
      </div>
   );
};

export default Language;