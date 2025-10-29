
// import css
import styles from '../../styles/home/Questions.module.css';

// import components
import NextPageBtt from '../NextPageBtt';
import ExitBtt from '../ExitBtt';
import ProgressBar from '../ProgressBar';


// difficulty
const Difficulty = () => {
   return (
      <div className='questions_default_container'>
         { /* progress bar 50% */ }
         <ProgressBar />

         <h1 className='title_default'>
            Qual deve ser a dificuldade ?
         </h1>

         <div className={ styles.questions_container }>
            <select title='questions' name="questions" className={ styles.questions_select }>
               <option value="" selected>Selecione uma opção</option>
               <option value="basic">Básica</option>
               <option value="intermediate">Intermediária</option>
               <option value="advanced">Avançada</option>
            </select>
         </div>

         { /* next page button */ }
         <NextPageBtt destiny='questionType' />

         { /* exit button */ }
         <ExitBtt destiny='questionsNumber' />
      </div>
   );
};

export default Difficulty;