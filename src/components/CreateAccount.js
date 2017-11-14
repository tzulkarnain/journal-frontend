import React, { Component } from 'react';

class CreateAccount extends Component {
  
  render() {
    return (
      <div className="createAccount">
        <h1>Create Account</h1>
        <form onSubmit="this.handleSubmit">
          <div className="inputFields">
          <input type='text' placeholder="First Name" />
          <input type='text' placeholder="Last Name" />
          <input type='text' placeholder="Email" />
          <input type='text' placeholder="Confirm Email" />
          <input type='text' placeholder="Password" />
          <input type='text' placeholder="Confirm Password" />
          <button>Create Account</button>
          </div>
        </form>

      </div>
    );
  }
}

export default CreateAccount;
