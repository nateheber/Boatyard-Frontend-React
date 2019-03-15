import React from 'react';
import styled from 'styled-components';
import { set } from 'lodash';

import Icon from 'resources/serviceTemplate/lighteningBolt.png';

import { ButtonInput, DescriptionInput, Image, TextAreaInput } from '../../../../ServiceTemplates';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 18px 10px;
  background-color: #f2f2f2;
  box-sizing: border-box;
`;



export default class Request extends React.Component {
  constructor(props) {
    super(props);
    const { description, textAreaLabel, buttonText, secondaryDescription } = props;
    this.state = { description, textAreaLabel, buttonText, secondaryDescription };
  }

  onChange = field => (e) => {
    const updateObject = {};
    set(updateObject, field, e.target.value);
    this.setState(updateObject, () => {
      this.props.onChange(this.state)
    });
  }

  render() {
    const { description, textAreaLabel, buttonText, secondaryDescription } = this.state;
    const { disabled } = this.props;
    return (
      <Wrapper>
        <Image src={Icon} />
        <DescriptionInput
          disabled={disabled}
          value={description}
          onChange={this.onChange('description')}
        />
        <DescriptionInput
          disabled={disabled}
          value={secondaryDescription}
          onChange={this.onChange('secondaryDescription')}
          style={{ marginBottom: '20px' }}
        />
        <TextAreaInput disabled={disabled} label={textAreaLabel} onChange={this.onChange('textAreaLabel')} />
        <ButtonInput disabled={disabled} title={buttonText} onChange={this.onChange('buttonText')} />
      </Wrapper>
    )
  }
}