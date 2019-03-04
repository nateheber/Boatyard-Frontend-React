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

  onChange = field => (e) => {
    const updateObject = {};
    set(updateObject, field, e.target.value);
    this.setState(updateObject);
  }

  render() {
    const { description, textAreaLabel, buttonText } = this.state;
    const { disabled } = this.props;
    return (
      <Wrapper>
        <Image src={Icon} />
        <DescriptionInput disabled={disabled} onChange={this.onChange('description')}>{description}</DescriptionInput>
        <TextAreaInput disabled={disabled} label={textAreaLabel} onChange={this.onChange('textAreaLabel')} />
        <Button disabled={disabled} title={buttonText} onChange={this.onChange('buttonText')} />
      </Wrapper>
    )
  }
}