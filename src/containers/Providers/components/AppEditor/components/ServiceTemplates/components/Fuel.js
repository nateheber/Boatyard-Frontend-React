import React from 'react';
import styled from 'styled-components';
import { set } from 'lodash';

import { ButtonInput, DescriptionInput, FuelPriceInput, TextInput, SelectorInput } from '../../../../ServiceTemplates';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 18px 10px;
  background-color: #f2f2f2;
  box-sizing: border-box;
`;

const Spacer = styled.div`
  height: 20px;
`;

export default class Fuel extends React.Component {
  constructor(props) {
    super(props);
    const {
      cost,
      unit,
      description,
      secondaryDescription,
      buttonText,
    } = props;
    this.state = {
      cost,
      unit,
      description,
      secondaryDescription,
      buttonText,
    };
  }

  onChangePrice = (field, value) => {
    const updateObject = {};
    set(updateObject, field, value);
    this.setState(updateObject, () => {
      this.props.onChange(this.state)
    });
  }

  onChange = field => (e) => {
    const updateObject = {};
    set(updateObject, field, e.target.value);
    this.setState(updateObject, () => {
      this.props.onChange(this.state)
    });
  }

  render() {
    const {
      cost,
      unit,
      buttonText,
      description,
      secondaryDescription,
    } = this.state;
    const { disabled } = this.props;
    return (
      <Wrapper>
        <FuelPriceInput disabled={disabled} cost={cost} unit={unit} onChange={this.onChangePrice} />
        <SelectorInput label="FUEL TYPE" />
        <TextInput label="GALLONS" />
        <SelectorInput label="AMOUNT" />
        <Spacer />
        <ButtonInput
          disabled={disabled}
          title={buttonText}
          onChange={this.onChange('buttonText')}
        />
        <DescriptionInput
          disabled={disabled}
          style={{ marginTop: '20px' }}
          value={description}
          onChange={this.onChange('description')}
        />
        <DescriptionInput
          disabled={disabled}
          value={secondaryDescription}
          onChange={this.onChange('secondaryDescription')}
        />
      </Wrapper>
    )
  }
}