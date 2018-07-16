import * as React from 'react';
import { Row, Col, Label, Button, Modal, ButtonGroup } from 'react-bootstrap';
import ILoan from './Interface/ILoan';
import IUser from './Interface/IUser';
import { postWithPayload } from '../post';

interface IDetailProps {
    loan: ILoan;
    user: IUser;
    mine: boolean | undefined;
    isOpen?: boolean;

    openClose: () => void;
    openAccept: () => void;
    openModify: () => void;
    openRefund: () => void;
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
        this.openAccept = this.openAccept.bind(this);
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
    openAccept() {
        this.props.openClose();
        this.props.openAccept();
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
                            {this.props.loan.state_id === 'en attente' ? <h4>Historic: </h4> : null}
                            {this.props.loan.state_id === 'en attente' ?
                                (
                                    this.state.historic.map((refund, i) => {
                                    let thisDate = new Date(refund.creationdate);
                                    let monthName = thisDate.toLocaleString('en-EN', { month: 'long' });
                                    return(<div key={i}> 
                                        {monthName} {thisDate.getFullYear()}  {refund.amount}€
                                    </div>);
                                    })
                                ) : null
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            <Row>
                                <Col md={12}>
                                <ButtonGroup>
                                    <Button type="button" onClick={this.props.openClose}>Close Details</Button>
                                    {this.props.mine  ?
                                        this.props.loan.state_id !== 'en attente' ?
                                        <Button type="button" onClick={this.props.openRefund}>Refund</Button>
                                        :
                                        <Button type="button" onClick={this.props.openModify}>Modify Loan</Button>
                                    :
                                    <Button 
                                        type="button" 
                                        bsStyle="primary" 
                                        onClick={this.openAccept}
                                    >
                                        Negocier
                                    </Button>
                                    }
                                    {this.props.mine ? null :
                                    <Button 
                                        type="button" 
                                        bsStyle="success" 
                                        onClick={this.openAccept}
                                    >
                                        Accepter
                                    </Button>}
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </Modal.Footer>
                    </Modal>
                </Col>
            );
    }
}
export default Detail;