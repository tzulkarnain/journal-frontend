import React, { Component } from 'react';
import auth from '../auth.js';

/*
logic:
handleSubmit: runs backend function that checks database for email and password, and 
if successful reroutes user to dashboard, else renders that the user name or pasword is incorrect
do you have a token set up?
testing this out
*/

class Login extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    auth.login(this.emailInput.value, this.passwordInput.value)
      .then(response => console.log('login reply: ', response))
      .then(() => this.props.history.push("/dashboard"))
      .catch(err => {
        console.log('error ', err);
        this.props.history.push("/dashboard")
      })
  }

  render() {
    return (
      <div className="logIn" >
        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input type='text' placeholder="Email" ref={r => this.emailInput = r} />
            <input type='password' placeholder="Password" ref={r => this.passwordInput = r} />
          </div>
          <button>Log In</button>
        </form>
      </div>
    );
  }
}

export default Login;
