
// import css
import styles from '../styles/components/ExitBtt.module.css';

// import images
import exit from '../../public/images/home/exit_arrow.png';

// import hooks
import { useNavigate } from 'react-router-dom';
import type React from 'react';

// interfaces
interface iExitBtt {
   destiny: string;
};


// exit btt
const ExitBtt: React.FC<iExitBtt> = ({ destiny }) => {
   // variables
   const navigate = useNavigate();

   // functions
   const exit_btt = () =>{
      if(destiny === 'welcome') navigate('/')
      else navigate(`/home/${destiny}`);
   };

   // jsx

   return (
      <div className={ styles.exit_container }>
         <button 
            type='button' 
            data-tooltip='Sair' 
            className={`tooltip_btt tooltip`}
            onClick={ exit_btt }>
            <img 
               src={ exit } 
               alt="exit"
               className={ styles.exit }
            />
         </button>
      </div>
   );
};

export default ExitBtt;