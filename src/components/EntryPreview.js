import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/*
logic:
1. Arrow links to that entry's ReadEntry
2. Date = date of that entry, needs to pull date from database. 
3. Delete = deletes entry
4. carosaul that shows 2 entries and an arrow on either side. not sure how to do this??
//todo: only display date
*/

class EntryPreview extends Component {
  render() {
    return (
        <div>
          <Link to="/readentry"><h4>^</h4></Link>
          <h4>{this.props.data.createdAt}</h4>
          <button>Delete</button>
        </div>
    );
  }
}

export default EntryPreview;
