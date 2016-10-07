import { Row, Col, ListGroupItem, FormControl, Button } from 'react-bootstrap';
import {Chart} from 'react-google-charts';
import React from 'react'
var _ = require('lodash');

export default class SentimentChart extends React.Component {
  constructor(props){
    super(props);
    this.state={
      options:{
        animation: {"startup": true,duration:1000,easing:'out',},
        title: 'Sentiment Analysis',
        width: 400,
        height: 300,
        legend: 'none',
        bar:{"groupWidth":"95%"}
      },
      flights:[]
    }
  }

  componentDidMount() {
    var obj = _.groupBy(this.props.feedbacks, 'flightId');
    this.setState({flights : Object.keys(obj).map(function (key) { return obj[key]; }) });
  }

  componentWillReceiveProps(nextProps) {
    var obj = _.groupBy(nextProps.feedbacks, 'flightId');
    this.setState({flights : Object.keys(obj).map(function (key) { return obj[key]; }) });
  }


  render() {
    return <Row>
    {this.state.flights.map((flight ,idx)=> {
      const flightTitle = flight[0].passenger.airlineCode + flight[0].passenger.flightNum;
      const sentiment = _.groupBy(flight,'sentiment');
      const options = this.state.options;
      options.title = 'Sentiment Analysis for flight ' + flightTitle
      return(
        <Col xs={4} key={idx}>
      <Chart chartType="PieChart"  data={[['Sentiment','Count'],['Positive', sentiment['true'].length],['Negative',sentiment['false'].length]] }
        options={options} graph_id={"SentimentChart"+idx}  width={"50%"} height={"400px"}  legend_toggle={true} />
        </Col>
      )
    })}
    </Row>
  }
};
