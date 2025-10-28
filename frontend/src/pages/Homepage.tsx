
// import css

// components
import TextBase from "../components/home/TextBase";
import QuestionsNumber from "../components/home/QuestionsNumber";

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
      </div>
   );
};

export default Homepage;