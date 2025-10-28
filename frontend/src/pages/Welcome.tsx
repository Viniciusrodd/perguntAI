
// import css
import styles from '../styles/Welcome.module.css';

// import images
import welcome_robot_img from '../../public/images/welcome/welcome_robot.png'

// import hooks
import { useNavigate } from 'react-router-dom';


// welcome
const Welcome = () => {

   // variables
   const navigate = useNavigate();

   // functions
   const beginning_btt = () =>{
      navigate('/home');
   };
   

   // jsx

   return (
      <div className='home_default_container'>
         <img 
            src={ welcome_robot_img } 
            alt="welcome_robot_image" 
            className={ styles.welcome_robot_img }
         />
         
         <h1 className={ styles.title }>
            Olá, bem vindo/a ao PerguntAI
         </h1>

         <button className={ styles.start_button } type='button' onClick={ beginning_btt }>
            começar
         </button>
      </div>
   );
};

export default Welcome;