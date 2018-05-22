import * as React from 'react';
import { Col, Panel } from 'react-bootstrap';
import ILoan from './ILoan';
// import { postWithPayload } from '../post';

import { Button, Row } from 'react-bootstrap';
class Loan extends React.Component<any, any> {
    constructor(props: ILoan, context: any) {
        super(props, context);

        this.showDetails = this.showDetails.bind(this);
        this.state = {
            user: { 
                firstname: 'default'
            }
        };
    }
    componentDidMount() {
        // postWithPayload('http://' + process.env.REACT_APP_BMB_API + '/user', 
        // { id: this.props.loan.user_provider_id })
        // .then((res: any) => {
        //     this.setState({user : res});
        // });
    }
    showDetails() {
        // TODO: plug to a true show details
    }
    render() {
        return(
            <Col md={4}>
                <Panel>
                    <Panel.Heading>
                        {this.state.user.firstname}
                    </Panel.Heading>
                    <Panel.Body>
                        {this.props.loan.description}
                    </Panel.Body>
                    <Panel.Footer>
                        <Row>
                            <Col md={3}>
                                <Button type="button" onClick={this.showDetails}>Details</Button>
                            </Col>
                            <Col md={3} mdOffset={3}>
                                {this.props.loan.amount} €
                            </Col>
                        </Row>
                    </Panel.Footer>
                </Panel>
            </Col>
        );
    }
}
export default  Loan;