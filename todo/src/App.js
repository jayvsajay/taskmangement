import React, { Suspense, lazy } from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
const Login= React.lazy(() => import('./components/Login'));
const Signup= React.lazy(() => import('./components/Signup'));
const Dashboard= React.lazy(() => import('./components/Dashboard'));
const Task= React.lazy(() => import('./components/Task'));
const Home= React.lazy(() => import('./components/Home'));
function App() {
  return (
    <div className="App">
     <Router>
     <Suspense fallback={<div className='mt-5'>Loading...</div>}>
       <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/Signup" element={<Signup/>}/>
         <Route path="/dashboard" element={<Dashboard/>}/>
         <Route path="/task" element={<Task/>}/>
       </Routes>
       </Suspense>
     </Router>
    </div>
  );
}

export default App;
