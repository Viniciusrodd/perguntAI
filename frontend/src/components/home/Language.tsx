
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

// import service
import { questionService } from '../../services/question.service';

// import interfaces
import type { 
   iGenerationOptions, iStudyMaterial 
} from '../../../../shared/interfaces/user.interfaces';


// language
const Language = () => {
   // variables
   const navigate = useNavigate();
   const { numQuestions, difficulty, questionType, text, language, setLanguage } = useContext(OptionsContext);
   const options: iGenerationOptions = {
      numQuestions, difficulty, questionType, language
   };
   const material: iStudyMaterial = { text };

   // functions
   const nextBtt = async () =>{
      try{
         // send question options
         const questions = await questionService.questionGeneration(options, material);
         console.log(questions);

         navigate('/home/questions');
      }
      catch(error){
         console.error('Error at generate questions at language component', error);
      }
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