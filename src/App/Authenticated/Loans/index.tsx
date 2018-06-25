import * as React from 'react';
import { MyLoans, PublicLoans }  from './Loans';
import { Tabs, Tab, Row, Col } from 'react-bootstrap';
import ILoan from './Interface/ILoan';

class TabLoans extends React.Component<any, any> {
    constructor(props: ILoan, context: any) {
        super(props, context);

        let sessionKey = String(process.env.REACT_APP_AUTH_SESSION_KEY);
        let session: any = JSON.parse(String(window.sessionStorage.getItem(sessionKey)));

        this.state = {
            user: session.user,
        };
    }
    render() {
        return (
            <div>
            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                <Tab eventKey={1} title="My List" className="App-body">
                    <br/>
                    <Row>
                        <Col md={10} mdOffset={1}>
                            <MyLoans user={this.state.user} type={this.state.loanType}/>
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey={2} title="Public loans"  className="App-body">
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