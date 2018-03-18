import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, Row, Col } from 'react-bootstrap';

import Login from './NotAuthenticated/Login';
import Home from './NotAuthenticated/Home';
import Register from './NotAuthenticated/Register';

import './App.css';

const logo = require('./logo.png');

interface IAppState {
    isAuthenticated: boolean;
}

const notAuthenticatedRoute = () => (
    <Col md={4} mdOffset={4} xs={6} xsOffset={3}>
        <Route path="/login" render={Login} />
        <Route path="/register" component={Register} />
    </Col>
);

const authenticatedRoute = () => (
    <Col md={8} mdOffset={2} xs={6} xsOffset={3}>
        You are connected: Website still in construction
    </Col>
);
class App extends React.Component<any, IAppState> {
    constructor(props: any, context: IAppState) {
        super(props, context);
        
        this.state = {
            isAuthenticated: false
        };
    }

    setAuth() {
        this.setState({
            isAuthenticated: !this.state.isAuthenticated
        });
    }

    render() {
        return (
        <Router>
            <div className="App">
                <Row>
                    <Navbar inverse collapseOnSelect>
                        <Navbar.Collapse>
                            <Nav pullRight>
                                <NavItem eventKey={1} href="#">
                                    <Link to="/login">Sign in</Link>
                                </NavItem>
                                <NavItem eventKey={2} href="#">
                                    <Link to="/register">Sign up</Link>
                                </NavItem>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Row>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                <Row>
                    <Route exact path="/" component={Home} />
                    {this.state.isAuthenticated ? authenticatedRoute() : notAuthenticatedRoute()}
                </Row>
            </div>
        </Router>
        );
    }
}

export default App;
