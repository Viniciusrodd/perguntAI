
// import css
import styles from '../../styles/home/TextBase.module.css';

// import images
import arrow_down from '../../../public/images/home/arrow_down.png';
import exit from '../../../public/images/home/exit.png';


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

         <img 
            src={ arrow_down } 
            alt="arrow down"
            className={ styles.arrow_down }
         />

         <div className={ styles.exit_container }>
            <img 
               src={ exit } 
               alt="exit"
               className={ styles.exit }
            />
         </div>
      </div>
   );
};

export default TextBase;