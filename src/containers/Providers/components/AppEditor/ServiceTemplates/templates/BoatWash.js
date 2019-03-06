import React from 'react';
import styled from 'styled-components';
import { set } from 'lodash';

import { ButtonInput, DescriptionInput, ListInput, PriceUnitInput, TitleInput } from '../../../basic';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  width: 225px;
  flex-direction: column;
  align-items: center;
  padding: 18px 10px;
  background-color: #f2f2f2;
`;



export default class BoatWash extends React.Component {
  constructor(props) {
    super(props);
    const {
      price,
      unit,
      title,
      description,
      listDescription,
      listItems,
      buttonText,
    } = props;
    this.state = {
      price,
      unit,
      title,
      description,
      listDescription,
      listItems,
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

  onChangeList = (listItems) => {
    this.setState({ listItems });
  }

  render() {
    const {
      price,
      unit,
      title,
      description,
      listDescription,
      listItems,
      buttonText,
    } = this.state;
    const { disabled } = this.props;
    return (
      <Wrapper>
        <PriceUnitInput disabled={disabled} unit={unit} price={price} onChange={this.onChangePrice} />
        <TitleInput disabled={disabled} value={title} onChange={this.onChange('title')} />
        <DescriptionInput
          disabled={disabled}
          value={description}
          style={{ marginBottom: '20px' }}
          onChange={this.onChange('description')}
        />
        <DescriptionInput
          disabled={disabled}
          className="list"
          value={listDescription}
          onChange={this.onChange('listDescription')}
        />
        <ListInput disabled={disabled} items={listItems} onChange={this.onChangeList} />
        <ButtonInput disabled={disabled} title={buttonText} onChange={this.onChange('buttonText')} />
      </Wrapper>
    )
  }
}