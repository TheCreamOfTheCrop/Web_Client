import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import { Navbar, Nav, NavItem, Grid } from 'react-bootstrap';
import './App.css';
import Register from './Register';

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Bienvenue dans BmyBank</h1>
          </header>
          <Grid className="App-intro">
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Home</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="#">
                            <Link to="/login">Login</Link>
                        </NavItem>
                        <NavItem eventKey={1} href="#">
                            <Link to="/register">Register</Link>
                        </NavItem>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Grid>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
        </div>
      </Router>
    );
  }
}

export default App;
