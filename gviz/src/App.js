import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Components/Home';
import Results from './Components/Results';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';


class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/">
        <div className="App">
          <Navbar bg="primary" variant="dark">
            <Navbar.Brand>
              <img
                src="./ForensX-Logo.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt = ""
              />
            </Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#features">GViz: Genome Visualizer</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="https://github.com/forensx/gviz_genome_visualizer" target="_blank" rel="noopener noreferrer">Check us out on GitHub!</Nav.Link>
              <img
                className="mr-sm-2 d-inline-block align-top"
                src="https://raw.githubusercontent.com/plotly/dash-sample-apps/master/apps/dashr-uber-rasterizer/assets/GitHub-Mark-64px.png"
                width="40"
                height="40"
                alt = ""
              />
            </Nav>
          </Navbar>
          <Route exact path="/" component={Home} />
          <Route path="/results" component={Results} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App