import * as React from 'react';
import { Row } from 'react-bootstrap';
import ILoan from './ILoan';
import Loan from './Loan';
import { post } from '../post';

// "id": 21,
//             "uid": "54624c97-9fb3-4b84-9846-5b74ea9d2884",
//             "amount": 1230,
//             "creationdate": "2018-04-05T07:25:04.000Z",
//             "description": "Ceci est un pret de test",
//             "rate": 3,
//             "loan_type": "public",
//             "state_id": "en attente",
//             "user_requester_id": 16,
//             "user_provider_id": null,
//             "delay": 7,
//             "created_at": "2018-04-05T07:25:04.000Z",
//             "updated_at": "2018-04-05T07:25:04.000Z",
//             "deleted_at": null

interface ILoansState {
    loans: ILoan[];
}

class Loans extends React.Component<any, ILoansState> {
    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
            loans: []
        };
    }
    componentDidMount() {
        post('http://' + process.env.REACT_APP_BMB_API + '/loan/listPublic')
        .then((res) => {
            this.setState({
                loans: res.loans
            });
        })
        .catch((err) => {
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
                        />;
                    }) 
                }
            </Row>
        );
    }
}

export default Loans;