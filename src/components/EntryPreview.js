import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, Icon, Image, Button } from 'semantic-ui-react'
import auth from '../auth.js';
import api from '../api.js';
import nineTen from '../images/best.png'
import sevenEight from '../images/happy.png'
import fiveSix from '../images/ok.png'
import threeFour from '../images/bad.png'
import oneTwo from '../images/verybad.png'

/*
logic:
1. Arrow links to that entry's ReadEntry
2. Date = date of that entry, needs to pull date from database. 
3. Delete = deletes entry
4. carosaul that shows 2 entries and an arrow on either side. not sure how to do this??
//todo: only display date momentjs 
*/

class EntryPreview extends Component {
  constructor() {
    super();
    this.state = { imageDeleted: false }
  }

  displayDate = timeStamp => {
    let newDateArray = timeStamp.split('T');
    let justDate = newDateArray[0];
    return justDate;
  }

  setMoodDescription = (rating) => {
    let emoji;
    switch (rating) {
      case 10:
      case 9:
        emoji = `${ nineTen }`;
        break;
      case 8:
      case 7:
        emoji = `${ sevenEight }`;
        break;
      case 6:
      case 5:
        emoji = `${ fiveSix }`;
        break;
      case 4:
      case 3:
        emoji = `${ threeFour }`;
        break;
      case 2:
      case 1:
        emoji = `${ oneTwo }`;
        break;
      default:
        emoji = `${ sevenEight }`

    return emoji

    }
    return emoji
    // let entryMood =
    //   rating >= 9 ? "Super amazing!" :
    //     rating >= 7 ? "Pretty great" :
    //       rating >= 5 ? "Perfectly okay" :
    //         rating >= 3 ? 'Not so great' :
    //           rating >= 0 ? "Just terrible" : "Another day";
    // return entryMood;
  }

  handleDelete = (event) => {
    console.log('clicked', this.props.data.id, auth.getToken());
    api.requestDeleteEntry(this.props.data.id, auth.getToken())
      .then(this.setState(st => (
        { imageDeleted: true }
      )))

  }

  render() {
    return (
      <Grid.Column>
        {this.state.imageDeleted ? <Card.Header>Entry successfully deleted. </Card.Header> :
          <Card>
            <Link to={`/dashboard/readentry/${this.props.data.id}`}>
              <Image src={this.props.data.thumbnail_image_url} height='226px' width='290px' />
            </Link>
            <Card.Content>
              <Card.Header>
                {this.props.data.title}
              </Card.Header>
              <Card.Meta>
                <span className='date'>
                  {this.displayDate(this.props.data.createdAt)}
                </span>
              </Card.Meta>
              <Card.Description>
               <img src={this.setMoodDescription(this.props.data.mood)} style={{height: '3.8rem', 'padding-bottom': '1rem'}} />
                {' '}
              </Card.Description>
              <Card.Content extra>
                <Button onClick={this.handleDelete} icon='trash' size='small' ></Button>
              </Card.Content>
            </Card.Content>

          </Card>
        }


      </Grid.Column>


      /* <div>
        <Link to={`/readentry/${this.props.data.id}`}>
          <h4>^</h4>
        </Link>
        <h4>{this.props.data.createdAt}</h4>
        <Button>Delete</Button>
        
      </div> */
    );
  }
}

export default EntryPreview;
