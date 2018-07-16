import * as React from 'react';
import { Col, Panel, Label, Button, Row } from 'react-bootstrap';

import IUser from './Interface/IUser';
import ILoan from './Interface/ILoan';
import { postWithPayload } from '../post';
import Detail from './Detail';
import AcceptLoan from './AcceptLoan';
import Modify from './Modify';
import AddRefund from './AddRefund';

interface ILoanProps {
    loan: ILoan;
    mine?: boolean;
}

interface ILoanState {
    openDetail: boolean;
    acceptLoan: boolean;
    openModify: boolean;
    isOpenRefund: boolean;
    user: IUser;

    openCloseDetails?: () => void;
    openCloseAccept?: () => void;
    openCloseRefund?: () => void;
    openCloseModify?: () => void;
}

export class Loan extends React.Component<ILoanProps, ILoanState> {
    constructor(props: ILoanProps, context: ILoanState) {
        super(props, context);
        this.openCloseDetails = this.openCloseDetails.bind(this);
        this.openCloseAccept = this.openCloseAccept.bind(this);
        this.openCloseModify = this.openCloseModify.bind(this);
        this.openCloseRefund = this.openCloseRefund.bind(this);

        this.state = {
            openDetail: false,
            acceptLoan: false,
            openModify: false,
            isOpenRefund: false,
            user: { 
                firstname: ''
            }
        };
    }
    componentDidMount() {
        postWithPayload('http://' + process.env.REACT_APP_BMB_API + '/user', 
                        { id: this.props.loan.user_requester_id })
        .then((res: any) => {
            if (res.success)
                this.setState({user : res.user});
        }).catch((err) => {
            console.log(err);
        });
    }
    openCloseDetails() {
        this.setState({openDetail: !this.state.openDetail});
    }
    openCloseAccept() {
        this.setState({acceptLoan: !this.state.acceptLoan});
    }
    openCloseRefund() {
        this.setState({isOpenRefund: !this.state.isOpenRefund});
    }
    openCloseModify() {
        this.openCloseDetails();
        this.setState({openModify: !this.state.openModify});
    }
    render() {
        return (
                <div>
                    <Col md={4}>
                        <AddRefund
                            isOpen={this.state.isOpenRefund}
                            openClose={this.openCloseRefund}
                            loan={this.props.loan}
                        />
                        <Modify
                            user={this.state.user}
                            loan={this.props.loan}
                            isOpen={this.state.openModify}
                            openClose={this.openCloseModify}
                        />
                        <AcceptLoan
                            loan={this.props.loan} 
                            isOpen={this.state.acceptLoan}
                            openClose={this.openCloseAccept}
                        />
                        <Detail 
                            user={this.state.user}
                            loan={this.props.loan}
                            openModify={this.openCloseModify}
                            openAccept={this.openCloseAccept}
                            openClose={this.openCloseDetails}
                            openRefund={this.openCloseRefund}
                            mine={this.props.mine}
                            isOpen={this.state.openDetail}
                        />
                        <Panel>
                            <Panel.Heading>
                                <h4> 
                                    {this.state.user.firstname}{' '}
                                    <Label bsStyle="primary">{this.props.loan.amount} €</Label>
                                </h4>
                            </Panel.Heading>
                            <Panel.Body>
                                {this.props.loan.description.length > 300 ?
                                this.props.loan.description.substring(0, 300) :
                                this.props.loan.description}
                            </Panel.Body>
                            <Panel.Footer>
                                <Row>
                                    <Col md={3}>
                                        <Button type="button" onClick={this.openCloseDetails}>Details</Button>
                                    </Col>

                                    <Col md={4} mdOffset={1}>
                                    <h4>
                                        <Label bsStyle="warning">{this.props.loan.delay} Months</Label>
                                    </h4>
                                    </Col>

                                    <Col md={2}>
                                    <h4>
                                        <Label bsStyle="warning">{this.props.loan.rate} %</Label>       
                                    </h4>
                                    </Col>
                                </Row>
                            </Panel.Footer>
                        </Panel>
                    </Col>
                </div>
        );
    }
}