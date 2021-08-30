import { useState } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Authorization from './components/Authorization';
import './App.css';
import Login from './views/Login';
import Home from './views/Home';
import { LoginContext } from './helpers/Context';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  console.log(isAuth)
  
  return (
      <LoginContext.Provider value={{isAuth, setIsAuth}}>
      <Router>
        <Route path="/" exact>
          <Login/>
        </Route>
      <Authorization path="/home" component={Home} isAuth={isAuth}/>
      </Router>
    </LoginContext.Provider>
  );
}

export default App;
