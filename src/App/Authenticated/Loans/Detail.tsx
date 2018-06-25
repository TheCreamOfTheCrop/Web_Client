import * as React from 'react';
import { Row, Col, Panel, Label, Button, ButtonGroup } from 'react-bootstrap';
import ILoan from './Interface/ILoan';
import IUser from './Interface/IUser';
import { postWithPayload } from '../post';

interface IDetailProps {
    loan: ILoan;
    user: IUser;
    mine: boolean | undefined;

    openClose: () => void;
}
interface IDetailState {
    historic: IRefund[];
}
interface IRefund {
    amount: number;
    creationdate: string;
}

class Detail extends React.Component<IDetailProps, IDetailState> {
    constructor(props: IDetailProps, context: IDetailState) {
        super(props, context);

        this.state = {
            historic: []
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
    acceptLoan() {
        // i still have to test it
        postWithPayload('http://' + process.env.REACT_APP_BMB_API + '/loan/accept', 
                        { id_loan: this.props.loan.id });
    }
    render() {
        return ( 
                <Col md={4}>
                    <Panel>
                        <Panel.Heading>
                        <h4> 
                            {this.props.user.firstname} {this.props.user.lastname}
                        </h4> 
                        </Panel.Heading>
                        <Panel.Body>
                            <h4>
                                Amount of loan :<Label bsStyle="primary">{this.props.loan.amount} €</Label>
                            </h4>
                            <h4>
                                Rate of interest :<Label bsStyle="warning">{this.props.loan.rate} %</Label>
                            </h4>
                            <h4>
                                Duration :<Label bsStyle="warning">{this.props.loan.delay} Months</Label>
                            </h4>
                            <h4>Description: </h4> <br/>
                            {this.props.loan.description}
                            <h4>Historic: </h4>
                            {this.state.historic.map((refund, i) => {
                                let thisDate = new Date(refund.creationdate);
                                let monthName = thisDate.toLocaleString('fr-FR', { month: 'long' });
                                return(<div key={i}> 
                                    {monthName} {thisDate.getFullYear()}  {refund.amount}€
                                </div>);
                            })}
                        </Panel.Body>
                        <Panel.Footer>
                            <Row>
                                <Col md={12}>
                                    <ButtonGroup>
                                        <Button type="button" onClick={this.props.openClose}>Close Details</Button>
                                        {this.props.mine ? 
                                        null
                                        :
                                        <div><Button 
                                            type="button" 
                                            bsStyle="success" 
                                            onClick={this.props.openClose}
                                        >
                                                    Accepter
                                        </Button>
                                        </div>
                                       }
                                        <Button type="button" onClick={this.props.openClose}>Negocier</Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </Panel.Footer>
                    </Panel>
                </Col>
            );
    }
}
export default Detail;