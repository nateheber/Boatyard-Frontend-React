import React from 'react';
import styled from 'styled-components';
import { set } from 'lodash';

import TitleInput from '../../basic/ServiceTemplate/TitleInput';
import SwitchInput from '../../basic/ServiceTemplate/SwitchInput';
import DescriptionInput from '../../basic/ServiceTemplate/DescriptionInput';
import Button from '../../basic/ServiceTemplate/ButtonInput';
import PriceUnitInput from '../../basic/ServiceTemplate/PriceUnitInput';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  width: 225px;
  flex-direction: column;
  align-items: center;
  padding: 18px 10px;
  background-color: #f2f2f2;
`;



export default class PumpOut extends React.Component {
  constructor(props) {
    super(props);
    const {
      price,
      unit,
      title,
      description,
      inputLabel,
      buttonText,
    } = props;
    this.state = {
      price,
      unit,
      title,
      description,
      inputLabel,
      buttonText,
    };
  }

  onChangePrice = (field, value) => {
    const updateObject = {};
    set(updateObject, field, value);
    this.setState(updateObject);
  }

  onChange = field => (value) => {
    const updateObject = {};
    set(updateObject, field, value);
    this.setState(updateObject);
  }

  render() {
    const {
      price,
      unit,
      title,
      description,
      inputLabel,
      buttonText,
    } = this.state;
    return (
      <Wrapper>
        <PriceUnitInput unit={unit} price={price} onChange={this.onChangePrice} />
        <TitleInput value={title} onChange={this.onChange('title')} />
        <DescriptionInput onChange={this.onChange('description')}>{description}</DescriptionInput>
        <SwitchInput label={inputLabel} onChange={this.onChange('inputLabel')} />
        <Button title={buttonText} onChange={this.onChange(buttonText)} />
      </Wrapper>
    )
  }
}