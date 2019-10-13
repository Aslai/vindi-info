import React from 'react';
import TitlePage from 'pages/titles'
import HomePage from 'pages/home'
import _ from 'lodash'
import 'react-table/react-table.css'
import './App.css';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

let store = {};
function App() {
  return (
    <div className="App">
      <Router>
      <div className="app-nav">
        <span className="app-nav-item">Vindi Info</span>
        <Link to="/" className="app-nav-item">Home</Link>
        <Link to="/titles" className="app-nav-item">Titles</Link>
      </div>
      <div className="app-container">
      <Switch>
        <Route path="/titles">
        <TitlePage></TitlePage>
        </Route>
        <Route path="/">
          <HomePage></HomePage>
        </Route>
      </Switch>
      </div>
      </Router>
    </div>
  );
}

export default App;
