import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/*
logic:
1. Arrow links to that entry's ReadEntry
2. Date = date of that entry
3. Delete = deletes entry
*/

class EntryPreview extends Component {
  render() {
    return (
        <div>
          <Link to="/readentry">Arrow</Link>
          <span>Date</span>
          <button>Delete</button>
        </div>
    );
  }
}

export default EntryPreview;
