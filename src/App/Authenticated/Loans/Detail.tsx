import * as React from 'react';
import { Row, Col, Panel, Label, Button } from 'react-bootstrap';
import ILoan from './ILoan';
import IUser from './IUser';

interface IDetailProps {
    loan: ILoan;
    user: IUser;

    openClose: () => void;
}

class Detail extends React.Component<IDetailProps, any> {
    constructor(props: IDetailProps, context: any) {
        super(props, context);
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
                            {this.props.loan.description}
                        </Panel.Body>
                        <Panel.Footer>
                            <Row>
                                <Col md={3}>
                                    <Button type="button" onClick={this.props.openClose}>Close Details</Button>
                                </Col>
                            </Row>
                        </Panel.Footer>
                    </Panel>
                </Col>
            );
    }
}
export default Detail;