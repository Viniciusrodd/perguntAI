
// import css
import styles from '../../styles/home/Questions.module.css';

// import components
import NextPageBtt from '../NextPageBtt';
import ExitBtt from '../ExitBtt';
import ProgressBar from '../ProgressBar';
import Modal from '../Modal';

// import hooks
import { useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';

// import context
import { OptionsContext } from '../../contexts/QuestionsOptions/Options.context';

// import interfaces
import type { iModalConfig } from '../../../../shared/interfaces/modal.interface';

// types
type QuestionType = 'open' | 'multipleChoice' | 'mix';


// questions type
const QuestionsType = () => {
   
   //// variables
   const navigate = useNavigate();
   const { questionType, setQuestionType } = useContext(OptionsContext);
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

   // question type check
   const question_check = () =>{
      if(!questionType){
         modal_config({
            title: 'Só um segundo ❗️', 
            msg: `Insira um tipo de questão que deseja para prosseguir 🔍`, 
            btt1: false, btt2: 'Voltar', display: true
         });
      }else{
         nextBtt();
      }
   }    

   // language - navigate
   const nextBtt = () =>{
      navigate('/home/language');
   };

   
   //// jsx


   return (
      <div className='questions_default_container'>
         { /* modal */ }
         <Modal 
            title={ modal_title }
            msg={ modal_msg }
            btt1={ modal_btt }
            btt2={ modal_btt_2 }
            display={ modal_display }
            onClose={ closeModal }
         />          
     
         { /* progress bar 75% */ }
         <ProgressBar />

         <h1 className='title_default'>
            Qual o tipo da questão ?
         </h1>

         <div className={ styles.questions_container }>
            <select 
               title='questions' 
               name="questions" 
               className={ styles.questions_select }
               value={ questionType }
               onChange={ 
                  (e: React.ChangeEvent<HTMLSelectElement>) => 
                     setQuestionType(e.target.value as QuestionType) 
               }
            >
               <option value="">Selecione uma opção</option>
               <option value="open">Aberta</option>
               <option value="multipleChoice">Múltipla escolha</option>
               <option value="mix">Misturado</option>
            </select>
         </div>

         { /* next page button */ }
         <NextPageBtt destiny={ question_check } />

         { /* exit button */ }
         <ExitBtt destiny='difficulty' />
      </div>
   );
};

export default QuestionsType;