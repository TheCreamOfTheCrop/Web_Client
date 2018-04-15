import * as React from 'react';
import { Col, Panel } from 'react-bootstrap';

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

export default  Loan;