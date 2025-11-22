// import css
import './App.css'

// import hooks
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import pages
import Welcome from './pages/Welcome';
import Homepage from './pages/Homepage';
import QuestionsGenerated from './pages/QuestionsGenerated';
import Evaluation from './pages/Evaluation';


// app
function App() {
   return (
      <div className='app'>
         <BrowserRouter>
            <Routes>
               {/* welcome */}
               <Route path='/' element={ <Welcome /> } />
               {/* homepage */}
               <Route path='/home/:destiny' element={ <Homepage /> } />               
               {/* questions generated */}
               <Route path='/questions/:sessionID' element={ <QuestionsGenerated /> } />
               {/* evaluation page */}
               <Route path='/evaluation' element={ <Evaluation /> } />

               { /* not found route */ }
               <Route path='*' element={ <Welcome /> } />
            </Routes>
         </BrowserRouter>
      </div>
   );
};
export default App;