import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-flexbox-grid'
import { capitalize } from 'lodash'

import CheckedMarker from 'resources/checked_marker.png'

const CardInfo = styled.div`
  color: #094359;
  font-family: 'Source Sans', sans-serif !important;
  font-size: 16px;
  text-align: left;
  line-height: 24px;
`;

const MarkerImg = styled.img`
  width: 23px;
  height: 20px;
`;

const formatCard = (name) => {
  switch(name)
  {
    case 'Visa':
      return 'Visa';
      break;
    case 'Mastercard':
      return 'MasterCard';
      break;
    case 'Amex':
      return 'AmEx';
      break;
    default:
      return '';
  }
};

export default ({ creditCard: { name, last4, isDefault } }) => (
  <Row style={{ marginBottom: 10 }}>
    <Col sm={7}><CardInfo>{formatCard(capitalize(name))} xxxx{last4}</CardInfo></Col>
    {isDefault && <Col sm={2}><MarkerImg src={CheckedMarker}/></Col>}
  </Row>
)