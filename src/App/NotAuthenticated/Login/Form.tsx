import * as React from 'react';
import { FormGroup, ControlLabel, FormControl, Form, Button } from 'react-bootstrap';

class LoginForm extends React.Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);

    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.connect = this.connect.bind(this);

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

  connect(e: any) {
    this.props.connect(this.state);
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
                type="password"
                value={this.state.password}
                placeholder="Password"
                onChange={this.setPassword}
            />
            </FormGroup>
            <Button
              onClick={this.connect}
            >
              Sign In
            </Button>
        </Form>
    );
  }
}

export default LoginForm;