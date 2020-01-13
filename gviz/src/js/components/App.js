import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './Login_Register/Login';
import Register from './Login_Register/Register';
import ProjectDashboard from './ProjectsDashboard/ProjectDashboard';
import '../../styles/App.css';

import 'antd/dist/antd.css';


class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/">
        <div className="App">
          <Route exact path="/" component={Login} />
          <Route exact path= "/register" component={Register}/>
          <Route exact path= "/projects" component={ProjectDashboard}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App