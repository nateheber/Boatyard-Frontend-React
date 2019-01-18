import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-flexbox-grid'

import { Section } from 'components/basic/InfoSection'

import OnClickEditor from '../basic/OnClickEditor'
import TaxEditor from '../basic/TaxEditor'

const Label = styled.div`
  color: #8f8f8f;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 16px;
  line-height: 20px;
  &.total {
    font-weight: bold;
    color: #07384b;
  }
`

const Value = styled.div`
  color: #8f8f8f;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 16px;
  line-height: 20px;
  &.total {
    font-weight: bold;
    color: #07384b;
  }
`

export default class OrderReviewSection extends React.Component {
  constructor(props) {
    super(props)
    const { subtotal, taxRate, deposit, discount, taxAmount, total } = props
    this.state = { subtotal, taxRate, deposit, discount, taxAmount, total }
  }

  onChangeTax = (taxRate) => {
    const { subtotal } = this.props;
    const taxAmount = parseFloat(taxRate) * parseFloat(subtotal) / 100
    const total = parseFloat(taxAmount) + parseFloat(subtotal)
    this.setState({ taxRate, taxAmount, total }, () => { this.props.updateOrder(this.state) })
  }

  onChangeDeposit = (deposit) => {
    this.setState({ deposit }, () => { this.props.updateOrder(this.state) })
  }

  onChangeDiscount = (discount) => {
    const { subtotal, taxAmount } = this.state;
    const total = parseFloat(subtotal) + parseFloat(taxAmount) - parseFloat(discount)
    console.log(discount, total, subtotal, taxAmount)
    this.setState({ discount, total }, () => { this.props.updateOrder(this.state) })
  }

  render() {
    const { taxRate, deposit, discount, subtotal, total, taxAmount } = this.state;
    return (
      <Section>
        <Row>
          <Col sm={12} md={6}>
          </Col>
          <Col sm={12} md={6}>
            <Row>
              <Col sm={6}><Label>Subtotal:</Label></Col>
              <Col sm={6}><Value>${subtotal}</Value></Col>
            </Row>
            <TaxEditor value={taxRate} taxAmount={taxAmount} onChange={this.onChangeTax} />
            <OnClickEditor value={deposit} label="Deposit" onChange={this.onChangeDeposit} />
            <OnClickEditor value={discount} label="Discount" onChange={this.onChangeDiscount} />
            <Row>
              <Col sm={6}><Label className="total">Total:</Label></Col>
              <Col sm={6}><Value className="total">${total}</Value></Col>
            </Row>
          </Col>
        </Row>
      </Section>
    )
  }
}