import React from 'react';
import styled from 'styled-components';
import { set } from 'lodash';

import Icon from 'resources/serviceTemplate/trashPickup.png';

import { ButtonInput, DescriptionInput, Image, PriceUnitInput, TextAreaInput } from '../../../basic';

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

  onChange = field => (e) => {
    const updateObject = {};
    set(updateObject, field, e.target.value);
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
    const { disabled } = this.props;
    return (
      <Wrapper>
        <Image src={Icon} />
        <PriceUnitInput disabled={disabled} unit={unit} price={price} style={{ marginBottom: '18px' }} onChange={this.onChangePrice} />
        <DescriptionInput
          disabled={disabled}
          value={description}
          onChange={this.onChange('description')}
        />
        <TextAreaInput disabled={disabled} label={textAreaLabel} onChange={this.onChange('textAreaLabel')} />
        <ButtonInput disabled={disabled} title={buttonText} onChange={this.onChange('buttonText')} />
      </Wrapper>
    )
  }
}