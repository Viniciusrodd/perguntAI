
// import css
import styles from '../styles/components/NextPageBtt.module.css';

// import images
import arrow_down from '../../public/images/home/arrow_down.png';
import type React from 'react';

// import hooks
import { useNavigate } from 'react-router-dom';

// interfaces
interface iNextPageBtt {
   destiny: string
};


// next page btt
const NextPageBtt: React.FC<iNextPageBtt> = ({ destiny }) => {
   // variables
   const navigate = useNavigate();
   
   // functions
   const next_btt = () =>{
      navigate(`/home/${destiny}`);
   };

   // jsx

   return (
      <div>
         <button 
            type='button'
            data-tooltip='Próximo' 
            className={`tooltip_btt tooltip`}
            onClick={ next_btt }>
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