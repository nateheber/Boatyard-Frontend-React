import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-flexbox-grid'

import { Input } from 'components/basic/Input';

const Label = styled.div`
  color: #8f8f8f;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 16px;
  line-height: 20px;
`

const Value = styled.div`
  color: #8f8f8f;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 16px;
  line-height: 20px;
`

const Placeholder = styled.span`
  cursor: pointer;
  color: #ffbc48;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 16px;
  line-height: 20px;
  &:hover {
    color: #d56f12;
  }
`

export default class TaxEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      value: props.value
    }
  }

  setEdit = () => {
    this.setState({
      edit: true
    })
  }

  resetEdit = () => {
    this.setState({
      edit: false,
    })
  }

  onChange = (evt) => {
    this.props.onChange(evt.target.value)
    this.setState({
      value: evt.target.value
    })
  }

  render() {
    const { edit, value } = this.state;
    const { taxAmount } = this.props;
    return edit ? (
      <Row style={{ padding: '10px 0px' }}>
        <Col xs={6}>
          <Input type="text" value={value} onChange={this.onChange} onBlur={this.resetEdit} />
        </Col>
        <Col xs={6}>
          <Value>
            ${parseFloat(taxAmount).toFixed(2)}
          </Value>
        </Col>
      </Row>
    ) : (
      <Row style={{ padding: '10px 0px' }}>
        <Col xs={6}>
          <Label>
            {'Tax '}
            <Placeholder onClick={this.setEdit}>
              ({`${value}%`})
            </Placeholder> :
          </Label>
        </Col>
        <Col xs={6}>
          <Value>
            ${parseFloat(taxAmount).toFixed(2)}
          </Value>
        </Col>
      </Row>    
    )
  }
}