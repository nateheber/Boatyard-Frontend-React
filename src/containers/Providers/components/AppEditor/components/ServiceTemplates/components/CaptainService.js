import React from 'react';
import styled from 'styled-components';
import { set } from 'lodash';

import { ButtonInput, DescriptionInput, ListInput, PriceUnitInput, TitleInput } from '../../../../ServiceTemplates';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 18px 10px;
  background-color: #f2f2f2;
  box-sizing: border-box;
`;



export default class CaptainService extends React.Component {
  constructor(props) {
    super(props);
    const {
      cost,
      unit,
      subtitle,
      description,
      listDescription,
      listItems,
      requiredText,
      buttonText,
    } = props;
    this.state = {
      cost,
      unit,
      subtitle,
      description,
      listDescription,
      listItems,
      requiredText,
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
      cost,
      unit,
      subtitle,
      description,
      listDescription,
      listItems,
      buttonText,
      requiredText,
    } = this.state;
    const { disabled } = this.props;
    return (
      <Wrapper>
        <PriceUnitInput disabled={disabled} unit={unit} cost={cost} onChange={this.onChangePrice} />
        <TitleInput disabled={disabled} value={subtitle} onChange={this.onChange('subtitle')} />
        <DescriptionInput
          disabled={disabled}
          value={description}
          style={{ marginBottom: '5px' }}
          onChange={this.onChange('description')}
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
        <DescriptionInput
          disabled={disabled}
          className="required"
          value={requiredText}
          onChange={this.onChange('requiredText')}
        />
        <ButtonInput disabled={disabled} title={buttonText} onChange={this.onChange('buttonText')} />
      </Wrapper>
    )
  }
}