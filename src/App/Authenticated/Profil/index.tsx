import * as React from 'react';
import { Panel, PanelGroup, Row, Col, Button } from 'react-bootstrap';
import PartForm from './PartForm';
// import { postWithPayload } from '../post';

const logo = require('../../logo.png');

interface IProfilState {
    lastname: string;
    firstname: string;
    avatar: string;
    email: string;
    isAccountValid: boolean;

    oldPassword: string;
    newPassword: string;
    newPasswordConfirmation: string;
}

class Profil extends React.Component<any, IProfilState> {
    constructor(props: any, context: IProfilState) {
        super(props, context);
        let sessionKey = String(process.env.REACT_APP_AUTH_SESSION_KEY);
        let session: any = JSON.parse(String(window.sessionStorage.getItem(sessionKey)));
        let user: any = session.user;
        if (user.isAccountValidate === null)
            user.isAccountValidate = false;

        this.getPasswordValidation = this.getPasswordValidation.bind(this);
        this.getConfirmPasswordValidation = this.getConfirmPasswordValidation.bind(this);
        this.getValidation = this.getValidation.bind(this);

        this.setNewPassword = this.setNewPassword.bind(this);
        this.setOldPassword = this.setOldPassword.bind(this);
        this.setConfirmPassword = this.setConfirmPassword.bind(this);

        this.update = this.update.bind(this);
        this.state = {
            lastname: user.lastname,
            firstname: user.firstname,
            avatar: user.avatar,
            email: user.email,
            isAccountValid: user.isAccountValidate,
            oldPassword: '',
            newPassword: '',
            newPasswordConfirmation: ''
        };
    }
    getPasswordValidation() {
        let majExpr = /[A-Z]+/;
        let numberExpr = /[0-9]+/;
        // plus de 4 caractère, une maj, un chiffre
        let success = this.state.newPassword.length > 4
                             && majExpr.test(this.state.newPassword)
                             && numberExpr.test(this.state.newPassword);
        
        if (success) return 'success';
        return 'error';
    }
    getConfirmPasswordValidation() {
        let success = this.state.newPassword === this.state.newPasswordConfirmation;
        if (success) return 'success';
        return 'error';
    }

    getValidation() {
        let success: boolean = this.getPasswordValidation() === 'success'
                                            && this.getConfirmPasswordValidation() === 'success';
        return !success;
    }

    setOldPassword(e: any) {
        this.setState({oldPassword: e.target.value});
    }
    setNewPassword(e: any) {
        this.setState({newPassword: e.target.value});
    }
    setConfirmPassword(e: any) {
        this.setState({newPasswordConfirmation: e.target.value});
    }

    update() {
        // let url = 'http://' + process.env.REACT_APP_BMB_API + '/';
        // npostWithPayload(url, {})
        // .then()
    }
    render() {
        return (
            <Col md={8} mdOffset={2}>
                <PanelGroup accordion id="AccountInformation" defaultActiveKey="1">
                    <Panel eventKey="1">
                        <Panel.Heading>
                            <Panel.Title toggle>Login Information</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                        <Row>
                            <img width={128} height={128} src={logo} alt="thumbnail" />
                        </Row>
                        <Row>
                            Email: {this.state.email}
                        </Row>
                        <Row>
                            Last Name : {this.state.lastname}
                        </Row>
                        <Row>
                            First Name : {this.state.firstname}
                        </Row>
                        <Row>
                            Account Valid: {this.state.isAccountValid ? 'Yes' : 'No'}
                        </Row>
                        </Panel.Body>
                    </Panel>
                    <Panel eventKey="2">
                        <Panel.Heading>
                            <Panel.Title toggle> Update Password </Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <PartForm
                                value={this.state.oldPassword}
                                setValue={this.setOldPassword}
                                validation={() => null}
                                name="Old Password"
                                type="password"
                            />
                            <PartForm
                                value={this.state.newPassword}
                                setValue={this.setNewPassword}
                                validation={this.getPasswordValidation}
                                name="New Password"
                                type="password"
                            />
                            <PartForm
                                value={this.state.newPasswordConfirmation}
                                setValue={this.setConfirmPassword}
                                validation={() => null}
                                name="confirmPassword"
                                type="password"
                            />

                            <Button
                                disabled={this.getValidation()}
                                onClick={this.update}
                            >
                                Update
                            </Button>
                        </Panel.Body>
                    </Panel>
                </PanelGroup>
            </Col>
            );
    }
}

export default Profil;