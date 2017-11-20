import React, { Component } from 'react';
import auth from '../auth.js';
import { Button, Form, Grid, Header } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
/*
logic:
handleSubmit: runs backend function that checks database for email and password, and 
if successful reroutes user to dashboard, else renders that the user name or pasword is incorrect
do you have a token set up?
testing this out
*/

// class TextInput extends Component {
//   constructor() {
//     super()
//     this.state = {}
//   }
//   render() {
//     return <div>
//       <div>hello: {this.state.value}</div>

//       <Input value={this.state.value} onChange={(e) => this.setState({ value: e.target.value })} />
//     </div>
//   }
// }

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      error: null
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    auth.login(this.state.email, this.state.password)
      .then(response => console.log('login reply: ', response))
      .then(() => this.props.history.push("/dashboard"))
      .catch(err => {
        console.log('error ', err);
        this.setState( { error: 'Oops, something went wrong.' })
      })
  }

  render() {
    return (
      <div className='login-form'>
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>

        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" textAlign="center">Log In</Header>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input icon='user' iconPosition='left' type='text' placeholder="Email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} 
                />
              <Form.Input icon='lock' iconPosition='left' type='password' placeholder="Password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} 
                />
                <p>No account? <Link to="/createaccount">Create an account</Link></p>
                {this.state.error && (<p>{this.state.error}</p>) }
              <Button fluid size='large'>Log In</Button>
            </Form>
          </Grid.Column>
        </Grid>

      </div>

    )
  }
}

export default Login;
