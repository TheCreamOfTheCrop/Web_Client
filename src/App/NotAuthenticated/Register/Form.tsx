import * as React from 'react';
import { Form, Button } from 'react-bootstrap';
import { RegisterPartForm } from './PartForm';
import { IRegisterFormState } from './Interfaces/IRegisterForm';
import { withRouter } from 'react-router';

class RegisterForm extends React.Component<any, IRegisterFormState> {
    constructor(props: any, context: IRegisterFormState) {
        super(props, context);

        // i'm sure i can refacto this
        this.setEmail = this.setEmail.bind(this);
        this.setFirstName = this.setFirstName.bind(this);
        this.setLastName = this.setLastName.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setConfirmPassword = this.setConfirmPassword.bind(this);

        this.getEmailValidation = this.getEmailValidation.bind(this);
        this.getPasswordValidation = this.getPasswordValidation.bind(this);
        this.getValidationState = this.getValidationState.bind(this);
        this.getConfirmPasswordValidation = this.getConfirmPasswordValidation.bind(this);

        this.showInformation = this.showInformation.bind(this);

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            lastName: '',
            firstName: '',
        };
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

    getEmailValidation() {
        let mailExpr = /[A-Za-z0-9]+@+[A-Za-z]+.[a-z]+/;
        if (mailExpr.test(this.state.email))
            return 'success' ;
        return 'error';
    }

    getPasswordValidation() {
        let majExpr = /[A-Z]+/;
        let numberExpr = /[0-9]+/;
        // plus de 4 caractère, une maj, un chiffre
        let success = this.state.password.length > 4
                             && majExpr.test(this.state.password)
                             && numberExpr.test(this.state.password);
        
        if (success) return 'success';
        return 'error';
    }

    getConfirmPasswordValidation() {
        let success = this.state.password === this.state.confirmPassword;
        if (success) return 'success';
        return 'error';
    }

    getSnapshotBeforeUpdate() {
        this.getValidationState();
    }

    getValidationState() {
        let success: boolean = this.getEmailValidation() === 'success'
                                            && this.getPasswordValidation() === 'success'
                                            && this.getConfirmPasswordValidation() === 'success';
        if (success) 
            return false;
        else
            return true;
    }

    showInformation(e: any) {
        var payload = {
            email: this.state.email,
            password: this.state.password,
            lastname: this.state.lastName,
            firstname: this.state.firstName
        };
        
        fetch('http://' + process.env.REACT_APP_BMB_API + '/user/register', {
            method: 'POST',
            body: JSON.stringify(payload) ,
            mode: 'no-cors',
            headers: new Headers({
                'Content-Type': 'application/json'
              }),
        })
        .then((res) => { 
            return res.json(); 
        })
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
                <RegisterPartForm 
                    value={this.state.email}
                    setValue={this.setEmail}
                    validation={this.getEmailValidation}
                    name="Email"
                    type="email"
                />

                <RegisterPartForm 
                    value={this.state.firstName}
                    setValue={this.setFirstName}
                    validation={() => null}
                    name="First Name"
                    type="text"
                />

                <RegisterPartForm 
                    value={this.state.lastName}
                    setValue={this.setLastName}
                    validation={() => null}
                    name="Last name"
                    type="text"
                />

                <RegisterPartForm 
                    value={this.state.password}
                    setValue={this.setPassword}
                    validation={this.getPasswordValidation}
                    name="Password"
                    type="password"
                />

                <RegisterPartForm 
                    value={this.state.confirmPassword}
                    setValue={this.setConfirmPassword}
                    validation={this.getConfirmPasswordValidation}
                    name="Confirm Password"
                    type="password"
                />
                    
                <Button
                    type="submit"
                    disabled={this.getValidationState()}
                    onClick={this.showInformation}
                >
                    Sign Up
                </Button>
            </Form>
        );
    }
}

export default withRouter(RegisterForm);