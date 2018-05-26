import * as React from 'react';
import { Row } from 'react-bootstrap';
import ILoan from './ILoan';
import Loan from './Loan';
import { post, postWithPayload } from '../post';

interface ILoansState {
    loans: ILoan[];
    payload?: any;
}

export class PublicLoans extends React.Component<any, ILoansState> {
    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
            loans: []
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

        this.state = {
            payload: { id: this.props.user.id },
            loans: []
        };
    }
    componentDidMount() {
        postWithPayload('http://' + process.env.REACT_APP_BMB_API + '/loan/findLoan', this.state.payload)
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
                                        mine={true}
                        />;
                    }) 
                }
            </Row>
        );
    }
}