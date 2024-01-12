import './App.css';
import Nav from './components/Nav'
import Home from './components/Home'
import About from './components/About'
import Inbox from './components/Inbox'
import Message from './components/Message'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
          <Nav />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/about' element={<About />}/>
            <Route path='/inbox' element={<Inbox />}/>
            <Route path='/send-a-message' element={<Message />}/>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
