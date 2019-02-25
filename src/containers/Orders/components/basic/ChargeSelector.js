import React from 'react';
import styled from 'styled-components';

import { CurrencyInput } from 'components/basic/Input'

const Title = styled.div`
  font-family: Montserrat, sans-serif;
  color: #07384b;
  margin-top: 0;
  margin-bottom: 25px;
  font-size: 14px;
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
  margin-bottom: 5px;
  font-weight: 600;
  letter-spacing: -0.5px;
`

const Value = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ValueEditor = styled(CurrencyInput)`
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
    const { balance, fee, previlage } = this.props;
    return (
      <div>
        <Title>Balance: ${parseFloat(balance || '0').toFixed(2)}</Title>
        <FieldWrapper>
          <Label>Amount to Charge:</Label>
          <Value>
            <Label style={{ width: 'initial', marginLeft: '10px'}}>$</Label>
            <ValueEditor fixedDecimalScale decimalScale={2} value={balance} onChange={this.onChange('balance')} />
          </Value>
        </FieldWrapper>
        {
          previlage === 'admin' && (
            <FieldWrapper>
              <Label>Boatyard Fee:</Label>
              <Value>
                <Label style={{ width: 'initial', marginLeft: '10px'}}>$</Label>
                <ValueEditor decimalScale={2} value={fee} onChange={this.onChange('fee')} />
              </Value>
            </FieldWrapper>
          )
        }
      </div>
    )
  }
}