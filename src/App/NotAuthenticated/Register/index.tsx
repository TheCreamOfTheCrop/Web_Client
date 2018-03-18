import * as React from 'react';
import RegisterForm from './Form';
import { Route, Switch } from 'react-router';
import After from './After';
import { Panel } from 'react-bootstrap';
// import createBrowserHistory from 'history/createBrowserHistory';

// const customHistory = createBrowserHistory();

class Register extends React.Component {
    render() {
      return (
        <Panel bsStyle="danger">
            <Panel.Heading>Sign up</Panel.Heading>
            <Panel.Body>
                <Switch>
                <Route exact path="/register" component={RegisterForm} />
                <Route path="/register/after" component={After} />
                </Switch>
            </Panel.Body>
        </Panel>
      );
    }
  }

export default Register;