import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Navbar, Nav, NavItem, Row, Col, Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import Login from './Login';
import Home from './Home';
import Register from './Register';

const logo = require('../logo.png');

class ForgotPassword extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
            email: ''
        };
    }
    setEmail(e: any) {
        this.setState({ email: e.target.value });
    }
    askNewPassword() {
        fetch('http://' + process.env.REACT_APP_BMB_API + '/user/forgetPassword', {
            method: 'POST',
            body: JSON.stringify({email: this.state.email}) ,
            mode: 'no-cors',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        })
        .then((res) => { 
            return res.json(); 
        })
        .then((returnData) => { 
            alert(JSON.stringify(returnData) ); 
            this.props.history.push('/register/after');
        })
        .catch((err) => {
            console.log(err);
        });
    }
    render() {
        return (
        <Form>
            <FormGroup
                controlId="forgetPassword"
            >
                <ControlLabel>Email :</ControlLabel>
                <FormControl
                    type="email"
                    value={this.state.email}
                    placeholder="Enter email"
                    onChange={this.props.setEmail}
                />
                <FormControl.Feedback />
            </FormGroup>
            <Button
                type="submit"
                onClick={this.askNewPassword}
            >
                Get new password
            </Button>
        </Form>
        );
    }
}

const NotAuthenticated = (props: any) => (
    <Router>
        <div>
            <Row>
                <Navbar inverse collapseOnSelect>
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