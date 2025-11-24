
// import css
import styles from '../styles/Evaluation.module.css';


// evaluation
const Evaluation = () => {
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
               <h1>75%</h1>
            </div>
         </div>

         <div className={ styles.data_container }>
            <div className={ styles.data }>
               <h1>Total de questões</h1>
               <h1 className={ styles.h1_space }>...........................</h1>
               <h1>4</h1>
            </div>
            <div className={ styles.data }>
               <h1 className={ styles.data_correct }>Questões corretas</h1>
               <h1 className={ styles.h1_space }>...........................</h1>
               <h1 className={ styles.data_correct }>3</h1>
            </div>
            <div className={ styles.data }>
               <h1 className={ styles.data_incorrect }>Questões incorretas</h1>
               <h1 className={ styles.h1_space }>.........................</h1>
               <h1 className={ styles.data_incorrect }>1</h1>
            </div>
         </div>

         <div className={ styles.pdf_container }>
            <h2>
               Gerar PDF com detalhes da avaliação ?
            </h2>

            <button 
               type='button'
               className={ styles.btt_pdf }
            >
               GERAR
            </button>
         </div>
      </div>
   );
};

export default Evaluation;