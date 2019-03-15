import React from 'react';
import styled from 'styled-components';
import { set } from 'lodash';

import Icon from 'resources/serviceTemplate/pushForHelp.png';

import { DescriptionInput, Image } from '../../../../ServiceTemplates';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 18px 10px;
  background-color: #f2f2f2;
  box-sizing: border-box;
`;



export default class GetHelp extends React.Component {
  constructor(props) {
    super(props);
    const { description, subtitle } = props;
    this.state = { description, subtitle };
  }

  onChange = field => (e) => {
    const updateObject = {};
    set(updateObject, field, e.target.value);
    this.setState(updateObject, () => {
      this.props.onChange(this.state)
    });
  }

  render() {
    const { description, subtitle } = this.state;
    const { disabled } = this.props;
    return (
      <Wrapper>
        <DescriptionInput
          className="title"
          disabled={disabled}
          value={subtitle}
          onChange={this.onChange('subtitle')}
        />
        <Image src={Icon} className="getHelp" />
        <DescriptionInput
          disabled={disabled}
          value={description}
          style={{ marginBottom: '20px' }}
          onChange={this.onChange('description')}
        />
      </Wrapper>
    )
  }
}