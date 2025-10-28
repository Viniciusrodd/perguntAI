
// import css
import styles from '../styles/components/NextPageBtt.module.css';

// import images
import arrow_down from '../../public/images/home/arrow_down.png';


// next page btt
const NextPageBtt = () => {
   return (
      <div>
         <button 
            type='button'
            data-tooltip='Próximo' 
            className={`tooltip_btt tooltip`}>
            <img 
               src={ arrow_down } 
               alt="arrow down"
               className={ styles.arrow_down }
            />
         </button>
      </div>
   );
};

export default NextPageBtt;