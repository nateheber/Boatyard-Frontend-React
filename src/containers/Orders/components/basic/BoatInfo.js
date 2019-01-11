import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-flexbox-grid';

const FieldName = styled.div`
  margin: 0 10px 10px 0;
  font-family: Montserrat, sans-serif;
  text-transform: uppercase;
  color: #07384b;
  font-size: 12px;
  font-weight: bold;
`;

const FieldValue = styled.div`
  display: block;
  color: #8f8f8f;
  font-size: 14px;
  font-family: "Open sans-serif", sans-serif;
`;

export default ({ boat: { model, make, length } }) => (
  <React.Fragment>
    <Row>
      <Col sm={6}>
        <FieldName>MAKE</FieldName>
      </Col>
      <Col sm={6}>
        <FieldValue>{make}</FieldValue>
      </Col>
    </Row>
    <Row>
      <Col sm={6}>
        <FieldName>MODEL</FieldName>
      </Col>
      <Col sm={6}>
        <FieldValue>{model}</FieldValue>
      </Col>
    </Row>
    <Row>
      <Col sm={6}>
        <FieldName>LENGTH</FieldName>
      </Col>
      <Col sm={6}>
        <FieldValue>{length}</FieldValue>
      </Col>
    </Row>
  </React.Fragment>
)