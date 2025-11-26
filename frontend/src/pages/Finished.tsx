
// import css
import styles from '../styles/Welcome.module.css';

// import images
import welcome_robot_img from '../../public/images/welcome/welcome_robot.png';

// import hooks
import { useNavigate } from 'react-router-dom';


const Finished = () => {
   //// variables
   const navigate = useNavigate();
   
   
   //// welcome - redirect
   const redirect = () =>{
      navigate('/');
   };
   


   //// jsx


   return (
      <div className={ styles.welcome_container }>
         <img 
            src={ welcome_robot_img } 
            alt="welcome_robot_image" 
            className={ styles.welcome_robot_img }
         />
         
         <h1 className={ styles.title }>
            PDF gerado, vai mais uma rodada ?
         </h1>

         <button className={ styles.start_button } type='button' onClick={ redirect }>
            recomeçar
         </button>
      </div>
   );
};

export default Finished;