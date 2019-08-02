import React from 'react';
import styled from 'styled-components';
import { set } from 'lodash';

import { ButtonInput, DescriptionInput, ListInput, TitleInput } from '../../../../ServiceTemplates';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 18px 10px;
  background-color: #f2f2f2;
  box-sizing: border-box;
`;



export default class BookList extends React.Component {
  constructor(props) {
    super(props);
    const {
      subtitle,
      description,
      listDescription,
      listItems,
      buttonText,
    } = props;
    this.state = {
      subtitle,
      description,
      listDescription,
      listItems,
      buttonText,
    };
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
      subtitle,
      description,
      listDescription,
      listItems,
      buttonText,
    } = this.state;
    const { disabled } = this.props;
    return (
      <Wrapper>
        <TitleInput disabled={disabled} value={subtitle} onChange={this.onChange('subtitle')} />
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