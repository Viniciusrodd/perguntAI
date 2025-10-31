
// import css
import styles from '../../styles/home/Questions.module.css';

// import components
import NextPageBtt from '../NextPageBtt';
import ExitBtt from '../ExitBtt';
import ProgressBar from '../ProgressBar';

// import hooks
import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';

// import context
import { OptionsContext } from '../../contexts/QuestionsOptions/OptionsContext';


// language
const Language = () => {
   // variables
   const navigate = useNavigate();
   const { numQuestions, difficulty, questionType, text, language, setLanguage } = useContext(OptionsContext);

   // functions
   const nextBtt = () =>{
      console.log(text)
      console.log(numQuestions)
      console.log(difficulty)
      console.log(questionType)
      console.log(language);
      navigate('/home/questions');
   };

   // jsx

   return (
      <div className='questions_default_container'>
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
         <NextPageBtt destiny={ nextBtt } />

         { /* exit button */ }
         <ExitBtt destiny='questionsType' />
      </div>
   );
};

export default Language;