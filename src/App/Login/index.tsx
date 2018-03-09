import * as React from 'react';
import LoginForm from './Form';

class Login extends React.Component {
  render() {
    return (
      <div>
          <h2>Login</h2>
          <LoginForm/>
      </div>
    );
  }
}

export default Login;