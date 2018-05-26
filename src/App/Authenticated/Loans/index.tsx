import * as React from 'react';
import { MyLoans, PublicLoans }  from './Loans';
import { Tabs, Tab, Row, Col, Button } from 'react-bootstrap';
import ILoan from './ILoan';

class TabLoans extends React.Component<any, any> {
    constructor(props: ILoan, context: any) {
        super(props, context);
        let sessionKey = String(process.env.REACT_APP_AUTH_SESSION_KEY);
        let session: any = JSON.parse(String(window.sessionStorage.getItem(sessionKey)));

        let payload = {
           id: session.user.id
        };

        this.state = {
            payload: payload
        };
    }
    render() {
        return (
            <div>
            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                <Tab eventKey={1} title="My List">
                    <br/>
                    <Row>
                        <Col md={3}>
                            <Button>Add new personal loan</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={10} mdOffset={1}>
                            <MyLoans payload={this.state.payload}/>
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey={2} title="Public loans">
                    <br/>
                    <Col md={10} mdOffset={1}>
                        <PublicLoans />
                    </Col>       
                </Tab>
                <Tab eventKey={3} title="">
                    <br/>

                    <Col md={10} mdOffset={1}>
                        <PublicLoans  />
                    </Col>                       
                </Tab>
            </Tabs>
            
            </div>
        );
    }
}

export default TabLoans;