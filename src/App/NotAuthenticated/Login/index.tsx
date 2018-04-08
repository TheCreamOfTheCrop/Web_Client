import * as React from 'react';
import LoginForm from './Form';
import { Panel } from 'react-bootstrap';

class Login extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.connect = this.connect.bind(this);
    }
    connect(e: any) {
        // i will probably put all the login
        window.sessionStorage.setItem(String(process.env.REACT_APP_AUTH_SESSION_KEY), 'true');
    }
    render() {  
        return(
        <Panel bsStyle="danger">
            <Panel.Heading>Sign in</Panel.Heading>
            <Panel.Body>
                <LoginForm connect={this.connect}/>
            </Panel.Body>
        </Panel>
        );
    }
}

export default Login;