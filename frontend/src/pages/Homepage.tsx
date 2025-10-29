
// import css

// components
import TextBase from "../components/home/TextBase";
import QuestionsNumber from "../components/home/QuestionsNumber";
import Difficulty from "../components/home/Difficulty";
import QuestionsType from "../components/home/QuestionsType";

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
      </div>
   );
};

export default Homepage;