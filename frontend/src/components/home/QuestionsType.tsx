
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
import { OptionsContext } from '../../contexts/QuestionsOptions/Options.context';

// types
type QuestionType = 'open' | 'multipleChoice' | 'mix';


// questions type
const QuestionsType = () => {
   // variables
   const navigate = useNavigate();
   const { questionType, setQuestionType } = useContext(OptionsContext);

   // functions
   const nextBtt = () =>{
      navigate('/home/language');
   };

   // jsx

   return (
      <div className='questions_default_container'>
         { /* progress bar 75% */ }
         <ProgressBar />

         <h1 className='title_default'>
            Qual o tipo da questão ?
         </h1>

         <div className={ styles.questions_container }>
            <select 
               title='questions' 
               name="questions" 
               className={ styles.questions_select }
               value={ questionType }
               onChange={ 
                  (e: React.ChangeEvent<HTMLSelectElement>) => 
                     setQuestionType(e.target.value as QuestionType) 
               }
            >
               <option value="">Selecione uma opção</option>
               <option value="open">Aberta</option>
               <option value="multipleChoice">Múltipla escolha</option>
               <option value="mix">Misturado</option>
            </select>
         </div>

         { /* next page button */ }
         <NextPageBtt destiny={ nextBtt } />

         { /* exit button */ }
         <ExitBtt destiny='difficulty' />
      </div>
   );
};

export default QuestionsType;