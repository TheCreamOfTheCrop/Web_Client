import * as React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Form } from 'react-bootstrap';

interface IPartFormProps {
  readonly name: string;
  readonly type: string;
  readonly value: string;
  setValue(e: any): void;
}
class RegisterPartForm extends React.Component<IPartFormProps, any> {
    constructor(props: IPartFormProps, context: any) {
      super(props, context);

      this.state = {
        controlId : 'Register' + props.name
      };
    }
    getValidationState() {
      const length: number = this.props.value.length;
      if (length > 10) return 'success';
      else if (length > 5) return 'warning';
      else if (length > 0) return 'error';
      return null;
    }
    render() {
     return (
        <FormGroup
          controlId={this.state.controlId}
          validationState={this.getValidationState()}
        >
          <ControlLabel>Email :</ControlLabel>
          <FormControl
            type={this.props.type}
            value={this.props.value}
            placeholder="Enter text"
            onChange={this.props.setValue}
          />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
        </FormGroup>
      );
    }
}

class RegisterForm extends React.Component<any, any> {
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
        <RegisterPartForm 
          value={this.state.email}
          setValue={this.setEmail}
          name="Email"
          type="email"
        />

        <RegisterPartForm 
          value={this.state.password}
          setValue={this.setPassword}
          name="Password"
          type="password"
        />
      </Form>
    );
  }
}

export default RegisterForm;