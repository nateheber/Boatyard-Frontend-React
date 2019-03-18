import React from 'react';
import styled from 'styled-components';
import { set } from 'lodash';

import Icon from 'resources/serviceTemplate/lighteningBolt.png';

import { ButtonInput, DescriptionInput, Image, TextAreaInput, ListInput } from '../../../../ServiceTemplates';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 18px 10px;
  background-color: #f2f2f2;
  box-sizing: border-box;
`;



export default class RequestList extends React.Component {
  constructor(props) {
    super(props);
    const {
      description,
      listDescription,
      listItems,
      textAreaLabel,
      buttonText,
    } = props;
    this.state = {
      description,
      listDescription,
      listItems,
      textAreaLabel,
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

  onChangeList = (listItems) => {
    this.setState({ listItems }, () => {
      this.props.onChange(this.state)
    });
  }

  render() {
    const {
      description,
      listDescription,
      listItems,
      textAreaLabel,
      buttonText,
    } = this.state;
    const { disabled } = this.props;
    return (
      <Wrapper>
        <Image src={Icon} />
        <DescriptionInput
          disabled={disabled}
          value={description}
          onChange={this.onChange('description')}
          style={{ marginBottom: 20 }}
        />
        <DescriptionInput
          disabled={disabled}
          className="list"
          value={listDescription}
          onChange={this.onChange('listDescription')}
        />
        <ListInput
          disabled={disabled}
          items={listItems}
          onChange={this.onChangeList}
          style={{ marginBottom: '20px' }}
        />
        <TextAreaInput disabled={disabled} label={textAreaLabel} onChange={this.onChange('textAreaLabel')} />
        <ButtonInput disabled={disabled} title={buttonText} onChange={this.onChange('buttonText')} />
      </Wrapper>
    )
  }
}