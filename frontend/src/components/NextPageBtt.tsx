
// import css
import styles from '../styles/components/NextPageBtt.module.css';

// import images
import next from '../../public/images/home/next_2.png';
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
               src={ next } 
               alt="arrow down"
               className={ styles.next }
            />
         </button>
      </div>
   );
};

export default NextPageBtt;