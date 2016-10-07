import React from 'react';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { handleSignup } from '../../modules/signup';
import RaisedButton from 'material-ui/RaisedButton';

export class Signup extends React.Component {
  componentDidMount() {
    handleSignup({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return <Row>
      <Col xs={ 12 } xsOffset={ 0 } sm={ 6 } smOffset={3} md={ 4 } mdOffset={4} >
        <h2 className="page-header">Sign Up</h2>
        <form ref="signup" className="signup" onSubmit={ this.handleSubmit }>
          <Row>
            <Col xs={ 6 } sm={ 6 }>
              <FormGroup>
                <ControlLabel>First Name</ControlLabel>
                <FormControl
                  type="text"
                  ref="firstName"
                  name="firstName"
                  placeholder="First Name"
                />
              </FormGroup>
            </Col>
            <Col xs={ 6 } sm={ 6 }>
              <FormGroup>
                <ControlLabel>Last Name</ControlLabel>
                <FormControl
                  type="text"
                  ref="lastName"
                  name="lastName"
                  placeholder="Last Name"
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <ControlLabel>Email Address</ControlLabel>
            <FormControl
              type="text"
              ref="emailAddress"
              name="emailAddress"
              placeholder="Email Address"
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              ref="password"
              name="password"
              placeholder="Password"
            />
          </FormGroup>
          <RaisedButton type="submit" secondary={true} fullWidth={true} label="Sign Up"/>
        </form>
        <p>Already have an account? <Link to="/login">Log In</Link>.</p>
      </Col>
    </Row>;
  }
}
