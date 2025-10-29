
// import css
import styles from '../../styles/home/Questions.module.css';

// import components
import NextPageBtt from '../NextPageBtt';
import ExitBtt from '../ExitBtt';
import ProgressBar from '../ProgressBar';


// questions type
const QuestionsType = () => {
   return (
      <div className='questions_default_container'>
         { /* progress bar 75% */ }
         <ProgressBar />

         <h1 className='title_default'>
            Qual o tipo da questão ?
         </h1>

         <div className={ styles.questions_container }>
            <select title='questions' name="questions" className={ styles.questions_select }>
               <option value="" selected>Selecione uma opção</option>
               <option value="open">Aberta</option>
               <option value="multipleChoice">Múltipla escolha</option>
               <option value="mix">Misturado</option>
            </select>
         </div>

         { /* next page button */ }
         <NextPageBtt destiny='language' />

         { /* exit button */ }
         <ExitBtt destiny='difficulty' />
      </div>
   );
};

export default QuestionsType;