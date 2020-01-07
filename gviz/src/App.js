import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './Components/Login';
import Projects from './Components/Projects';
import './App.css';

import 'antd/dist/antd.css';


class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/">
        <div className="App">
          <Route exact path="/" component={Login} />
          <Route path="/projects" component={Projects} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App