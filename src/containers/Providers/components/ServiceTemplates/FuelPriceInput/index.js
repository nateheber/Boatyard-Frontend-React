import React from 'react';
import styled from 'styled-components';
import AutoResize from 'react-input-autosize';
import { set } from 'lodash';

import GasStationImage from 'resources/serviceTemplate/gasStation.png';

const Wrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  width: calc(100% + 20px);
  flex-direction: row;
  align-items: center;
  height: 52.8px;
  background-color: #f7941e;
  margin-bottom: 20px;
  padding: 16px 32px;
  color: white;
  margin-top: -18px;
`;

const Image = styled.img`
  width: 16px;
  height: 21px;
  margin-right: 12px;
`;

const PriceWrapper = styled.div`
  font-family: DIN;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const editorStyle = {
  fontFamily: 'DIN',
  fontSize: '12px',
  color: '#FFFFFF',
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
};

export default class FuelPriceInput extends React.Component {
  constructor(props) {
    super(props);
    const { cost, unit } = props;
    this.state = { cost, unit };
  }

  onChange = field => (e) => {
    const updateField = {};
    set(updateField, field, e.target.value);
    this.props.onChange(field, e.target.value);
  }

  render() {
    const { cost, unit } = this.state;
    const { disabled } = this.props;
    return (
      <Wrapper>
        <Image src={GasStationImage} />
        <PriceWrapper>
          Price: <AutoResize disabled={disabled} value={cost} inputStyle={editorStyle} onChange={this.onChange('cost')} />/<AutoResize disabled={disabled} value={unit} inputStyle={editorStyle} onChange={this.onChange('unit')} />
        </PriceWrapper>
      </Wrapper>
    )
  }
}

