
// import css
import styles from '../../styles/home/TextBase.module.css';

// import components
import NextPageBtt from '../NextPageBtt';
import ExitBtt from '../ExitBtt';


// text base
const TextBase = () => {
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
            ></textarea>
            <p>*esse texto servirá de base para as questões</p>
         </div>

         { /* next page button */ }
         <NextPageBtt destiny='questionsNumber' />

         { /* exit button */ }
         <ExitBtt />
      </div>
   );
};

export default TextBase;