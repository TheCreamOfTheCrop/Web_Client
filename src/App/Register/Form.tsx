import * as React from 'react';
import { Form, Button } from 'react-bootstrap';
import { RegisterPartForm } from './PartForm';
import { IRegisterFormState } from './Interfaces/IRegisterForm';

export default class RegisterForm extends React.Component<any, IRegisterFormState> {
    constructor(props: any, context: IRegisterFormState) {
        super(props, context);

        this.setEmail = this.setEmail.bind(this);
        this.setFirstName = this.setFirstName.bind(this);
        this.setLastName = this.setLastName.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setConfirmPassword = this.setConfirmPassword.bind(this);
        
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            lastName: '',
            firstName: '',
            disableSubmit: false,
        };
    }

    getValidationState() {
        const length: number = this.state.email.length;
        // faudrais voir les conditions de validation
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    setEmail(e: any) {
        this.setState({ email: e.target.value });
    }

    setFirstName(e: any) {
        this.setState({ firstName: e.target.value });
    }

    setLastName(e: any) {
        this.setState({ lastName: e.target.value });
    }

    setPassword(e: any) {
        this.setState({ password: e.target.value });
    }

    setConfirmPassword(e: any) {
        this.setState({ confirmPassword: e.target.value });
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
                    value={this.state.firstName}
                    setValue={this.setFirstName}
                    name="First Name"
                    type="text"
                />

                <RegisterPartForm 
                    value={this.state.lastName}
                    setValue={this.setLastName}
                    name="Last name"
                    type="text"
                />

                <RegisterPartForm 
                    value={this.state.password}
                    setValue={this.setPassword}
                    name="Password"
                    type="password"
                />

                <RegisterPartForm 
                    value={this.state.confirmPassword}
                    setValue={this.setConfirmPassword}
                    name="Confirm Password"
                    type="password"
                />
                    
                <Button type="submit" disabled={this.state.disableSubmit}>Sign Up</Button>
            </Form>
        );
    }
}