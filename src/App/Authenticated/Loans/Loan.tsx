import * as React from 'react';
import { Col, Panel, Label, Button, Row } from 'react-bootstrap';

import IUser from './IUser';
import ILoan from './ILoan';
import { postWithPayload } from '../post';
import Detail from './Detail';

interface ILoanProps {
    loan: ILoan;
    mine?: boolean;
}

interface ILoanState {
    openDetail: boolean;
    user: IUser;

    openClose?: () => void;
}

class Loan extends React.Component<ILoanProps, ILoanState> {
    constructor(props: ILoanProps, context: ILoanState) {
        super(props, context);
        this.openClose = this.openClose.bind(this);

        this.state = {
            openDetail: false,
            user: { 
                firstname: ''
            }
        };
    }
    componentDidMount() {
        postWithPayload('http://' + process.env.REACT_APP_BMB_API + '/user', 
                        { id: this.props.loan.id })
        .then((res: any) => {
            if (res.success)
                this.setState({user : res.user});
        }).catch((err) => {
            console.log(err);
        });
    }
    openClose() {
        this.setState({openDetail: !this.state.openDetail});
    }
    render() {
        return (

                this.state.openDetail ?
                (
                <Detail 
                        user={this.state.user}
                        loan={this.props.loan} 
                        openClose={this.openClose}
                />
                ) 
                :
                (
                <Col md={4}>
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
                                    <Button type="button" onClick={this.openClose}>Details</Button>
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
                )
        );
    }
}
export default Loan;