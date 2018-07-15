import * as React from 'react';
import { Row, Col, Button, ButtonGroup, FormGroup, Radio, Modal } from 'react-bootstrap';
import { postWithPayload } from '../post';
import { PartFormPropsExtended } from './PartFormExtended';
import ILoan from './Interface/ILoan';

interface IModifyProps {
    loan: ILoan;

    user?: any;
    openClose: () => void;
    isOpen: boolean;
}

class Modify extends React.Component<IModifyProps, any> {
    constructor(props: IModifyProps, context: any) {
        super(props, context);
        this.setAmount = this.setAmount.bind(this);
        this.setRate = this.setRate.bind(this);
        this.setDelay = this.setDelay.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.setPrivacy = this.setPrivacy.bind(this);

        this.modifyLoan = this.modifyLoan.bind(this);

        this.validateDescription = this.validateDescription.bind(this);
        this.state = {
            privacy: 'public',
            description: this.props.loan.description,
            amount: this.props.loan.amount,
            rate: this.props.loan.rate,
            delay: this.props.loan.delay
        };
    }
    setAmount(e: any) {
        this.setState({amount: e.target.value});
    }
    setRate(e: any) {
        this.setState({rate: e.target.value});
    }
    setDelay(e: any) {
        this.setState({delay: e.target.value});
    }
    setDescription(e: any) {
        this.setState({description: e.target.value});
    }
    setPrivacy(e: any) {
        this.setState({privacy: e.currentTarget.value});
    }

    validateDescription() {
        return this.state.description.length > 4 && this.state.description.length <= 255 ? 'success' : 'error';
    }
    modifyLoan() {
        // i still have to test it
        postWithPayload('http://' + process.env.REACT_APP_BMB_API + '/loan/updateloan', 
                        {
                            user_provider_id: this.props.loan.user_provider_id,
                            description: this.state.description, 
                            amount: this.state.amount, 
                            rate: this.state.rate, 
                            delay: this.state.delay ,
                            loan_type: this.state.privacy,
                            id_loan: this.props.loan.id
                        }).then(() => {
                            window.location.reload();
                        });

    }
    render() {
        return ( 
                <Col md={12}>
                    <Modal onHide={this.props.openClose} show={this.props.isOpen}>
                        <Modal.Header>
                            <h4> 
                                Modify Loan
                            </h4> 
                        </Modal.Header>
                        <Modal.Body>
                            <PartFormPropsExtended
                                value={this.state.amount}
                                setValue={this.setAmount}
                                validation={() => null}
                                name="Amount"
                                type="numeric"
                                addOn={'€'}
                            />
                            <PartFormPropsExtended
                                value={this.state.rate}
                                setValue={this.setRate}
                                validation={() => null}
                                name="Rate"
                                type="numeric"
                                addOn={'%'}
                            />
                            <PartFormPropsExtended
                                value={this.state.delay}
                                setValue={this.setDelay}
                                validation={() => null}
                                name="Duration"
                                type="numeric"
                                addOn={'Months'}
                            />
                            <Row>
                                <Col md={11} mdOffset={1}>
                                    <FormGroup>
                                        <Radio 
                                            name="privacy" 
                                            value="public"
                                            checked={this.state.privacy === 'public'} 
                                            onChange={this.setPrivacy} 
                                            inline
                                        >
                                            Public
                                        </Radio>{' '}
                                        <Radio 
                                            name="privacy"
                                            value="prive"
                                            checked={this.state.privacy === 'prive'}
                                            onChange={this.setPrivacy}
                                            inline
                                        >
                                            Private
                                        </Radio>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <PartFormPropsExtended
                                value={this.state.description}
                                setValue={this.setDescription}
                                validation={this.validateDescription}
                                name="Description"
                                type="textarea"
                                componentClass="textarea"
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Row>
                                <Col md={12}>
                                    <ButtonGroup>
                                        <Button type="button" onClick={this.props.openClose}>Close</Button>
                                        <Button 
                                            type="button" 
                                            bsStyle="success" 
                                            onClick={this.modifyLoan}
                                            disabled={this.validateDescription() === 'error'}
                                        >
                                            Modify
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
export default Modify;