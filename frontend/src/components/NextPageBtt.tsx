
// import css
import styles from '../styles/components/NextPageBtt.module.css';

// import images
import next from '../../public/images/home/next_2.png';

// import hooks
import type React from 'react';


// interfaces
interface iNextPageBtt {
   destiny: (event: React.MouseEvent<HTMLButtonElement>) => void;
};


// next page btt
const NextPageBtt: React.FC<iNextPageBtt> = ({ destiny }) => {
   return (
      <div>
         <button 
            type='button'
            data-tooltip='Próximo' 
            className={`tooltip_btt tooltip`}
            onClick={ destiny }>
            <img 
               src={ next } 
               alt="arrow down"
               className={ styles.next }
            />
         </button>
      </div>
   );
};

export default NextPageBtt;