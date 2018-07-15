import * as React from 'react';
import { Row, Col, Button, FormControl } from 'react-bootstrap';
import ILoan from './Interface/ILoan';
import { Loan } from './Loan';
import { post, postWithPayload } from '../post';
import AddLoan from './Add';

interface ILoansState {
    loans: ILoan[];
    filteredLoans: ILoan[];
    payload?: any;
    showNewLoan?: boolean;
}

export class PublicLoans extends React.Component<any, ILoansState> {
    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
            loans: [],
            filteredLoans: []
        };
    }
    componentDidMount() {
        post('http://' + process.env.REACT_APP_BMB_API + '/loan/listPublic')
        .then((res: any) => {
            this.setState({
                loans: res.loans
            });
        })
        .catch((err: any) => {
            console.log(err);
        });
    }

    render() {
        return (
            <Row>
                { 
                    this.state.loans.map((loan, i) => {
                        return  <Loan   
                                        key={i}
                                        loan={loan}
                                        mine={false}
                        />;
                    }) 
                }
            </Row>
        );
    }
}

export class MyLoans extends React.Component<any, ILoansState> {
    constructor(props: any, context: any) {
        super(props, context);
        this.addNewLoan = this.addNewLoan.bind(this);
        this.onSelectTypeLoan = this.onSelectTypeLoan.bind(this);

        this.state = {
            payload: {
                state_id: 'en attente',
                loan_type: 'public'
            },
            loans: [],
            filteredLoans: [],
            showNewLoan: false,
        };
    }
    addNewLoan() {
        this.setState({showNewLoan: !this.state.showNewLoan});
    }
    onSelectTypeLoan(event: any) {
        let payload = this.state.payload;
        payload.state_id = event.target.value;
        let filteredLoans = this.state.loans.filter((loan) => {
            return loan.state_id === this.state.payload.state_id;
        });

        this.setState({filteredLoans : filteredLoans});
    }
    componentDidMount() {
        postWithPayload('http://' + process.env.REACT_APP_BMB_API + '/loan/findLoan', this.state.payload)
        .then((res: any) => {
            this.setState({
                loans: res.loans,
                filteredLoans: res.loans.filter((loan: ILoan) => {
                    return loan.state_id === this.state.payload.state_id;
                })
            });
        })
        .catch((err: any) => {
            console.log(err);
        });
    }
    render() {
        return (
            <div>
                <AddLoan 
                        user={this.props.user}
                        openClose={this.addNewLoan}
                        isOpen={this.state.showNewLoan}
                /> 
                <Row>
                    <Col md={3}>
                        <Button onClick={this.addNewLoan}>Add new personal loan</Button>
                    </Col>
                    <Col md={3}>
                    <FormControl 
                        componentClass="select" 
                        placeholder="type of loan" 
                        onChange={this.onSelectTypeLoan}
                        value={this.state.payload.loanType}
                    >
                        <option value="en attente">Waiting</option>
                        <option value="en negociation">In negociation</option>
                        <option value="en cours">In Progress</option>
                        <option value="finis">Closed</option>
                    </FormControl>
                    
                    </Col>
                </Row>
                <br/>
                <Row>   
                    { 
                        this.state.filteredLoans.map((loan, i) => {
                            return  <Loan 
                                            key={i}
                                            loan={loan}
                                            mine={true}
                            />;
                        }) 
                    }
                </Row>
            </div>
        );
    }
}