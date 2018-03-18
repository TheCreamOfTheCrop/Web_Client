import * as React from 'react';
import LoginForm from './Form';

class Login extends React.Component {
  render() {
    return (
      <div>
          <h2>Sign in</h2>
          <LoginForm/>
      </div>
    );
  }
}

export default Login;