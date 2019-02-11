import React from 'react'
import styled from 'styled-components'
import { isEmpty } from 'lodash'
import { Row, Col } from 'react-flexbox-grid'

import { Input } from 'components/basic/Input';

const Label = styled.div`
  color: #8f8f8f;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 16px;
  line-height: 20px;
  font-weight:  regular;
`

const Placeholder = styled.div`
  cursor: pointer;
  color: #ffbc48;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 16px;
  line-height: 20px;
  &:hover {
    color: #d56f12;
  }
`

export default class OnClickEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      value: props.value,
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
    this.setState({ value: evt.target.value })
    this.props.onChange(evt.target.value);
  }
  

  render() {
    const { edit, value } = this.state;
    const { label } = this.props;
    return edit ? (
      <Row style={{ padding: '10px 0px' }}>
        <Col sm={6}>
          <Label>{label}:</Label>
        </Col>
        <Col sm={6}>
          <Input autoFocus type="text" pattern="[0-9]*" value={value} onChange={this.onChange} onBlur={this.resetEdit} />
        </Col>
      </Row>
    ) : (
      <Row style={{ padding: '10px 0px' }}>
        <Col sm={6}>
          <Label>{label}:</Label>
        </Col>
        <Col sm={6}>
          <Placeholder onClick={this.setEdit}>
            {isEmpty(value) ? 'Add' : `$${parseFloat(value).toFixed(2)}`}
          </Placeholder>
        </Col>
      </Row>
    )
  }
}