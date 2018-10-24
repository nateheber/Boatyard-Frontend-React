import React from 'react';
import styled from 'styled-components';
import { findIndex, filter, startsWith } from 'lodash';

import { HollowButton } from '../../basic/Buttons';
import { CheckBox, SearchBox } from '../../basic/Input';
import { MessageItem, InboxItem } from '../../basic/Message';

const Wrapper = styled.div``;

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: 'Source Sans', sans-serif !important;
  height: 80px;
  padding: 15px 30px;
  border-bottom: 1px solid rgb(230, 230, 230);
`;

const Content = styled.div``;

export class InboxSelector extends React.Component {
  state = {
    selected: [],
    checkAll: false,
    keyword: ''
  };
  selectAll = () => {
    const { checkAll } = this.state;
    const { items } = this.props;
    if (checkAll) {
      this.setState({
        selected: [],
        checkAll: false
      });
    } else {
      this.setState({
        selected: items.map(item => item.id),
        checkAll: true
      });
    }
  };
  isSelected = id => {
    const { selected } = this.state;
    const idx = findIndex(selected, selectedItem => selectedItem === id);
    return idx >= 0;
  };
  onCheck = id => {
    const { onChangeSelection } = this.props;
    const { selected } = this.state;
    const isSelected = this.isSelected(id);
    if (isSelected) {
      this.setState(
        {
          checkAll: false,
          selected: filter(selected, sel => sel !== id)
        },
        () => {
          onChangeSelection(this.state.selected);
        }
      );
    } else {
      this.setState(
        {
          selected: [...selected, id]
        },
        () => {
          onChangeSelection(this.state.selected);
        }
      );
    }
  };
  setFilter = keyword => {
    this.setState({
      keyword
    });
  };
  filter = () => {
    const { items } = this.props;
    const { keyword } = this.state;
    return filter(items, item => {
      return (
        startsWith(item.title, keyword) || startsWith(item.textBody, keyword)
      );
    });
  };
  render() {
    const { onSelect, onDelete } = this.props;
    const { checkAll, selected } = this.state;
    const items = this.filter();
    return (
      <Wrapper>
        <FilterWrapper>
          <CheckBox checked={checkAll} onClick={this.selectAll} />
          {selected.length > 0 ? (
            <HollowButton onClick={onDelete}>DELETE MESSAGES</HollowButton>
          ) : (
            <SearchBox secondary onChange={this.setFilter} />
          )}
        </FilterWrapper>
        <Content>
          {items.map((item, key) => (
            <MessageItem
              onClick={() => {
                onSelect(item.id);
              }}
              key={`QR_${key}`}
            >
              <InboxItem
                selected={this.isSelected(item.id)}
                onSelect={() => {
                  onSelect(item.id);
                }}
                onCheck={() => {
                  this.onCheck(item.id);
                }}
                {...item}
              />
            </MessageItem>
          ))}
        </Content>
      </Wrapper>
    );
  }
}
