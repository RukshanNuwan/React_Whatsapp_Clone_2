import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import {useStateValue} from "./StateProvider";
import './App.css';

const App = () => {
  const [{user}, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login/>
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar/>
            <Routes>
              <Route path="/" element={<Chat/>}/>
              <Route path="/rooms/:roomId" element={<Chat/>}/>
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
};

export default App;
