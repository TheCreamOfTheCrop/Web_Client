import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import { Navbar, Nav, NavItem, Row, Col } from 'react-bootstrap';
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
                <Row>
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
                                <NavItem eventKey={2} href="#">
                                    <Link to="/register">Register</Link>
                                </NavItem>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Row>
                <Row>
                    <Route exact path="/" component={Home} />
                    <Col md={4} mdOffset={4}>
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                    </Col>
                </Row>
        </div>
      </Router>
    );
  }
}

export default App;
