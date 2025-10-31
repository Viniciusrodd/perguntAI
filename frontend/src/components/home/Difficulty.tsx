
// import css
import styles from '../../styles/home/Questions.module.css';

// import components
import NextPageBtt from '../NextPageBtt';
import ExitBtt from '../ExitBtt';
import ProgressBar from '../ProgressBar';

// import hooks
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

// import context
import { OptionsContext } from '../../contexts/QuestionsOptions/OptionsContext';


// difficulty
const Difficulty = () => {
   // variables
   const navigate = useNavigate();
   const { difficulty, setDifficulty } = useContext(OptionsContext);

   // functions
   const nextBtt = () =>{
      navigate('/home/questionsType');
   };

   // jsx

   return (
      <div className='questions_default_container'>
         { /* progress bar 50% */ }
         <ProgressBar />

         <h1 className='title_default'>
            Qual deve ser a dificuldade ?
         </h1>

         <div className={ styles.questions_container }>
            <select 
               title='questions' 
               name="questions" 
               className={ styles.questions_select }
               value={ difficulty }
               onChange={ (e: React.ChangeEvent<HTMLSelectElement>) => setDifficulty(e.target.value) }
            >
               <option value="">Selecione uma opção</option>
               <option value="basic">Básica</option>
               <option value="intermediate">Intermediária</option>
               <option value="advanced">Avançada</option>
            </select>
         </div>

         { /* next page button */ }
         <NextPageBtt destiny={ nextBtt } />

         { /* exit button */ }
         <ExitBtt destiny='questionsNumber' />
      </div>
   );
};

export default Difficulty;