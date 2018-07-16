import * as React from 'react';
import { Panel, PanelGroup, Row, Col, Button, Alert, ButtonGroup } from 'react-bootstrap';
import PartForm from './PartForm';
import { postWithPayload } from '../post';
// import { postWithPayload } from '../post';

const logo = require('../../logo.png');

interface IProfilState {
    rawUser: string;
    id: number;
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
        this.sendByMail = this.sendByMail.bind(this);
        this.state = {
            rawUser: user,
            id: user.id,
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
    sendByMail() {
        //
        postWithPayload('http://' + process.env.REACT_APP_BMB_API + '/note/listNoteMadeByUser',
                        {
                            id: this.state.id
                        }).then((res) => {
                            var element = document.createElement('a');
                            var file = new Blob(res.note, {type: 'text/plain'});
                            element.href = URL.createObjectURL(file);
                            element.download = 'rgpdBmybank.txt';
                            element.click();
                        });
    }
    delete() {
        // postWithPayload('http://' + process.env.REACT_APP_BMB_API + '/user/delete',
        //                 {
        //                     id: this.state.id
        //                 });
    }
    update() {
        // let url = 'http://' + process.env.REACT_APP_BMB_API + '/resetPassword';
        // We need to use the old password too
        // postWithPayload(url, {password:this.state.newPassword})
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
                    <Panel eventKey="3">
                        <Panel.Heading>
                            <Panel.Title toggle>Personal Data</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <p> For the application to work properly, we need some of your data's<br/>
                                    When you signed in, you already authorized us to keep them in our database
                                    If you wish to know which information we keep on you we can send them 
                                    by direct download
                                     You can also destroy all trace of them in our database</p>
                            <Alert bsStyle="warning">
                            Warning! Deletion of your data will also delete your account
                            </Alert>
                            <ButtonGroup>
                                <Button
                                    bsStyle="warning"
                                    onClick={this.sendByMail}
                                >
                                    Send data by direct download
                                </Button>

                                <Button
                                    bsStyle="danger"
                                    onClick={this.delete}
                                >
                                    Delete all data
                                </Button>
                            </ButtonGroup>
                        </Panel.Body>
                    </Panel>
                </PanelGroup>
            </Col>
            );
    }
}

export default Profil;