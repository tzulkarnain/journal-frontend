import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EntryPreview from './EntryPreview';
import NavBar from './NavBar'
import api from '../api.js'
import auth from '../auth.js';
import { Grid, Segment, Button } from 'semantic-ui-react'


/*
logic:
1. p: would be cool of p used an api to cycle through quotes: https://codepen.io/catapixel/pen/LpVEgy / 
could also make our own api of quotes so they're relevant 
2. fairly certain the carosal type thing will be in Entry Preview not Dashboard. 
can experiment more when we have backend to populate

todo: state only has contents that user put into create account
todo: remove history props from nav bar

fix dashboard if logged out situation!!! 
on component did mount or render or will mount to check if user is logged in and reroutes
{this.state.userObj.firstName}
*/


class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      userObj: {},
      entries: [],
      geoTaggedEntries:[]
    }
  }

  componentDidMount() {
    //requestEntries takes two arguments - the token, and the number of posts to return.
    api.requestEntries(auth.getToken(),10)
      .then(reply => 
        this.setState({ entries: reply.body })
    );
    //same with requestGeotaggedEntries
    api.requestGeotaggedEntries(auth.getToken(),10)
    .then(reply => 
      this.setState({ geoTaggedEntries: reply.body })
  );
    const userObj = auth.getUser();
    console.log('userobj', userObj)
    this.setState({ userObj })

  }

  displayEntryPreviews = (entryObj) => {
    return (
      <div style={{display:'inline-block', margin: '2em 2em'}}><EntryPreview data={entryObj} key={entryObj.id} /></div>
    )
  }


  render() {
    console.log('the state: ', this.state)

    return (
      <div className="dashboard">
        <NavBar hist={this.props.history} />
        <Grid columns="equal" padded>]
          <Grid.Row>
            <Grid.Column>
              <Segment size="massive">Hey {this.state.userObj.firstName} </Segment>
            </Grid.Column>

            <Grid.Column width={8}>
              <Segment size="big">We write to taste life twice, in the moment and in retrospect <br/> Anais Nin</Segment>
            </Grid.Column>

            <Grid.Column>
              <Button size="massive" as={Link} to='/writeentry' width={2}> + </Button>
              {/* <Link to="/writeentry"><Button>+</Button></Link> as={Link} to='/writeentry'*/}
            </Grid.Column>

          </Grid.Row>
          <Grid.Row stretched>
            <Grid.Column verticalAlign="middle" width={3}>
              <Segment >Your entries</Segment>
            </Grid.Column>
            <Grid.Column width={9}>
                <div style={{width:'100%', display:'flex', flexDirection:'row', overflowX:'scroll'}}>

                 {this.state.entries.length ? this.state.entries.map(this.displayEntryPreviews) :
                  (<div>You haven't written anything yet. Click the + button to add a new entry.</div>)
                 } 
                </div>

            </Grid.Column>
          </Grid.Row>


        </Grid >

        {/* <div className="entriesWrapper">
          <div className="entriesWrapperA">
            <h3>Your entries</h3>
          </div>

          <div className="entriesWrapperB">
            
          </div>

          <div className="entriesWrapperD">
            <div>next-arrow</div>
            <div>the past</div>
          </div>

        </div> */}

      </div >
    );
  }
}

export default Dashboard;
