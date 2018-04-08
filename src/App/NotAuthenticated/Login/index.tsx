import * as React from 'react';
import LoginForm from './Form';
import { Panel } from 'react-bootstrap';

class Login extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.connect = this.connect.bind(this);
    }
    connect(loginState: any) {
        // i will probably put all the login
        var payload = {
            email: loginState.email,
            password: loginState.password
        };
        
        var data = new FormData();
        data.append( 'json', JSON.stringify( payload ) );
        
        fetch('http://' + process.env.REACT_APP_BMB_API + '/user/login', {
            method: 'POST',
            body: JSON.stringify(payload) ,
            mode: 'no-cors',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        })
        .then((res) => { 
            return res; 
        })
        .then((returnData) => { 
            window.sessionStorage.setItem(String(process.env.REACT_APP_AUTH_SESSION_KEY), 'true');
        })
        .catch((err) => {
            console.log(err);
        });
        window.sessionStorage.setItem(String(process.env.REACT_APP_AUTH_SESSION_KEY), 'true');
    }
    render() {  
        return(
        <Panel bsStyle="danger">
            <Panel.Heading>Sign in</Panel.Heading>
            <Panel.Body>
                <LoginForm connect={this.connect}/>
            </Panel.Body>
            <Panel.Footer>
                <a href="/forgetPassword">forgot password</a>
            </Panel.Footer>
        </Panel>
        );
    }
}

export default Login;