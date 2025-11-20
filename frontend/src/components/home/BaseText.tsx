
// import css
import styles from '../../styles/home/BaseText.module.css';

// import components
import NextPageBtt from '../NextPageBtt';
import ExitBtt from '../ExitBtt';
import Modal from '../Modal';

// import hooks
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import context
import { OptionsContext } from '../../contexts/QuestionsOptions/Options.context';

// import interfaces
import type { iModalConfig } from '../../../../shared/interfaces/modal.interface';


// base text
const BaseText = () => {
   
   //// variables
   const navigate = useNavigate();
   const { text, setText } = useContext(OptionsContext); // context 
   const [ modal_display, setModal_display ] = useState<boolean>(false);
   const [ modal_title, setModal_title ] = useState<string>('');
   const [ modal_msg, setModal_msg ] = useState<string>('');
   const [ modal_btt, setmodal_btt ] = useState<boolean | string>(false);
   const [ modal_btt_2, setModal_btt_2 ] = useState<boolean | string>(false);


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

   // text check
   const text_check = () =>{
      if(text === ''){
         modal_config({
            title: 'Só um segundo ❗️', 
            msg: `Insira um texto para prosseguir 📃`, 
            btt1: false, btt2: 'Voltar', display: true
         });
      }else{
         nextBtt();
      }
   };
   
   // questions number - navigate
   const nextBtt = () =>{
      navigate('/home/questionsNumber');
   };


   //// jsx


   return (
      <div className='home_default_container'>
         { /* modal */ }
         <Modal 
            title={ modal_title }
            msg={ modal_msg }
            btt1={ modal_btt }
            btt2={ modal_btt_2 }
            display={ modal_display }
            onClose={ closeModal }
         />

         <h1 className='title_default'>
            Texto base
         </h1>

         <div className={ styles.textarea_container }>
            <textarea 
               name="" 
               id="" 
               title="base_text" 
               placeholder={`Insira-o aqui...`}
               className={ styles.textarea }
               value={ text }
               onChange={ (e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value) }
               maxLength={ 6000 }
            ></textarea>
            <p>*esse texto servirá de base para as questões</p>
            <p>*limite de 6 mil caracteres...</p>
         </div>

         { /* next page button */ }
         <NextPageBtt destiny={ text_check } />

         { /* exit button */ }
         <ExitBtt destiny='welcome' />
      </div>
   );
};

export default BaseText;