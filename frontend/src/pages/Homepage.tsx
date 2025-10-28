
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
         { 
            destiny === 'textBase' ? (
               <>               
                  {/* text base */}
                  <TextBase />
               </>
            ) : null
         }
         {
            destiny === 'questionsNumber' ? (
               <>               
                  {/* questions number */}
                  <QuestionsNumber />
               </>
            ) : null
         }
      </div>
   );
};

export default Homepage;