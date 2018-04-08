import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, Row, Col } from 'react-bootstrap';

import Login from './Login';
import Home from './Home';
import Register from './Register';

const logo = require('../logo.png');

const NotAuthenticated = (props: any) => (
    <Router>
        <div>
            <Row>
                <Navbar inverse collapseOnSelect>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">
                            <Link to="/login">Sign in</Link>
                        </NavItem>
                        <NavItem eventKey={2} href="#">
                            <Link to="/register">Sign up</Link>
                        </NavItem>
                    </Nav>
                </Navbar>
            </Row>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
            <Row>
                <Route exact path="/" component={Home} />
                <Col md={4} mdOffset={4} xs={6} xsOffset={3}>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Col>
            </Row>
        </div>
    </Router>
);

export default NotAuthenticated;