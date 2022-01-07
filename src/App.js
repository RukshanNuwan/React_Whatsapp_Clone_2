import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
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
            <Switch>
              <Sidebar/>

              <Route path="/rooms/:roomId">
                <Chat/>
              </Route>

              <Route path="/">
                <Chat/>
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
};

export default App;
