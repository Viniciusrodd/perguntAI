
// import css
import styles from '../styles/Welcome.module.css';

// import images
import welcome_robot_img from '../../public/images/welcome/welcome_robot.png'

// import hooks
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// import interfaces
import type { iModalConfig } from '../../../shared/interfaces/modal.interface';

// import components
import Modal from '../components/Modal';


// welcome
const Welcome = () => {
   
   //// variables
   const navigate = useNavigate();
   const [ modal_display, setModal_display ] = useState<boolean>(false);
   const [ modal_title, setModal_title ] = useState<string>('');
   const [ modal_msg, setModal_msg ] = useState<string>('');
   const [ modal_btt, setmodal_btt ] = useState<boolean | string>(false);
   const [ modal_btt_2, setModal_btt_2 ] = useState<boolean | string>(false);
   const [ modal_event, setModal_event ] = useState<string>('');


   //// functions


   // modal config
   const modal_config = ({ title, msg, btt1, btt2, display }: iModalConfig) => {
      setModal_title(title ?? '');
      setModal_msg(msg ?? '');
      setmodal_btt(btt1 ?? false);
      setModal_btt_2(btt2 ?? false);
      setModal_display(display ?? false);
   };   

   // close modal
   const closeModal = () =>{
      modal_config({
         title: '', msg: '', btt1: false, 
         btt2: false, display: false
      });
   };

   // modal event handler
   const modal_event_handler = () =>{
      if(modal_event === 'base_text'){
         nextBtt();
      }
   };

   // modal advice
   const modal_advice = () =>{
      modal_config({
         title: 'Como funciona o perguntAI:', 
         msg: `Você nos da um texto 📃 \n e com base nele, \n geramos quantas questões desejar 🦾 \n 
         🤖 simples assim 🤖`, 
         btt1: 'Bora!', btt2: false, display: true
      });

      // call btt1 event
      setModal_event('base_text')
   }

   // base text - navigate
   const nextBtt = () =>{
      navigate('/home/baseText');
   };
   

   //// jsx


   return (
      <div className={ styles.welcome_container }>
         { /* modal */ }
         <Modal 
            title={ modal_title }
            msg={ modal_msg }
            btt1={ modal_btt }
            btt2={ modal_btt_2 }
            display={ modal_display }
            onClose={ closeModal }
            modalEvent={ modal_event_handler }
         />

         <img 
            src={ welcome_robot_img } 
            alt="welcome_robot_image" 
            className={ styles.welcome_robot_img }
         />
         
         <h1 className={ styles.title }>
            Olá, bem vindo/a ao PerguntAI
         </h1>

         <button className={ styles.start_button } type='button' onClick={ modal_advice }>
            começar
         </button>
      </div>
   );
};

export default Welcome;