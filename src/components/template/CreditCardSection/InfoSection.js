import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-flexbox-grid'
import { capitalize } from 'lodash'

import CheckedMarker from 'resources/checked_marker.png'

const CardInfo = styled.div`
  color: #094359;
  font-family: "Source Sans",sans-serif !important;
  font-size: 14px;
`

const MarkerImg = styled.img`
  width: 23px;
  height: 20px;
`

export default ({ creditCard: { name, last4 } }) => (
  <Row>
    <Col sm={7}><CardInfo>{capitalize(name)} xxxxxx{last4}</CardInfo></Col>
    <Col sm={2}><MarkerImg src={CheckedMarker}/></Col>
  </Row>
)