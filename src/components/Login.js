import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div className="logIn">
        <h1>Log In/h1>
        <form onSubmit={this.handleSubmit}>
          <div className="inputFields">
              <input type='text' placeholder="Email" ref={r => this.highlightInp1 = r} />
              <input type='text' placeholder="Password" ref={r => this.highlightInp2 = r} />
            <button>Log In</button>
          </div>
        </form>

      </div>
    );
  }
}

export default Login;
