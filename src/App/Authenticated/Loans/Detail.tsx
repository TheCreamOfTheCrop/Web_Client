import * as React from 'react';
import { Row, Col, Label, Button, Modal } from 'react-bootstrap';
import ILoan from './Interface/ILoan';
import IUser from './Interface/IUser';
import { postWithPayload } from '../post';

interface IDetailProps {
    loan: ILoan;
    user: IUser;
    mine: boolean | undefined;
    isOpen?: boolean;

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
                <Col md={12}>
                    <Modal show={this.props.isOpen} onHide={this.props.openClose}>
                        <Modal.Header>
                        <h4> 
                            {this.props.user.firstname} {this.props.user.lastname}
                        </h4> 
                        </Modal.Header>
                        <Modal.Body>
                            <h4>
                                Amount of loan :<Label bsStyle="primary">{this.props.loan.amount} €</Label>
                            </h4>
                            <h4>
                                Rate of interest :<Label bsStyle="warning">{this.props.loan.rate} %</Label>
                            </h4>
                            <h4>
                                Duration :<Label bsStyle="warning">{this.props.loan.delay} Months</Label>
                            </h4>
                            <h4>Description: </h4>
                            {this.props.loan.description}
                            <h4>Historic: </h4>
                            {this.state.historic.map((refund, i) => {
                                let thisDate = new Date(refund.creationdate);
                                let monthName = thisDate.toLocaleString('en-EN', { month: 'long' });
                                return(<div key={i}> 
                                    {monthName} {thisDate.getFullYear()}  {refund.amount}€
                                </div>);
                            })}
                        </Modal.Body>
                        <Modal.Footer>
                            <Row>
                                <Col md={4}>
                                    <Button type="button" onClick={this.props.openClose}>Close Details</Button>
                                </Col>
                                <Col md={4}>
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
                                </Col>
                                <Col md={4}>
                                        <Button type="button" onClick={this.props.openClose}>Negocier</Button>
                                </Col>
                            </Row>
                        </Modal.Footer>
                    </Modal>
                </Col>
            );
    }
}
export default Detail;