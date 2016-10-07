import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import DocumentsList from '../containers/documents-list.js';
import BarChart from "../containers/bar-chart.js";
import SentimentChart from "../containers/sentiment-chart.js";
import FeedbackTable from "../containers/feedback-table.js"
import { AddDocument } from '../components/add-document.js';
import {Chart} from 'react-google-charts'
import TimePicker from 'material-ui/TimePicker';
import Paper from 'material-ui/Paper';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

const initialState = { value: undefined, delayed: false, takeOff: false, touchDown: false };

export class FlightDataActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleChangeTimePicker12=this.handleChangeTimePicker12.bind(this);
    this.sendAnnouncement=this.sendAnnouncement.bind(this);
    this.delayFlight=this.delayFlight.bind(this);
    this.takeOff=this.takeOff.bind(this);
    this.touchDown=this.touchDown.bind(this);
  }

  handleChangeTimePicker12(event, date) {
    this.setState({value: date});
  };

  sendAnnouncement(postType, value) {
    if(value)
      Meteor.call('updateDelay', this.props.params.id, postType, value)
    else
      Meteor.call('updateFlight',this.props.params.id, postType)

    this.setState({delayed: false})
  }

  delayFlight() {
    this.setState({
      delayed:!this.state.delayed,
      value: undefined
    })
  }

  takeOff() {
    if(!this.state.takeOff)
      this.sendAnnouncement('startflight');
    this.setState({takeOff:!this.state.takeOff})
  }

  touchDown() {
    if(!this.state.touchDown)
      this.sendAnnouncement('endflight');
    this.setState({touchDown: !this.state.touchDown})
  }

  render() {
    return (
    <Grid>
    <Row>
      <Col xs={ 12 }>
      {this.props.params.id && <h2 className="page-header text-center">Actions for Flight: {this.props.params.id}</h2> }
      </Col>

    </Row>

    <Row>
      <Col xs={ 12 } md ={4}>
      <Paper  zDepth={1} style ={{padding: "3px 0px 23px 0",margin: "10px"}}>

      <h3 className="text-center">Passenger Communication</h3>
      <Row>
      <Col xs={ 4 } xsOffset={4} md={8} mdOffset={2}>

      <div style={{ maxWidth: 250 }}>
        <Toggle label="Flight Take Off" toggled={this.state.takeOff} onTouchTap={this.takeOff}/>
        <Toggle label="Flight Touch Down" toggled={this.state.touchDown} onTouchTap={this.touchDown}/>
        <Toggle label="Flight Delay" toggled={this.state.delayed} onTouchTap={this.delayFlight}/>
        {this.state.delayed && <div>
          <TimePicker format="ampm" hintText="Enter time of flight" value={this.state.value} onChange={this.handleChangeTimePicker12}/>
          <RaisedButton label="Announce" fullWidth={true} primary={true} onTouchTap={()=>this.sendAnnouncement('flightdelay', this.state.value)}/>
        </div>}
      </div>
      </Col>
      </Row>
        </Paper>

      </Col>

      <Col xs={ 12 } md={8}>
      <Paper  zDepth={1} style ={{padding: "3px 0px 23px 0",margin: "10px"}}>
        <h3 className="text-center">Passenger Requests</h3>
        <DocumentsList />
      </Paper>
      </Col>

    </Row>
    </Grid>

    )
  }
}
