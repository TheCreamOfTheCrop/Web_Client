import * as React from 'react';
import { Row, Col, Label, Button, Modal, ButtonGroup } from 'react-bootstrap';
import ILoan from './Interface/ILoan';
import { postWithPayload } from '../post';
import { PartFormPropsExtended } from './PartFormExtended';

interface IAddRefundProps {
    isOpen: boolean;
    openClose: () => void;

    loan: ILoan;
}

class AddRefund extends React.Component<IAddRefundProps, any> {
    constructor(props: IAddRefundProps, context: any) {
        super(props, context);
        this.setAmount = this.setAmount.bind(this);

        let sessionKey = String(process.env.REACT_APP_AUTH_SESSION_KEY);
        let session: any = JSON.parse(String(window.sessionStorage.getItem(sessionKey)));
        let user: any = session.user;

        this.state = {
            amount: 0,
            myEmail: user.email
        };
    }
    goToLydia() {
        // i still have to test it
        postWithPayload('http://' + process.env.REACT_APP_BMB_API + '/refund/add', 
                        {
                            loan_id: 130,
                            amount: 20
                        });
    }
    setAmount(e: any) {
        this.setState({amount: e.target.value});
    }
    render() {
        return ( 
                <Col md={12}>
                    <Modal show={this.props.isOpen} onHide={this.props.openClose}>
                        <Modal.Body>
                            <PartFormPropsExtended
                                value={this.state.amount}
                                setValue={this.setAmount}
                                validation={() => null}
                                name="Amount"
                                type="numeric"
                                addOn={'€'}
                            />
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
export default AddRefund;