import * as React from 'react';
import { Row, Col, Panel, Button, ButtonGroup, FormGroup, Radio } from 'react-bootstrap';
import { postWithPayload } from '../post';
import { PartFormPropsExtended } from './PartFormExtended';

class Add extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.setAmount = this.setAmount.bind(this);
        this.setRate = this.setRate.bind(this);
        this.setDelay = this.setDelay.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.setPrivacy = this.setPrivacy.bind(this);

        this.addLoan = this.addLoan.bind(this);

        this.validateDescription = this.validateDescription.bind(this);
        this.state = {
            privacy: 'public',
            description: '',
            amount: 0,
            rate: 0.0,
            delay: 0
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
    addLoan() {
        // i still have to test it
        postWithPayload('http://' + process.env.REACT_APP_BMB_API + '/loan/add', 
                        {
                            id: this.props.user.id,
                            description: this.state.description, 
                            amount: this.state.amount, 
                            rate: this.state.rate, 
                            delay: this.state.delay ,
                            loan_type: this.state.privacy
                        }).then(() => {
                            window.location.reload();
                        });

    }
    render() {
        return ( 
                <Col md={12}>
                    <Panel>
                        <Panel.Body>
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
                            </Row>
                            <PartFormPropsExtended
                                value={this.state.description}
                                setValue={this.setDescription}
                                validation={this.validateDescription}
                                name="Description"
                                type="textarea"
                                componentClass="textarea"
                            />
                        </Panel.Body>
                        <Panel.Footer>
                            <Row>
                                <Col md={12}>
                                    <ButtonGroup>
                                        <Button type="button" onClick={this.props.openClose}>Close</Button>
                                        <Button 
                                                type="button" 
                                                bsStyle="success" 
                                                onClick={this.addLoan}
                                                disabled={this.validateDescription() === 'error'}
                                        >
                                            Create
                                        </Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </Panel.Footer>
                    </Panel>
                </Col>
            );
    }
}
export default Add;