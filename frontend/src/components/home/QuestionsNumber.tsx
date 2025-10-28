
// import css
import styles from '../../styles/home/QuestionsNumber.module.css';

// import components
import NextPageBtt from '../NextPageBtt';
import ExitBtt from '../ExitBtt';
import ProgressBar from '../ProgressBar';


// questions number
const QuestionsNumber = () => {
   return (
      <div className='questions_default_container'>
         { /* progress bar 25% */ }
         <ProgressBar />

         <h1 className='title_default'>
            Quantas questões deseja ?
         </h1>

         <div className={ styles.questionsNumber_container }>
            <select title='questions' name="questions" className={ styles.questions_select }>
               <option value="" selected>Selecione uma opção</option>
               <option value="1">1</option>
               <option value="2">2</option>
               <option value="3">3</option>
               <option value="4">4</option>
               <option value="5">5</option>
               <option value="6">6</option>
               <option value="7">7</option>
               <option value="8">8</option>
               <option value="9">9</option>
               <option value="10">10</option>
            </select>
         </div>

         { /* next page button */ }
         <NextPageBtt destiny='difficulty' />

         { /* exit button */ }
         <ExitBtt destiny='textBase' />
      </div>
   );
};

export default QuestionsNumber;