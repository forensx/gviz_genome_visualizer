import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './Login';
import Landing from './Landing';
import Register from './Register';
import Projects from './Projects';
import '../../styles/App.css';

import 'antd/dist/antd.css';


class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/">
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Route exact path= "/register" component={Register}/>
          <Route exact path= "/login" component={Login}/>
          <Route exact path= "/projects" component={Projects}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App