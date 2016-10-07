import React from 'react';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { handleLogin } from '../../modules/login';
import RaisedButton from 'material-ui/RaisedButton';

export class Login extends React.Component {
  componentDidMount() {
    handleLogin({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return <Row>
      <Col xs={ 12 } xsOffset={ 0 } sm={ 6 } smOffset={3} md={ 4 } mdOffset={4} >
        <h2 className="page-header">Login</h2>
        <form ref="login" className="login" onSubmit={ this.handleSubmit }>
          <FormGroup>
            <ControlLabel>Email Address</ControlLabel>
            <FormControl
              type="email"
              ref="emailAddress"
              name="emailAddress"
              placeholder="Email Address"
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>
              <span className="pull-left">Password</span>
              <Link className="pull-right" to="/recover-password">Forgot Password?</Link>
            </ControlLabel>
            <FormControl
              type="password"
              ref="password"
              name="password"
              placeholder="Password"
            />
          </FormGroup>
          <RaisedButton type="submit" secondary={true} fullWidth={true} label="Login"/>
        </form>
      </Col>
    </Row>;
  }
}
