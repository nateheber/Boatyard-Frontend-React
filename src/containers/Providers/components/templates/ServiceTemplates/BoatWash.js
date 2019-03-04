import React from 'react';
import styled from 'styled-components';
import { set } from 'lodash';

import TitleInput from '../../basic/ServiceTemplate/TitleInput';
import DescriptionInput from '../../basic/ServiceTemplate/DescriptionInput';
import Button from '../../basic/ServiceTemplate/ButtonInput';
import PriceUnitInput from '../../basic/ServiceTemplate/PriceUnitInput';
import ListInput from '../../basic/ServiceTemplate/ListInput';

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
          className="list"
          value={listDescription}
          onChange={this.onChange('listDescription')}
        />
        <ListInput items={listItems} />
        <Button disabled={disabled} title={buttonText} onChange={this.onChange('buttonText')} />
      </Wrapper>
    )
  }
}