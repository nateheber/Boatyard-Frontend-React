import React from 'react';
import styled from 'styled-components';
import AutoResize from 'react-input-autosize';
import { set } from 'lodash';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: flex-end;
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  font-size: 28.8px;
  color: #f7941e;
`;

const priceInputStyle = {
  fontFamily: 'DIN',
  fontSize: 28.8,
  color: '#f7941e',
  background: 'transparent',
  outline: 'none',
  border: 'none',
};

const UnitWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 12px;
  font-weight: 500;
  color: #093849;
  padding-bottom: 5px;
`;

const unitInputStyle = {
  fontFamily: 'DIN',
  fontSize: '12px',
  fontWeight: 500,
  background: 'transparent',
  outline: 'none',
  border: 'none',
};

export default class PriceUnitInput extends React.Component {
  constructor(props) {
    super(props);
    const { unit, price } = this.props;
    this.state = { unit, price };
  }

  onChange = value => (e) => {
    const updateField = {};
    set(updateField, value, e.target.value);
    this.setState(updateField);
    this.props.onChange(value, e.target.value);
  }

  render () {
    const { style, disabled } = this.props;
    const { unit, price } = this.state;
    return (
      <Wrapper style={style}>
        <PriceWrapper>
          $<AutoResize disabled={disabled} value={price} inputStyle={priceInputStyle} onChange={this.onChange('price')} />
        </PriceWrapper>
        <UnitWrapper>
          /<AutoResize disabled={disabled} value={unit} inputStyle={unitInputStyle} onChange={this.onChange('unit')} />
        </UnitWrapper>
      </Wrapper>
    )
  }
}