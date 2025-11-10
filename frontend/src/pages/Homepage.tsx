
// import css

// components
import BaseText from "../components/home/BaseText";
import QuestionsNumber from "../components/home/QuestionsNumber";
import Difficulty from "../components/home/Difficulty";
import QuestionsType from "../components/home/QuestionsType";
import Language from "../components/home/Language";
import QuestionsGenerated from "./QuestionsGenerated";

// hooks
import { useParams } from "react-router-dom";


// homepage
const Homepage = () => {
   // variables
   const { destiny } = useParams();

   // functions

   // jsx

   return (
      <div>
         { destiny === 'baseText' && <BaseText /> }
         { destiny === 'questionsNumber' && <QuestionsNumber /> }
         { destiny === 'difficulty' && <Difficulty /> }
         { destiny === 'questionsType' && <QuestionsType /> }
         { destiny === 'language' && <Language /> }
         { destiny === 'questions' && <QuestionsGenerated /> }
      </div>
   );
};

export default Homepage;