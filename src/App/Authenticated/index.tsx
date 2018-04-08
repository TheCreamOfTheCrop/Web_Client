import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, Row } from 'react-bootstrap';

const logo = require('../logo.png');

class Profil extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
    }
    render() {
        return (
            <div>
                Profil in progress
            </div>
            );
    }
}
const Home = () => (
    <div>
        Home in progress
    </div>
);

class Authenticated extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.disconnect = this.disconnect.bind(this);
    }

    disconnect() {
        let sessionKey  = String(process.env.REACT_APP_AUTH_SESSION_KEY);
        window.sessionStorage.setItem(sessionKey, 'null');
        this.setState({});
    }
    render() {
        return(
            <Router>
                <div>
                    <Row>
                        <Navbar inverse collapseOnSelect>
                            <Navbar.Collapse>
                                <Nav>
                                    <NavItem eventKey={1} href="#">
                                        Menu
                                    </NavItem>
                                </Nav>
                                <Nav pullRight>
                                    <NavItem eventKey={1} href="#">
                                        <Link to="/profil">preference</Link>
                                    </NavItem>
                                    <NavItem eventKey={2} href="#">
                                        <a role="button" onClick={this.disconnect}>disconnect</a>
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
                            <Route path="/profil" component={Profil} />
                    </Row>
                </div>
            </Router>
        );
    }
} 

export default Authenticated;