// import css
import './App.css'

// import hooks
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import pages
import Welcome from './pages/Welcome';
import Homepage from './pages/Homepage';
import QuestionsGenerated from './pages/QuestionsGenerated';


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
               <Route path='/questions/:sessionID' element={ <QuestionsGenerated /> } />
            </Routes>
         </BrowserRouter>
      </div>
   );
};
export default App;