import * as React from 'react';
import { Row } from 'react-bootstrap';
import Loan from './Loan';

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

interface ILoan {
    id: number;
    uid: string;
    amount: number;
    creationDate: Date;
    description: string;
    rate: number;
    loan_type: 'public' | 'private';
    state_id: 'en attente' | 'en negociation';
    user_provider_id: number | null;
    user_requester_id: number;
    delay: number;
}
class Loans extends React.Component<any, ILoansState> {
    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
            loans: []
        };
    }
    componentDidMount() {
        let sessionKey = String(process.env.REACT_APP_AUTH_SESSION_KEY);
        let sessionId: any = JSON.parse(String(window.sessionStorage.getItem(sessionKey)));
        fetch('http://' + process.env.REACT_APP_BMB_API + '/loan/listPublic', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': sessionId.token
            }),
        })
        .then((res) => { 
            return res.json(); 
        })
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
                        return  <Loan key={i} name={loan.state_id} description={loan.description}/>;
                    }) 
                }
            </Row>
        );
    }
}

export default Loans;