import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, Icon, Image } from 'semantic-ui-react'
import puppyPic from '../images/puppy.png';

/*
logic:
1. Arrow links to that entry's ReadEntry
2. Date = date of that entry, needs to pull date from database. 
3. Delete = deletes entry
4. carosaul that shows 2 entries and an arrow on either side. not sure how to do this??
//todo: only display date momentjs 
*/

class EntryPreview extends Component {
  render() {
    return (
      <Grid.Column>
        <Card>
          <Image src={puppyPic} />
          <Card.Content>
            <Card.Header>
              An excellent day
      </Card.Header>
            <Card.Meta>
              <span className='date'>
                Aug 30 2017
        </span>
            </Card.Meta>
            <Card.Description>
              It was my birthday, afterall.
      </Card.Description>
          </Card.Content>

        </Card>

      </Grid.Column>


      /* <div>
        <Link to={`/readentry/${this.props.data.id}`}>
          <h4>^</h4>
        </Link>
        <h4>{this.props.data.createdAt}</h4>
        <button>Delete</button>
      </div> */
    );
  }
}

export default EntryPreview;
