import * as React from 'react';
import RegisterForm from './Form';
import { Route, Switch } from 'react-router';
import After from './After';
import { Panel, Row } from 'react-bootstrap';

class Register extends React.Component {
    render() {
      return (
        <Row>
          <br/>
          <Panel>
              <Panel.Heading>Sign up</Panel.Heading>
              <Panel.Body>
                  <Switch>
                  <Route exact path="/register" component={RegisterForm} />
                  <Route path="/register/after" component={After} />
                  </Switch>
              </Panel.Body>
          </Panel>
        </Row>
      );
    }
  }

export default Register;