import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-flexbox-grid';
import { get } from 'lodash';

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

export default class BoatInfo extends React.Component {
  render() {
    const { boatInfo } = this.props;
    const street = get(boatInfo, 'relationships.location.relationships.address.data.street', '');
    const city = get(boatInfo, 'relationships.location.relationships.address.data.city', '');
    const state = get(boatInfo, 'relationships.location.relationships.address.data.state', '');
    const zip = get(boatInfo, 'relationships.location.relationships.address.data.zip', '');
    return (
      <React.Fragment>
        <Row>
          <Col sm={4}>
            <FieldName>MAKE</FieldName>
          </Col>
          <Col sm={8}>
            <FieldValue>{get(boatInfo, 'make', '')}</FieldValue>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <FieldName>MODEL</FieldName>
          </Col>
          <Col sm={8}>
            <FieldValue>{get(boatInfo, 'model', '')}</FieldValue>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <FieldName>LENGTH</FieldName>
          </Col>
          <Col sm={8}>
            <FieldValue>{get(boatInfo, 'length', '')}</FieldValue>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <FieldName>LOCATION</FieldName>
          </Col>
          <Col sm={8}>
            <Row>
              <Col sm={12}><FieldValue>{street}</FieldValue></Col>
              <Col sm={12}><FieldValue>{city} {state} {zip}</FieldValue></Col>
            </Row>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}