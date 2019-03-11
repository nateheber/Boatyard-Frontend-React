import React from 'react';
import styled from 'styled-components';
import { set } from 'lodash';

import { ButtonInput, DescriptionInput, PriceUnitInput, SwitchInput, TitleInput } from '../../../../ServiceTemplates';

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
  height: 15px;
`;


export default class PumpOut extends React.Component {
  constructor(props) {
    super(props);
    const {
      cost,
      unit,
      subtitle,
      description,
      secondaryDescription,
      inputLabel,
      buttonText,
    } = props;
    this.state = {
      cost,
      unit,
      subtitle,
      description,
      secondaryDescription,
      inputLabel,
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
      subtitle,
      description,
      secondaryDescription,
      inputLabel,
      buttonText,
    } = this.state;
    const { disabled } = this.props;
    return (
      <Wrapper>
        <PriceUnitInput disabled={disabled} unit={unit} cost={cost} onChange={this.onChangePrice} />
        <TitleInput disabled={disabled} value={subtitle} onChange={this.onChange('subtitle')} />
        <DescriptionInput
          disabled={disabled}
          value={description}
          onChange={this.onChange('description')}
        />
        <DescriptionInput
          disabled={disabled}
          value={secondaryDescription}
          onChange={this.onChange('secondaryDescription')}
        />
        <Spacer />
        <SwitchInput disabled={disabled} label={inputLabel} onChange={this.onChange('inputLabel')} />
        <ButtonInput disabled={disabled} title={buttonText} onChange={this.onChange('buttonText')} />
      </Wrapper>
    )
  }
}