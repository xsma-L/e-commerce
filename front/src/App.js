import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Catalogue from './components/Catalogue.js';
import Custom from './components/Custom.js';
import Article from './components/Article.js';
import Profile from './components/Profile.js';

function App() {
  return (
      <Router>
          <Route exact path="/" component={Home} />
          <Route path="/inscription" component={Register} />
          <Route path="/connexion" component={Login} />
          <Route exact path="/mode-homme" component={Catalogue} />
          <Route exact path="/mode-femme" component={Catalogue} />
          <Route path="/:sexe/article/:id" component={Article} />
          <Route path="/custom" component={Custom} />
          <Route exact path="/profil" component={Profile} />
      </Router>
  );
}

export default App;
