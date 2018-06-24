import * as React from 'react';
import { MyLoans, PublicLoans }  from './Loans';
import { Tabs, Tab, Row, Col, Button, FormControl } from 'react-bootstrap';
import ILoan from './ILoan';
import AddLoan from './Add';

class TabLoans extends React.Component<any, any> {
    constructor(props: ILoan, context: any) {
        super(props, context);
        this.addNewLoan = this.addNewLoan.bind(this);

        let sessionKey = String(process.env.REACT_APP_AUTH_SESSION_KEY);
        let session: any = JSON.parse(String(window.sessionStorage.getItem(sessionKey)));

        this.state = {
            user: session.user,
            showNewLoan: false,
            loanType: 'Waiting'
        };
    }
    addNewLoan() {
        this.setState({showNewLoan: !this.state.showNewLoan});
    }
    onSelectTypeLoan(event: any) {
        this.setState({loanType: event.target.value});
    }
    render() {
        return (
            <div>
            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                <Tab eventKey={1} title="My List">
                    <br/>
                    <Row>
                        <Col md={3}>
                            {this.state.showNewLoan ? 
                            <AddLoan 
                                user={this.state.user}
                                openClose={this.addNewLoan}
                            /> 
                            :
                            <Button onClick={this.addNewLoan}>Add new personal loan</Button>}
                        </Col>
                        <Col md={3}>
                        <FormControl 
                            componentClass="select" 
                            placeholder="type of loan" 
                            onChange={this.onSelectTypeLoan}
                        >
                            <option value="en attente">Waiting</option>
                            <option value="en negociation">In negociation</option>
                            <option value="en cours">In Progress</option>
                            <option value="termines">Closed</option>
                        </FormControl>
                       
                        </Col>
                    </Row>
                    <br/>
                 
                    <Row>
                        <Col md={10} mdOffset={1}>
                            <MyLoans user={this.state.user} type={this.state.loanType}/>
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey={2} title="Public loans">
                    <br/>
                    <Col md={10} mdOffset={1}>
                        <PublicLoans />
                    </Col>       
                </Tab>
            </Tabs>
            
            </div>
        );
    }
}

export default TabLoans;