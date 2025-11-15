
// import css
import styles from '../styles/components/ExitBtt.module.css';

// import images
import exit from '../../public/images/home/exit_arrow.png';

// import hooks
import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';

// import context
import { LoadingContext } from '../contexts/Loading/Loading.context';

// interfaces
interface iExitBtt {
   destiny: string;
};


// exit btt
const ExitBtt: React.FC<iExitBtt> = ({ destiny }) => {
   //// variables
   const navigate = useNavigate();
   const { loading } = useContext(LoadingContext);


   //// functions
   
   
   const exit_btt = () =>{
      if(destiny === 'welcome') navigate('/')
      else navigate(`/home/${destiny}`);
   };


   //// jsx


   return (
      <div className={ styles.exit_container }>
         { loading ? (
            <>
             <p></p>  
            </>
         ) : (
            <button 
               type='button' 
               data-tooltip='Voltar' 
               className={`tooltip_btt tooltip`}
               onClick={ exit_btt }>
               <img 
                  src={ exit } 
                  alt="exit"
                  className={ styles.exit }
               />
            </button>
         ) }
      </div>
   );
};

export default ExitBtt;