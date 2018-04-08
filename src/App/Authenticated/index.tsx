import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Navbar, Nav, NavItem, Row, Col } from 'react-bootstrap';
import Profil from './Profil';
import Loans from './Loans';
import Home from './Home';

const logo = require('../logo.png');

class Authenticated extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.disconnect = this.disconnect.bind(this);
        this.openThisMenu = this.openThisMenu.bind(this);

        this.state = {
            openMenu: false
        };
    }

    disconnect() {
        let sessionKey  = String(process.env.REACT_APP_AUTH_SESSION_KEY);
        let sessionId = '';
        fetch('http://' + process.env.REACT_APP_BMB_API + '/user/logout', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': sessionId
            }),
        })
        .then((res) => { 
            return res; 
        })
        .then((returnData) => { 
            window.sessionStorage.setItem(sessionKey, 'null');
            this.setState({});
        })
        .catch((err) => {
            console.log(err);
        });
       
    }
    handleSelect() {
        console.log('toto');
    }

    openThisMenu() {
        this.setState({openMenu: !this.state.openMenu});
    }
    render() {
        return(
            <Router>
                <div>
                    <Navbar id="Bandeau" inverse collapseOnSelect>
                        <Nav>
                            <NavItem 
                                eventKey={1} 
                                onClick={this.openThisMenu}
                            >
                                Menu
                            </NavItem>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="/profil">
                                Preference
                            </NavItem>
                            <NavItem eventKey={2} href="#" role="button" onClick={this.disconnect}>
                                Sign out
                            </NavItem>
                        </Nav>
                    </Navbar>
                    {this.state.openMenu ?
                        <Col  className="App-Menu" md={3}>
                            <Nav bsStyle="pills" stacked onSelect={this.handleSelect}>
                                <NavItem eventKey={1} href="/">
                                    Home
                                </NavItem>
                                <NavItem eventKey={2} href="/loans">
                                    Loans
                                </NavItem>
                            </Nav>
                        </Col> 
                        : null}
                    <Col md={this.state.openMenu ? 9 : 12}>
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo" />
                        </header>
                        <Row>
                            <Route exact path="/" component={Home} />
                            <Route path="/profil" component={Profil} />
                            <Route path="/loans" component={Loans} />
                        </Row>
                    </Col>
                </div>
            </Router>
        );
    }
} 

export default Authenticated;