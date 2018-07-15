import * as React from 'react';
import { Row, Col, Label, Button, Modal, ButtonGroup } from 'react-bootstrap';
import ILoan from './Interface/ILoan';
import { postWithPayload } from '../post';

interface IAcceptLoanProps {
    isOpen: boolean;
    openClose: () => void;

    loan: ILoan;
}

class AcceptLoan extends React.Component<IAcceptLoanProps, any> {
    constructor(props: IAcceptLoanProps, context: any) {
        super(props, context);

        let sessionKey = String(process.env.REACT_APP_AUTH_SESSION_KEY);
        let session: any = JSON.parse(String(window.sessionStorage.getItem(sessionKey)));
        let user: any = session.user;
        this.state = {
            myEmail: user.email
        };
    }
    componentDidMount() {
        postWithPayload(
            'http://' + process.env.REACT_APP_BMB_API + '/refund/list',
            {loan_id: this.props.loan.id})
            .then((res) => {
                this.setState({historic: res.refunds});
            });
    }
    goToLydia() {
        // i still have to test it
        postWithPayload('http://' + process.env.REACT_APP_BMB_API + '/loan/accept', 
                        { id_loan: this.props.loan.id });
    }
    render() {
        return ( 
                <Col md={12}>
                    <Modal show={this.props.isOpen} onHide={this.props.openClose}>
                        <Modal.Body>
                            <h4>
                                Amount of loan :<Label bsStyle="primary">{this.props.loan.amount} €</Label>
                            </h4>
                            <h4>
                                Email :<Label bsStyle="warning">{this.state.myEmail}</Label>
                            </h4>
                     
                        </Modal.Body>
                        <Modal.Footer>
                            <Row>
                                <Col md={12}>
                                <ButtonGroup>
                                    <Button type="button" onClick={this.props.openClose}>Close</Button>
                                    <Button
                                        type="button"  
                                        bsStyle="success" 
                                        onClick={this.goToLydia}
                                    >Send to Lydia
                                    </Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </Modal.Footer>
                    </Modal>
                </Col>
            );
    }
}
export default AcceptLoan;