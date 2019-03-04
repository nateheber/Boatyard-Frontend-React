import React from 'react';
import styled from 'styled-components';
import { set } from 'lodash';

import Icon from 'resources/serviceTemplate/trashPickup.png';

import Image from '../../basic/ServiceTemplate/Image';
import DescriptionInput from '../../basic/ServiceTemplate/DescriptionInput';
import TextAreaInput from '../../basic/ServiceTemplate/TextAreaInput';
import Button from '../../basic/ServiceTemplate/ButtonInput';
import PriceUnitInput from '../../basic/ServiceTemplate/PriceUnitInput';

const Wrapper = styled.div`
  display: flex;
  width: 225px;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 18px 10px;
  background-color: #f2f2f2;
`;



export default class TrashPickup extends React.Component {
  constructor(props) {
    super(props);
    const {
      price,
      unit,
      description,
      textAreaLabel,
      buttonText,
    } = props;
    this.state = {
      price,
      unit,
      description,
      textAreaLabel,
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
      description,
      textAreaLabel,
      buttonText,
    } = this.state;
    return (
      <Wrapper>
        <Image src={Icon} />
        <PriceUnitInput unit={unit} price={price} style={{ marginBottom: '18px' }} onChange={this.onChangePrice} />
        <DescriptionInput onChange={this.onChange('description')}>{description}</DescriptionInput>
        <TextAreaInput label={textAreaLabel} onChange={this.onChange('textAreaLabel')} />
        <Button title={buttonText} onChange={this.onChange(buttonText)} />
      </Wrapper>
    )
  }
}