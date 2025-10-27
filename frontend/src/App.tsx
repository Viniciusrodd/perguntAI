// import css
import './App.css'

// import hooks
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import pages
import Welcome from './pages/Welcome';
import Homepage from './pages/Homepage';


// app
function App() {
   return (
      <div className='app'>
         <BrowserRouter>
            <Routes>
               {/* welcome */}
               <Route path='/' element={ <Welcome /> } />
               {/* homepage */}
               <Route path='/home' element={ <Homepage /> } />
            </Routes>
         </BrowserRouter>
      </div>
   );
};
export default App;