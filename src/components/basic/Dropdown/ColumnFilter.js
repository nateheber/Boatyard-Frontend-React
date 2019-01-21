import React from 'react';
import styled from 'styled-components';
import { findIndex, filter } from 'lodash';

import { ToggleButton } from '../Buttons';
import { CheckBox } from '../Input';

const Wrapper = styled.div`
  position: relative;
`;

const DropdownMenu = styled.ul`
  &.show {
    display: block;
  }
  position: absolute;
  font-family: 'Source Sans Pro', sans-serif;
  display: none;
  border: 1px solid #eaeaea;
  background-color: white;
  position: absolute;
  width: 200px;
  min-height: 70px;
  padding: 0;
  &::before {
    height: 100%;
    display: block;
    width: 5px;
    background: rgba(151, 151, 151, 0.2);
    content: '';
    bottom: -6px;
    right: -5px;
    position: absolute;
  }
  &::after {
    height: 5px;
    display: block;
    width: 100.5%;
    background: rgba(151, 151, 151, 0.2);
    content: '';
    bottom: -6px;
    left: -1px;
    position: absolute;
  }
  margin-top: 0px;
`;

const MenuItemLi = styled.div`
  padding: 8px 0;
  &:hover {
    background-color: #f6f6f7;
  }
`;

const MenuItem = styled.button`
  border: none;
  width: 100%;
  padding: 0 15px;
  text-align: left;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  background: transparent;
  outline: none;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export class ColumnFilter extends React.Component {
  constructor() {
    super();
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        showMenu: false
      });
    }
  }

  state = {
    showMenu: false,
    selected: []
  };
  isChecked = val => {
    const { selected } = this.state;
    const idx = findIndex(selected, sel => sel === val.value);
    return idx >= 0;
  };
  select = val => {
    const { onChangeSelection } = this.props;
    const { selected } = this.state;
    const idx = findIndex(selected, sel => sel === val.value);
    let newSelection = [];
    if (idx >= 0) {
      newSelection = filter(selected, sel => sel !== val.value);
    } else {
      newSelection = [...selected, val.value];
    }
    onChangeSelection(newSelection);
    this.setState({
      selected: newSelection
    });
  };
  render() {
    const { showMenu } = this.state;
    const { items } = this.props;
    return (
      <Wrapper ref={this.setWrapperRef}>
        <ToggleButton
          title="SHOW COLUMNS"
          onClick={() => {
            this.setState({ showMenu: true });
          }}
        />
        <DropdownMenu className={showMenu ? 'show' : 'hide'}>
          {items.map((val, idx) => (
            <MenuItemLi key={`menu_${idx}`}>
              <MenuItem>
                <CheckBox
                  small
                  checked={this.isChecked(val)}
                  onClick={() => {
                    this.select(val);
                  }}
                />
                {val.title}
              </MenuItem>
            </MenuItemLi>
          ))}
        </DropdownMenu>
      </Wrapper>
    );
  }
}
