import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-flexbox-grid'

import { Section } from 'components/basic/InfoSection'
import { TextArea } from 'components/basic/Input'
import { HollowButton } from 'components/basic/Buttons'

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

const FieldLabel = styled.div`
  color: #004258;
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 10px;
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
    const { subtotal, taxRate, deposit, discount, taxAmount, total, comments } = props
    this.state = { subtotal, taxRate, deposit, discount, taxAmount, total, comments }
  }

  updatePriceInfo = () => {
    const { comments, ...priceInfo } = this.state;
    this.props.updateOrder(priceInfo);
  }

  onChangeTax = (taxRate) => {
    const { subtotal } = this.props;
    const taxAmount = parseFloat(taxRate) * parseFloat(subtotal) / 100
    const total = taxAmount + parseFloat(subtotal)
    this.setState({ taxRate, taxAmount, total }, this.updatePriceInfo)
  }

  onChangeDeposit = (deposit) => {
    this.setState({ deposit }, this.updatePriceInfo)
  }

  onChangeDiscount = (discount) => {
    const { subtotal, taxAmount } = this.state;
    const total = parseFloat(subtotal) + parseFloat(taxAmount) - parseFloat(discount)
    this.setState({ discount, total }, this.updatePriceInfo)
  }

  onChangeComment = (comments) => {
    this.setState({ comments })
  }

  submitComments = () => {
    const { comments } = this.state;
    this.props.updateOrder({ comments });
  }

  render() {
    const { taxRate, deposit, discount, subtotal, total, taxAmount, comments } = this.state;
    return (
      <Section>
        <Row>
          <Col sm={12} md={6}>
            <FieldLabel>ORDER NOTES</FieldLabel>
            <TextArea
              value={comments}
              onChange={this.onChangeComment}
            />
            <HollowButton onClick={this.submitComments}>COMMENT INTERNALLY</HollowButton>
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
