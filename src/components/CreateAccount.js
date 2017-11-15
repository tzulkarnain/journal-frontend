import React, { Component } from 'react';

/*
logic: 
1. createNewUser needs to be a function that takes as its arguements this.highlightInp1.value, 

*/

class CreateAccount extends Component {

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
              <input type='text' placeholder="Password" ref={r => this.passwordInput = r} />
              <input type='text' placeholder="Confirm Password" ref={r => this.passwordCheckInput = r} />
            </div>
            <button>Create</button>
          </div>
        </form>

      </div>
    );
  }
}

export default CreateAccount;
