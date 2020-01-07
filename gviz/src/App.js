import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './Components/Login';
import Landing from './Components/Landing';
import Register from './Components/Register';
import Profile from './Components/Profile';
import Projects from './Components/Projects';
import NavBar from './Components/NavBar';
import './App.css';

import 'antd/dist/antd.css';


class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/">
        <div className="App">
          <NavBar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path= "/register" component={Register}/>
            <Route exact path= "/login" component={Login}/>
            <Route exact path= "/projects" component={Projects}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App