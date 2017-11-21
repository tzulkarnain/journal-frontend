import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import EntryPreview from './EntryPreview';

class SimpleChart extends Component {

  constructor() {
    super()
    this.state={
      hoveredChartPoint:null
    } 
  }

  displayDate = timeStamp => {
    let newDateArray = timeStamp.split('T');
    let justDate = newDateArray[0];
    return justDate;
  }

  data = (entries, period) => ({
    labels: entries.map(entry => this.displayDate(entry.createdAt)),
    datasets: [
      {
        label: "Mood Rating",
        fill: false,
        lineTension: 0.3,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 20,
        data: entries.map(entry => entry.mood)
      }
    ]
  });

  hoverHandler = (e, item) => item[0] ? (console.log("Item", this.props.entries[item[0]._index], "hovered - state: ",this.state),
  this.setState({hoveredChartPoint:this.props.entries[item[0]._index]}))
  :(null)

  clickHandler=(e,item)=> item[0]? this.props.hist.push(`/dashboard/readentry/${this.props.entries[item[0]._index].id}`):(null)


   options = {
    onHover: this.hoverHandler,
    onClick: this.clickHandler,
    //  events: ["click","hover"],
    maintainAspectRatio: false,
    offset:true
  }

  render() {
    // console.log("the simplechart props are:", this.props.entries)
    // console.log("the data labels are:", this.data.labels)
    return (
            // style this div however you want, it is the container for the chart and will determine size.

      <div style={{display:"flex",height:500,width:1000}}>
        {/*essentially the way to use this chart is that each point corresponds to an entry.
        when a user hovers over a point in the chart corresponding
        to an entry, the short-form info for that entry will get put into this.state.hoveredChartPoint.
        */}
        <div style={{height:500,width:700}}>
          <h2>{`Mood over the past ${this.props.period} days`}</h2>
        
          <Line data={this.data(this.props.entries, this.props.period)} options={this.options} />
        </div>
        {/* this next part just checks if an entry's being hovered over, and if so,
        renders an EntryPreview object with the data from that entry! */}
        {this.state.hoveredChartPoint ?
        <EntryPreview data={this.state.hoveredChartPoint} key={this.state.hoveredChartPoint.id} />
        : null}
        

      </div>
    );
  }
}

export default SimpleChart;