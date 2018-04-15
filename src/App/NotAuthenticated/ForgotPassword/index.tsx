import * as React from 'react';
import { Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import post from '../post';

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
        post('http://' + process.env.REACT_APP_BMB_API + '/user/forgetPassword', {email: this.state.email})
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
                type="button"
                onClick={this.askNewPassword}
            >
                Get new password
            </Button>
        </Form>
        );
    }
}

export default ForgotPassword;