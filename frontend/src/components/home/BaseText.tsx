
// import css
import styles from '../../styles/home/BaseText.module.css';

// import components
import NextPageBtt from '../NextPageBtt';
import ExitBtt from '../ExitBtt';

// import hooks
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// import context
import { OptionsContext } from '../../contexts/QuestionsOptions/Options.context';


// base text
const BaseText = () => {
   // variables
   const navigate = useNavigate();
   const { text, setText } = useContext(OptionsContext); // context 

   // functions
   const nextBtt = () =>{
      navigate('/home/questionsNumber');
   };

   // jsx

   return (
      <div className='home_default_container'>
         <h1 className='title_default'>
            Texto base
         </h1>

         <div className={ styles.textarea_container }>
            <textarea 
               name="" 
               id="" 
               title="base_text" 
               placeholder="Insira-o aqui..."
               className={ styles.textarea }
               value={ text }
               onChange={ (e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value) }
            ></textarea>
            <p>*esse texto servirá de base para as questões</p>
         </div>

         { /* next page button */ }
         <NextPageBtt destiny={ nextBtt } />

         { /* exit button */ }
         <ExitBtt destiny='welcome' />
      </div>
   );
};

export default BaseText;