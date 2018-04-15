import * as React from 'react';
import { Row, Col, Panel } from 'react-bootstrap';

const Loan = (props: any) => (
    <Col md={4}>
        <Panel>
            <Panel.Heading>
                {props.name}
            </Panel.Heading>
            <Panel.Body>
                {props.description}
            </Panel.Body>
        </Panel>
    </Col>
);

const Loans = () => (
    <Row>
        <Loan name="Han" description="test"/>
        <Col md={4}>
            Loan
        </Col>
        <Col md={4}>
            Loan
        </Col>
        Loans in progress
    </Row>
);

export default Loans;