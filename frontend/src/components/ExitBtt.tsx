
// import css
import styles from '../styles/components/ExitBtt.module.css';

// import images
import exit from '../../public/images/home/exit.png';

// import hooks
import { useNavigate } from 'react-router-dom';


// exit btt
const ExitBtt = () => {
   // variables
   const navigate = useNavigate();

   // functions
   const exit_btt = () =>{
      navigate('/');
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