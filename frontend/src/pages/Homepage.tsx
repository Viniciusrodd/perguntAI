
// import css

// components
import TextBase from "../components/home/TextBase";
import QuestionsNumber from "../components/home/QuestionsNumber";
import Difficulty from "../components/home/Difficulty";

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
      </div>
   );
};

export default Homepage;