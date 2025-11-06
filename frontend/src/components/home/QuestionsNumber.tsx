
// import css
import styles from '../../styles/home/Questions.module.css';

// import components
import NextPageBtt from '../NextPageBtt';
import ExitBtt from '../ExitBtt';
import ProgressBar from '../ProgressBar';
import Modal from '../Modal';

// import hooks
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';

// import context
import { OptionsContext } from '../../contexts/QuestionsOptions/Options.context';

// import interfaces
import type { iModalConfig } from '../../../../shared/interfaces/modal.interface';


// questions number
const QuestionsNumber = () => {
   
   //// variables
   const navigate = useNavigate();
   const { numQuestions, setNumQuestions } = useContext(OptionsContext);
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

   // questions check
   const questions_check = () =>{
      if(numQuestions === 0){
         modal_config({
            title: 'Só um segundo ❗️', 
            msg: `Insira quantas questões deseja para prosseguir 🔍`, 
            btt1: false, btt2: 'Voltar', display: true
         });
      }else{
         nextBtt();
      }
   }
 
   // home - navigate
   const nextBtt = () =>{
      navigate('/home/difficulty');
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
         
         { /* progress bar 25% */ }
         <ProgressBar />

         <h1 className='title_default'>
            Quantas questões deseja ?
         </h1>

         <div className={ styles.questions_container }>
            <select 
               title='questions' 
               name="questions" 
               className={ styles.questions_select }
               value={ numQuestions }
               onChange={ (e: React.ChangeEvent<HTMLSelectElement>) => 
                  setNumQuestions(e.target.value === '' ? 0 : parseInt(e.target.value)
               ) }   
            >
               <option value={ 0 }>Selecione uma opção</option>
               <option value={ 1 }>1</option>
               <option value={ 2 }>2</option>
               <option value={ 3 }>3</option>
               <option value={ 4 }>4</option>
               <option value={ 5 }>5</option>
               <option value={ 6 }>6</option>
               <option value={ 7 }>7</option>
               <option value={ 8 }>8</option>
               <option value={ 9 }>9</option>
               <option value={ 10 }>10</option>
            </select>
         </div>

         { /* next page button */ }
         <NextPageBtt destiny={ questions_check } />

         { /* exit button */ }
         <ExitBtt destiny='baseText' />
      </div>
   );
};

export default QuestionsNumber;