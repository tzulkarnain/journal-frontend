import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';





class SimpleChart extends Component {
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
        pointHitRadius: 25,
        data: entries.map(entry => entry.mood)
      }
    ]
  });

  options = {
    onClick: (e, item) => item[0]?console.log("Item", this.props.entries[item[0]._index], "clicked"):null,
    //  events: ["click","hover"],
    maintainAspectRatio: false,
    offset:true
  }

  render() {
    console.log("the simplechart props are:", this.props.entries)
    console.log("the data labels are:", this.data.labels)
    return (
      // style this div to set the 
      <div style={{height:500,width:700}}>
        <h2>{`Mood over the past ${this.props.period} days`}</h2>

        <Line 
        data={this.data(this.props.entries, this.props.period)} 
        
        options={this.options} />
      </div>
    );
  }
}

export default SimpleChart;