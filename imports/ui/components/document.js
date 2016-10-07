import React from 'react';
import { Row, Col, ListGroupItem, FormControl, Button } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { updateDocument, removeDocument } from '../../api/documents/methods.js';

const handleUpdateDocument = (documentId, event) => {
  const title = event.target.value.trim();
  if (title !== '' && event.keyCode === 13) {
    updateDocument.call({
      _id: documentId,
      update: { title },
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Document updated!', 'success');
      }
    });
  }
};

const handleRemoveDocument = (documentId, event) => {
  event.preventDefault();
  // this should be replaced with a styled solution so for now we will
  // disable the eslint `no-alert`
  // eslint-disable-next-line no-alert
  if (confirm('Are you sure? This is permanent.')) {
    removeDocument.call({
      _id: documentId,
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Document removed!', 'success');
      }
    });
  }
};

export const Document = ({ document }) => (
  <ListGroupItem key={ document._id }>
    <Row>
      <Col xs={1} sm={1} className="text-center">
        {document.seat}
      </Col>

      <Col xs={3} sm={3} className="text-center">
        {document.passenger.fullName}
      </Col>

      <Col xs={ 5 } sm={ 6 }>
        {document.title}
      </Col>

      <Col xs={ 3 } sm={ 2 }>
        <Button
          bsStyle="danger"
          className="btn-block"
          onClick={ handleRemoveDocument.bind(this, document._id) }>
          Assigned
        </Button>
      </Col>
    </Row>
  </ListGroupItem>
);
