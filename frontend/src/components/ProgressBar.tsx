
// import css
import styles from '../styles/components/ProgressBar.module.css';

// import hooks
import { useParams } from 'react-router-dom';


// progress bar
const ProgressBar = () => {
   // variables
   const { destiny } = useParams();

   // jsx

   return (
      <div className={ styles.progress_container }>
         <div className={
            destiny === 'questionsNumber' ? styles.questionsNumber :
            destiny === 'difficulty' ? styles.difficulty :
            destiny === 'questionType' ? styles.questionType :
            destiny === 'language' ? styles.language 
            : styles.questionsNumber // fallback
         }></div>      
      </div>
   );
};

export default ProgressBar;