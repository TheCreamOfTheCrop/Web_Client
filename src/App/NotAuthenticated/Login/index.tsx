import * as React from 'react';
import LoginForm from './Form';
import { Panel, Modal, Button, Row } from 'react-bootstrap';
import post from '../post';

interface ICredentials {
    email: string;
    password: string;
}

class Login extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.connect = this.connect.bind(this);
        this.closeErrorModal = this.closeErrorModal.bind(this);
        this.state = {
            showError: false,
            errorMessage: ''
        };
    }
    connect(loginState: ICredentials) {
        // i will probably put all the login
        var payload = {
            email: loginState.email,
            password: loginState.password
        };
        var url = 'http://' + process.env.REACT_APP_BMB_API + '/user/login';
        console.log(url);
        
        post(url, payload)
        .then((returnData) => {
            if (returnData.success === false) {
                this.setState({
                    errorMessage: returnData.message,
                    showError: true
                }) ;
            }
            else {
                let result =  JSON.stringify(returnData.result);
                window.sessionStorage.setItem(
                    String(process.env.REACT_APP_AUTH_SESSION_KEY),
                    result);
                window.location.reload();
            }
         
        })
        .catch((err) => {
            console.log(err);
        });
    }
    closeErrorModal() {
        this.setState({
            showError: false,
            errorMessage: ''
        });
    }
    render() {  
        return(
            <Row>
                <br/>
                <Panel>
                    <Panel.Heading>Sign in</Panel.Heading>
                    <Panel.Body>
                        <LoginForm connect={this.connect}/>
                    </Panel.Body>
                    <Panel.Footer>
                        <a href="/forgetPassword">Forgot password</a>
                    </Panel.Footer>
                </Panel>
                <Modal  show={this.state.showError} onHide={this.closeErrorModal}>
                    <Modal.Body>{this.state.errorMessage}</Modal.Body>
                
                    <Modal.Footer>
                    <Button onClick={this.closeErrorModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Row>
        );
    }
}

export default Login;