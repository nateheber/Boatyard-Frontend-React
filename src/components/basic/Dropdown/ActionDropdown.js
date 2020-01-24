import React from 'react';
import styled from 'styled-components';

import { ToggleButton } from '../Buttons';

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
  z-index: 1;
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

export class ActionDropdown extends React.Component {
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
  render() {
    const { showMenu } = this.state;
    const { items, title } = this.props;
    return (
      <Wrapper ref={this.setWrapperRef}>
        <ToggleButton
          title={title !== null && title !== undefined ? title : "ACTION"}
          onClick={() => {
            this.setState({ showMenu: !showMenu });
          }}
        />
        <DropdownMenu className={showMenu ? 'show' : 'hide'}>
          {items.map((val, idx) => (
            <MenuItemLi key={`menu_item_${idx}`}>
              <MenuItem
                onClick={() => {
                  this.setState({
                    showMenu: false
                  });
                  val.action();
                }}
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
