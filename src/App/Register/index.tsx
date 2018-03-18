import * as React from 'react';
import RegisterForm from './Form';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Register extends React.Component {
    render() {
      return (
        <div>
            <h2>Sign up</h2>
            <RegisterForm/>
        </div>
      );
    }
  }

export default Register;