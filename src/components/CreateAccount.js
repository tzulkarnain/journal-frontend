import React, { Component } from 'react';

class CreateAccount extends Component {

  render() {
    return (
      <div className="createAccount">
        <h1>Create Account</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="inputFields">
            <div>
              <input type='text' placeholder="First Name" ref={r => this.highlightInp1 = r} />
              <input type='text' placeholder="Last Name" ref={r => this.highlightInp2 = r} />
            </div>
            <div>
              <input type='text' placeholder="Email" ref={r => this.highlightInp3 = r} />
              <input type='text' placeholder="Confirm Email" ref={r => this.highlightInp4 = r} />
            </div>
            <div>
              <input type='text' placeholder="Password" ref={r => this.highlightInp5 = r} />
              <input type='text' placeholder="Confirm Password" ref={r => this.highlightInp6 = r} />
            </div>
            <button>Create</button>
          </div>
        </form>

      </div>
    );
  }
}

export default CreateAccount;
