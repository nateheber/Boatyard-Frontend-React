import React from 'react';
import styled from 'styled-components';
import { findIndex, filter } from 'lodash';

import FilterIcon from '../../../resources/filter_icon.png';
import { CheckBox } from '../Input';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 5px;
`;

const DropdownMenu = styled.ul`
  &.show {
    display: block;
  }
  position: absolute;
  font-family: 'Source Sans Pro', sans-serif;
  display: none;
  border: 1px solid #eaeaea;
  left: -180px;
  background-color: white;
  position: absolute;
  width: 200px;
  z-index: 1;
  padding: 10px;
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
  margin-top: 8px;
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
`;

export class OrderSearchFilter extends React.Component {
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
    showMenu: false
  };

  isChecked = val => {
    const { selected } = this.props;
    const idx = findIndex(selected, sel => sel.value === val.value);
    return idx >= 0;
  };

  select = val => {
      console.log(val);
    const { onChangeSelection, selected } = this.props;
    const idx = findIndex(selected, sel => sel.value === val.value);
    let newSelection = selected;
    if (idx >= 0) {
      const selections = filter(selected, sel => sel.value !== val.value);
      if (selections.length > 0) newSelection = selections;
    } else {
      const { items } = this.props;
      const selections = [...selected, val];
      newSelection = [];
      for (const index in items) {
        const item = items[index];
        const filtered = filter(selections, selection => selection.value === item.value);
        if (filtered.length > 0) {
          newSelection.push(item);
        }
      }
    }
    onChangeSelection(newSelection);
  };

  render() {
    const { showMenu } = this.state;
    const { items } = this.props;
    return (
      <Wrapper ref={this.setWrapperRef}>
        {/* <FilterIcon
        //   title={title !== null && title !== undefined ? title : "ACTION"}
          onClick={() => {
            this.setState({ showMenu: !showMenu });
          }}
        /> */}
        <img 
          alt=''
          src={FilterIcon}
          onClick={() => {
            this.setState({ showMenu: !showMenu });
          }} 
        />
        <DropdownMenu className={showMenu ? 'show' : 'hide'}>
          {items.map((val, idx) => (
            <MenuItemLi key={`menu_item_${idx}`}>
                <CheckBox
                  small
                  checked={this.isChecked(val)}
                  onClick={() => {
                    this.select(val);
                  }}
                />
              <MenuItem
                // onClick={() => {
                //   this.setState({
                //     showMenu: false
                //   });
                //   val.action();
                // }}
              >
                {val.title || val.label}
              </MenuItem>
            </MenuItemLi>
          ))}
        </DropdownMenu>
      </Wrapper>
    );
  }
}
