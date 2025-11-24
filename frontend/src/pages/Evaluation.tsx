
// import css
import styles from '../styles/Evaluation.module.css';

// import hooks
import { useEffect, useContext } from 'react';

// import contexts
import { EvaluationContext } from '../contexts/Evaluation/Evaluation.context';

// import services
import { pdfService } from '../services/pdf.service';


// evaluation
const Evaluation = () => {
   //// variables
   const { 
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      accuracy,
      PDFPath
   } = useContext(EvaluationContext);


   //// functions
   useEffect(() =>{
      console.log('evaluation data get: ')
      console.log('total questions: ', totalQuestions);
      console.log('correct: ', correctAnswers);
      console.log('incorrect: ', incorrectAnswers);
      console.log('accuracy: ', accuracy);
      console.log('pdf path: ', PDFPath);
   }, [ totalQuestions, correctAnswers, incorrectAnswers, accuracy, PDFPath ]);

   // pdf download
   const handlePDFDownload = async () =>{
      try{
         await pdfService.pdfDownload(PDFPath);
         console.log('✔️ Downloading starting...');
      }
      catch(error){
         console.error('❌ Error at handle downloading PDF', error);
      }
   };


   //// jsx


   return (
      <div className={ styles.evaluation_container }>
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