import React from 'react'
import styled from 'styled-components'
import { isEmpty } from 'lodash'
import { Row, Col } from 'react-flexbox-grid'

import { CurrencyInput } from 'components/basic/Input';

const Label = styled.div`
  color: #8f8f8f;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 16px;
  line-height: 20px;
  font-weight:  regular;
`;

const Placeholder = styled.div`
  cursor: pointer;
  color: #ffbc48;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 16px;
  line-height: 20px;
  &:hover {
    color: #d56f12;
  }
`;

const UpdatedRow = styled(Row)`
  min-height: 40px;
  align-items: center;
`;

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
    const value = evt.target.value && evt.target.value.replace('$', '');
    this.setState({ value });
    this.props.onChange(value);
  }
  
  render() {
    const { edit, value } = this.state;
    const { label } = this.props;
    return edit ? (
      <UpdatedRow>
        <Col xs={6}>
          <Label>{label}:</Label>
        </Col>
        <Col xs={6}>
          <CurrencyInput
            style={{ marginBottom: 0 }}
            autoFocus
            fixedDecimalScale
            prefix='$'
            decimalScale={2}
            value={value}
            onChange={this.onChange}
            onBlur={this.resetEdit}
            hideError
          />
        </Col>
      </UpdatedRow>
    ) : (
      <UpdatedRow>
        <Col xs={6}>
          <Label>{label}:</Label>
        </Col>
        <Col xs={6}>
          <Placeholder onClick={this.setEdit}>
            {isEmpty(value) ? 'Add' : `$${parseFloat(value).toFixed(2)}`}
          </Placeholder>
        </Col>
      </UpdatedRow>
    )
  }
}