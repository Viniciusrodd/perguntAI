
// import css
import styles from '../styles/components/NextPageBtt.module.css';

// import images
import next from '../../public/images/home/next_2.png';
import loadingImg from '../../public/images/home/loading.png';

// import hooks
import React, { useContext } from 'react';

// import context
import { LoadingContext } from '../contexts/Loading/Loading.context';


// interfaces
interface iNextPageBtt {
   destiny: (event: React.MouseEvent<HTMLButtonElement>) => void;
};


// next page btt
const NextPageBtt: React.FC<iNextPageBtt> = ({ destiny }) => {
   //// variables
   const { loading } = useContext(LoadingContext);


   //// jsx


   return (
      <div>
         { loading ? (
            <>
               <img 
                  src={ loadingImg } 
                  alt="loading_png"
                  className='loading_img' 
               />
               <p className='loading_msg'>
                  Carregando...
               </p>
            </>
         ) : (
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
         ) }
      </div>
   );
};

export default NextPageBtt;