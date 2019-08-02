import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-flexbox-grid'

const Field = styled.div`
  color: #004258;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 10px;
  margin-bottom: 10px;
  line-height: 1.1;
  font-family: 'Montserrat', sans-serif !important;
`

export default () => (
  <Row>
    <Col md={6} sm={6} lg={6} xl={6} xs={6}>
      <Field>Item name</Field>
    </Col>
    <Col md={2} sm={2} lg={2} xl={2} xs={2}>
      <Field>Qty</Field>
    </Col>
    <Col md={2} sm={2} lg={2} xl={2} xs={2}>
      <Field>Unit cost</Field>
    </Col>
    <Col md={2} sm={2} lg={2} xl={2} xs={2}>
      <Field>Total</Field>
    </Col>
  </Row>
)