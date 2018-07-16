import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Navbar, Nav, NavItem, Row, Col } from 'react-bootstrap';

import Login from './Login';
import Home from './Home';
import Register from './Register';
import ForgotPassword from './ForgotPassword';

const logo = require('../logo.png');

const NotAuthenticated = (props: any) => (
    <Router>
        <div>
            <Row>
                <Navbar id="Bandeau" inverse collapseOnSelect>
                    <Nav>
                        <NavItem href="/">
                            Home
                        </NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="/login">
                            Sign in
                        </NavItem>
                        <NavItem eventKey={2} href="/register">
                            Sign up
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
                    <Route path="/forgetPassword" component={ForgotPassword} />
                </Col>
            </Row>
        </div>
    </Router>
);

export default NotAuthenticated;