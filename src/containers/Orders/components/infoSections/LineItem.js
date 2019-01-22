import React from 'react'
import styled from 'styled-components'
import { set } from 'lodash';
import { Row, Col } from 'react-flexbox-grid'

import { Input, TextArea } from 'components/basic/Input'

import RemoveButton from '../basic/RemoveButton'

const Record = styled(Row)`
  padding: 15px 0px;
`;

const Name = styled.div`
  color: rgb(247, 148, 30);
  line-height: 20px;
  font-size: 16px;
  font-family: "Source Sans Pro";
  font-weight: 700;
`;

const Value = styled.div`

`

const Comment = styled.div`
  font-family: 'Source Sans Pro';
  font-size: 16px;
  color: #07384b;
`

export default class LineItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: props.attributes.quantity,
      cost: props.attributes.cost,
      comment: props.attributes.comment || '',
    }
  }
  onChange = (evt, field) => {
    const changeVal = {}
    set(changeVal, field, evt.target.value)
    this.setState(changeVal, () => {
      this.props.onChange(this.state);
    });
  }
  getServiceName = () => {
    const { serviceAttributes: { name } } = this.props;
    return name;
  }
  render() {
    const { mode, onRemove } = this.props;
    const { quantity, cost, comment } = this.state;
    const name = this.getServiceName();
    return (
      <React.Fragment>
        <Record>
          <Col md={4} sm={4} lg={4} xl={4} xs={4}>
            <Name>{name}</Name>
          </Col>
          <Col md={2} sm={2} lg={2} xl={2} xs={2}>
            {mode === 'edit' ? <Input type="text" value={quantity} onChange={(evt) => this.onChange(evt, 'quantity')} hideError /> : <Value>{quantity}</Value>}
          </Col>
          <Col md={2} sm={2} lg={2} xl={2} xs={2}>
            {mode === 'edit' ? <Input type="text" value={cost} onChange={(evt) => this.onChange(evt, 'cost')} hideError /> : <Value>${cost}</Value>}
          </Col>
          <Col md={2} sm={2} lg={2} xl={2} xs={2}>
            <Value>${parseInt(quantity, 10) * parseFloat(cost)}</Value>
          </Col>
          { mode === 'edit' && (
            <Col md={2} sm={2} lg={2} xl={2} xs={2}>
              <RemoveButton onClick={onRemove} />
            </Col>
          )}
        </Record>
        <Record>
          <Col sm={8}>
            {
              mode === 'edit' ? (
                <TextArea value={comment} onChange={(evt) => this.onChange(evt, 'comment')} />
              ) : (
                <Comment>{comment}</Comment>
              )
            }
          </Col>
        </Record>
      </React.Fragment>
    )
  }
}