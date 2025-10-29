
// import css
import styles from '../../styles/home/Questions.module.css';

// import components
import NextPageBtt from '../NextPageBtt';
import ExitBtt from '../ExitBtt';
import ProgressBar from '../ProgressBar';


// language
const Language = () => {
   return (
      <div className='questions_default_container'>
         { /* progress bar 100% */ }
         <ProgressBar />

         <h1 className='title_default'>
            Em qual linguagem ?
         </h1>

         <div className={ styles.questions_container }>
            <select title='questions' name="questions" className={ styles.questions_select }>
               <option value="" selected>Selecione uma opção</option>
               <option value="portuguese">Português</option>
               <option value="english">Inglês</option>
            </select>
         </div>

         { /* next page button */ }
         <NextPageBtt destiny='questions' />

         { /* exit button */ }
         <ExitBtt destiny='questionsType' />
      </div>
   );
};

export default Language;