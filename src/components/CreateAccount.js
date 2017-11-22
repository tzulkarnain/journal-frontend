import React, { Component } from 'react';
import auth from '../auth.js';
import { Button, Form, Grid, Header } from 'semantic-ui-react'
import styled from 'styled-components'

const Wrapper = styled.div`
min-height: 100vh;
width: 100%;
background: url('/static/media/bluebeige.dd97c287.jpg');
background-size: cover;
background-repeat: no-repeat;
background-position: center;
height: 100%;
verticalAlign: center;
${'' /* min-height: 100vh;
width: 100%;
background: black;
color: #fff; */}
`;

class CreateAccount extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      missingInput: false
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.state.firstName && this.state.lastName && this.state.email && this.state.password) {
      auth.createAccount(this.state.firstName, this.state.lastName, this.state.email, this.state.password)
      .then(response => console.log('login reply: ', response))
      .then(() => this.props.history.push("/login"))
      .catch(err => {
        console.log('error ', err);
        this.props.history.push("/dashboard")
      })
    }
    else {this.setState( {missingInput: true})

    }
      }
  

  render() {
    return (
      <Wrapper>
        <style>{`
        body > div,
        body > div > div,
        body > div > div > Wrapper{
          height: 100%;
        }
      `}</style>
      
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h1" textAlign="center">Create Account</Header>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input type='text' placeholder="First Name" value={this.state.firstName} onChange={(e) => this.setState({firstName: e.target.value})} />
              <Form.Input type='text' placeholder="Last Name" value={this.state.lastName} onChange={(e) => this.setState({lastName: e.target.value})} />
              <Form.Input type='email' placeholder="Email"      value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
              {/* <Form.Input type='text' placeholder="Confirm Email" /> */}
              <Form.Input icon='lock' iconPosition='left' type='password' placeholder="Password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}  />
              {/* <Form.Input icon='lock' iconPosition='left' type='password' placeholder="Confirm Password"  /> */}
               {this.state.missingInput && (<Header as="h5" color="red" textAlign="center">Looks like you forgot something</Header>)}
              <Button>Create</Button>
            </Form>
          </Grid.Column>
        </Grid>

      </Wrapper>
    );
  }
}

export default CreateAccount;


/*

*/