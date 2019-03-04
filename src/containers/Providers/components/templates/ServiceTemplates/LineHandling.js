import React from 'react';
import styled from 'styled-components';
import { set } from 'lodash';

import Icon from 'resources/serviceTemplate/lineHandling.png';

import Image from '../../basic/ServiceTemplate/Image';
import DescriptionInput from '../../basic/ServiceTemplate/DescriptionInput';
import TextAreaInput from '../../basic/ServiceTemplate/TextAreaInput';
import Button from '../../basic/ServiceTemplate/ButtonInput';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  width: 225px;
  flex-direction: column;
  align-items: center;
  padding: 18px 10px;
  background-color: #f2f2f2;
`;



export default class LineHandling extends React.Component {
  constructor(props) {
    super(props);
    const { description, textAreaLabel, buttonText } = props;
    this.state = { description, textAreaLabel, buttonText };
  }

  onChange = field => (value) => {
    const updateObject = {};
    set(updateObject, field, value);
    this.setState(updateObject);
  }

  render() {
    const { description, textAreaLabel, buttonText } = this.state;
    return (
      <Wrapper>
        <Image src={Icon} />
        <DescriptionInput onChange={this.onChange('description')}>{description}</DescriptionInput>
        <TextAreaInput label={textAreaLabel} onChange={this.onChange('textAreaLabel')} />
        <Button title={buttonText} onChange={this.onChange(buttonText)} />
      </Wrapper>
    )
  }
}