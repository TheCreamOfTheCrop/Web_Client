import * as React from 'react';
import LoginForm from './Form';
import { Panel } from 'react-bootstrap';

const Login = (props: any) => (
    <Panel bsStyle="danger">
        <Panel.Heading>Sign in</Panel.Heading>
        <Panel.Body>
            <LoginForm setAuth={props.setAuth}/>
        </Panel.Body>
    </Panel>
);

export default Login;