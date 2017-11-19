import React, { Component } from 'react';
import EntryPreview from './EntryPreview';
import { Card, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';


class DisplayEntries extends Component {
    // will need to pass the entries array as props
    //this.props.entries


    displayEntryPreview = (entryObj) => {
        return (<EntryPreview data={entryObj} key={entryObj.id} />)
    }

    render() {
        console.log('props ', this.props.entries)
        return (
            // <div>hello</div>
            <div style={{ 'grid-template-columns': 'auto auto', 'display': 'inline-grid', 'grid-gap': '1em 15%', 'width': '60%' }}>
                <Card>
                    <div height='226px' width='290px'/>
                    <div className="card-content">
                        <Card.Header>
                            Create a new entry!
                        </Card.Header>
                        <Card.Meta>
                            <span className='date'>
                                date
                            </span>
                        </Card.Meta>
                        <Card.Description>
                            mood
                        </Card.Description>
                        <Card.Content extra>
                        <Button size="massive" as={Link} to='/dashboard/writeentry'> + </Button>
                        </Card.Content>
                    </div>

                </Card>
                {this.props.entries.length ?
                    this.props.entries.map(this.displayEntryPreview) :
                    null}
            </div>

        )


    }


}
export default DisplayEntries;