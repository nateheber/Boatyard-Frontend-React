import React from 'react';
import styled from 'styled-components';

import { Input } from 'components/basic/Input'

const Title = styled.div`
  font-family: Montserrat, sans-serif;
  color: #07384b;
  margin-top: 0;
  margin-bottom: 25px;
`

const FieldWrapper = styled.div`
  margin-bottom: 15px;
  color: #8f8f8f;
  font-size: 14px;
  font-family: "Open sans-serif", sans-serif;
  font-weight: 400;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Label = styled.div`
  display: inline-block;
  width: 50%;
`

const Value = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ValueEditor = styled(Input)`
  margin-left: 5px;
`

export default class ChargeSelector extends React.Component {
  onChange = field => evt => {
    const { balance, fee } = this.props;
    const data = { balance, fee };
    data[field] = evt.target.value;
    this.props.onChange(data);
  }
  render() {
    const { balance, fee } = this.props;
    return (
      <div>
        <Title>Balance: ${balance}</Title>
        <FieldWrapper>
          <Label>Amount to Charge:</Label>
          <Value>$ <ValueEditor type="text" value={balance} onChange={this.onChange('balance')} /></Value>
        </FieldWrapper>
        <FieldWrapper>
          <Label>Boatyard Fee:</Label>
          <Value>$ <ValueEditor type="text" value={fee} onChange={this.onChange('fee')} /></Value>
        </FieldWrapper>
      </div>
    )
  }
}