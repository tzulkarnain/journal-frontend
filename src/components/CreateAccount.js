import React, { Component } from 'react';
import auth from '../auth.js';

/*
logic: 
1. createNewUser needs to be a function that takes as its arguements first name, 
last night, email, and password and sends them to the database to 1) make sure they don't exist and then 2) store them

2. checkThatMatches needs to be a function that takes two inputs and checks that they match and returns the input if 
matched or renders a warning to the user if they dont match. 

3. there should be a check on both pw and email, and then another one also createNewUser should only run if both pw and email pass their checks


*/

class CreateAccount extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    auth.createAccount(this.firstInput.value, this.lastInput.value, this.emailInput.value, this.passwordInput.value)
      .then(response => console.log('login reply: ', response))
      .then(() => this.props.history.push("/login"))
      .catch(err => {
        console.log('error ', err);
        this.props.history.push("/dashboard")
      })
  }

  render() {
    return (
      <div className="createAccount">
        <h1>Create Account</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="inputFields">
            <div>
              <input type='text' placeholder="First Name" ref={r => this.firstInput = r} />
              <input type='text' placeholder="Last Name" ref={r => this.lastInput = r} />
            </div>
            <div>
              <input type='text' placeholder="Email" ref={r => this.emailInput = r} />
              <input type='text' placeholder="Confirm Email" ref={r => this.emailCheckInput= r} />
            </div>
            <div>
              <input type='password' placeholder="Password" ref={r => this.passwordInput = r} />
              <input type='password' placeholder="Confirm Password" ref={r => this.passwordCheckInput = r} />
            </div>
            <button>Create</button>
          </div>
        </form>

      </div>
    );
  }
}

export default CreateAccount;
