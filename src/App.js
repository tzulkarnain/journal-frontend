import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={LandingPage} />
          <Route path="/createaccount" component={CreateAccount} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <footer>Curious Rose™</footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
