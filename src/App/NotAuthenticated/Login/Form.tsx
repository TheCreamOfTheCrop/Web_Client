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

  getValidationState() {
    const length: number = this.state.email.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
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
                validationState={this.getValidationState()}
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
                validationState={this.getValidationState()}
            >
            <ControlLabel>Mot de passe:</ControlLabel>
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
              onClick={this.props.setAuth}
            >
              Sign In
            </Button>
        </Form>
    );
  }
}

export default LoginForm;