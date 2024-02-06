import './App.css';
import Nav from './components/Nav'
import Home from './components/Home'
import Inbox from './components/Inbox'
import Message from './components/Message'
import AddUser from './components/AddUser'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ResolutionError from './components/ResolutionError';


function App() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Router>      
      {screenWidth>=800 ? (<div className="App">
          <Nav />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/inbox' element={<Inbox />}/>
            <Route path='/send-a-message' element={<Message />}/>
            <Route path='/AddUser' element={<AddUser />}/>
          </Routes>
          <Footer />
      </div>) : (
        <ResolutionError />
      )}
    </Router>
  );
}

export default App;
