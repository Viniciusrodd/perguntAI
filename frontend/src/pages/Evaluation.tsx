
// import css
import styles from '../styles/Evaluation.module.css';

// import hooks
import { useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// import contexts
import { EvaluationContext } from '../contexts/Evaluation/Evaluation.context';

// import services
import { pdfService } from '../services/pdf.service';

// import components
import Modal from '../components/Modal';

// import interfaces
import type { 
   iModalConfig 
} from '../../../shared/interfaces/modal.interface';


// evaluation
const Evaluation = () => {
   //// variables
   const navigate = useNavigate();

   // states
   const [ redirect, setRedirect ] = useState<boolean>(false);
   const [ modal_display, setModal_display ] = useState<boolean>(false);
   const [ modal_title, setModal_title ] = useState<string>('');
   const [ modal_msg, setModal_msg ] = useState<string>('');
   const [ modal_btt, setmodal_btt ] = useState<boolean | string>(false);
   const [ modal_btt_2, setModal_btt_2 ] = useState<boolean | string>(false);

   // contexts
   const { 
      totalQuestions, setTotalQuestions,
      correctAnswers, setCorrectAnswers,
      incorrectAnswers, setIncorrectAnswers,
      accuracy, setAccuracy,
      PDFPath, setPDFPath
   } = useContext(EvaluationContext);


   //// functions


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

   // blocking navigations
   useEffect(() =>{
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
         event.preventDefault();
      };

      const handlePopState = () => {
         // block turn back to questions
         if (!redirect) {
            window.history.pushState(null, '', window.location.href);
            modal_config({
               title: '❗ Espere', 
               msg: `❗ Você não pode voltar uma vez que esteja na avaliação`, 
               btt1: false, btt2: 'fechar', display: true
            });
         }
      };

      window.addEventListener('beforeunload', handleBeforeUnload);
      window.addEventListener('popstate', handlePopState);
      window.history.pushState(null, '', window.location.href); // block turn back

      return () => {
         window.removeEventListener('beforeunload', handleBeforeUnload);
         window.removeEventListener('popstate', handlePopState);
      };
   }, [ redirect ]);


   // reset all contexts
   const resetAllContexts = useCallback(() => {
      setTotalQuestions(0);
      setCorrectAnswers(0);
      setIncorrectAnswers(0);
      setAccuracy(0);
      setPDFPath('');
   }, 
   [ 
      setTotalQuestions, 
      setCorrectAnswers,
      setIncorrectAnswers, 
      setAccuracy, 
      setPDFPath
   ]);
   

   // redirect - finished page
   useEffect(() =>{
      if(redirect){      
         const timer = setTimeout(() => {
            resetAllContexts();
            navigate('/finished');
         }, 2000);

         return () =>{         
            clearTimeout(timer);
         };
      }
   }, [ redirect, navigate, resetAllContexts ]);


   // pdf download
   const handlePDFDownload = async () =>{
      try{
         await pdfService.pdfDownload(PDFPath);
         setRedirect(true);
      }
      catch(error){
         console.error('❌ Error at handle downloading PDF', error);
      }
   };


   //// jsx


   return (
      <div className={ styles.evaluation_container }>
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
            Relatório de avaliação
         </h1>

         <div className={ styles.precision_container }>
            <h2>
               Precisão de:
            </h2>

            <div className={ styles.precision }>
               <h1>
                  { accuracy }%
               </h1>
            </div>
         </div>

         <div className={ styles.data_container }>
            <div className={ styles.data }>
               <h1>Total de questões</h1>
               <h1 className={ styles.h1_space }>...........................</h1>
               <h1>
                  { totalQuestions }
               </h1>
            </div>

            <div className={ styles.data }>
               <h1 className={ styles.data_correct }>Questões corretas</h1>
               <h1 className={ styles.h1_space }>...........................</h1>
               <h1 className={ styles.data_correct }>
                  { correctAnswers }
               </h1>
            </div>
            
            <div className={ styles.data }>
               <h1 className={ styles.data_incorrect }>Questões incorretas</h1>
               <h1 className={ styles.h1_space }>.........................</h1>
               <h1 className={ styles.data_incorrect }>
                  { incorrectAnswers }
               </h1>
            </div>
         </div>

         <div className={ styles.pdf_container }>
            <h2>
               Gerar PDF com + detalhes da avaliação ?
            </h2>

            <button 
               type='button'
               className={ styles.btt_pdf }
               onClick={ handlePDFDownload }
            >
               GERAR
            </button>
         </div>
      </div>
   );
};

export default Evaluation;