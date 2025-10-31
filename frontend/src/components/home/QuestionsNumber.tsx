
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


// questions number
const QuestionsNumber = () => {
   // variables
   const navigate = useNavigate();
   const { numQuestions, setNumQuestions } = useContext(OptionsContext);

   // functions
   const nextBtt = () =>{
      navigate('/home/difficulty');
   };

   // jsx

   return (
      <div className='questions_default_container'>
         { /* progress bar 25% */ }
         <ProgressBar />

         <h1 className='title_default'>
            Quantas questões deseja ?
         </h1>

         <div className={ styles.questions_container }>
            <select 
               title='questions' 
               name="questions" 
               className={ styles.questions_select }
               value={ numQuestions }
               onChange={ (e: React.ChangeEvent<HTMLSelectElement>) => 
                  setNumQuestions(e.target.value === '' ? 0 : parseInt(e.target.value)
               ) }   
            >
               <option value={ 0 }>Selecione uma opção</option>
               <option value={ 1 }>1</option>
               <option value={ 2 }>2</option>
               <option value={ 3 }>3</option>
               <option value={ 4 }>4</option>
               <option value={ 5 }>5</option>
               <option value={ 6 }>6</option>
               <option value={ 7 }>7</option>
               <option value={ 8 }>8</option>
               <option value={ 9 }>9</option>
               <option value={ 10 }>10</option>
            </select>
         </div>

         { /* next page button */ }
         <NextPageBtt destiny={ nextBtt } />

         { /* exit button */ }
         <ExitBtt destiny='BaseText' />
      </div>
   );
};

export default QuestionsNumber;