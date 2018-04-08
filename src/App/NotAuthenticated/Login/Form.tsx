import * as React from 'react';
import { FormGroup, ControlLabel, FormControl, Form, Button } from 'react-bootstrap';

class LoginForm extends React.Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);

    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);

    this.state = {
      email: '',
      password: ''
    };
  }

  setEmail(e: any) {
    this.setState({ email: e.target.value });
  }

  setPassword(e: any) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
        <Form>
            <FormGroup
                controlId="LoginEmail"
            >
            <ControlLabel>Email :</ControlLabel>
            <FormControl
                type="email"
                value={this.state.email}
                placeholder="Enter text"
                onChange={this.setEmail}
            />
            </FormGroup>

            <FormGroup
                controlId="LoginPassword"
            >
            <ControlLabel>Password:</ControlLabel>
            <FormControl
                type="text"
                value={this.state.password}
                placeholder="Password"
                onChange={this.setPassword}
            />
            </FormGroup>
            <Button
              type="submit"
              disabled={this.state.disableSubmit}
              onClick={this.props.connect}
            >
              Sign In
            </Button>
        </Form>
    );
  }
}

export default LoginForm;