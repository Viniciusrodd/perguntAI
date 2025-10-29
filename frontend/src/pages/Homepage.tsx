
// import css

// components
import TextBase from "../components/home/TextBase";
import QuestionsNumber from "../components/home/QuestionsNumber";
import Difficulty from "../components/home/Difficulty";
import QuestionsType from "../components/home/QuestionsType";
import Language from "../components/home/Language";

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
         { destiny === 'textBase' && <TextBase /> }
         { destiny === 'questionsNumber' && <QuestionsNumber /> }
         { destiny === 'difficulty' && <Difficulty /> }
         { destiny === 'questionsType' && <QuestionsType /> }
         { destiny === 'language' && <Language /> }
      </div>
   );
};

export default Homepage;