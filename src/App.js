import './App.css';

import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage.jsx'
import Home from './components/Home/Home.jsx'
import GameDetail from './components/GameDetail/GameDetail.jsx';
import CreateGame from './components/CreateGame/CreateGame.jsx';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path={'/'} component={LandingPage}/>
          <Route path={'/home'} component={Home}/>
          <Route path={'/videogame/:id'} component={GameDetail}/>
          <Route path={'/newGame'} component={CreateGame}/>
        </Switch>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
