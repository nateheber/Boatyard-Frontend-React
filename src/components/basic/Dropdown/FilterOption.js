import React from 'react';
import styled from 'styled-components';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { ToggleButton } from '../Buttons';

const Wrapper = styled.div`
  position: relative;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  font-family: 'Source Sans Pro', sans-serif;
  display: none;
  border: 1px solid #eaeaea;
  background-color: white;
  width: 200px;
  min-height: 70px;
  padding: 0;
  z-index: 1;
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
  &.show {
    display: block;
  }
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

const PickerWrapper = styled.div`
  position: absolute;
  &.show {
    display: block;
  }
  &.hide {
    display: none;
  }
`;

export class FilterOptions extends React.Component {
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
        showMenu: false,
        showPicker: false
      });
    }
  }
  state = {
    showPicker: false,
    showMenu: false,
    type: ''
  };
  render() {
    const { showMenu, showPicker, type } = this.state;
    const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    };
    const { onChangeFilter } = this.props;
    return (
      <Wrapper ref={this.setWrapperRef}>
        <ToggleButton
          title="FILTER BY"
          onClick={() => {
            this.setState({ showMenu: !showMenu });
          }}
        />
        <DropdownMenu className={showMenu ? 'show' : 'hide'}>
          <MenuItemLi>
            <MenuItem
              onClick={() => {
                this.setState({
                  showPicker: true,
                  showMenu: false,
                  type: 'order_placed'
                });
              }}
            >
              Orders Placed
            </MenuItem>
          </MenuItemLi>
          <MenuItemLi>
            <MenuItem
              onClick={() => {
                this.setState({
                  showPicker: true,
                  showMenu: false,
                  type: 'order_scheduled'
                });
              }}
            >
              Orders Scheduled
            </MenuItem>
          </MenuItemLi>
          <MenuItemLi>
            <MenuItem
              onClick={() => {
                this.setState({
                  showPicker: true,
                  showMenu: false,
                  type: 'order_completed'
                });
                if (onChangeFilter) {
                  onChangeFilter({ type: 'order_completed' });
                }
              }}
            >
              Orders Completed
            </MenuItem>
          </MenuItemLi>
          <MenuItemLi>
            <MenuItem
              onClick={() => {
                this.setState({ showMenu: false });
                if (onChangeFilter) {
                  onChangeFilter({ type: 'scheduling_needed' });
                }
              }}
            >
              Scheduling Needed
            </MenuItem>
          </MenuItemLi>
          <MenuItemLi>
            <MenuItem
              onClick={() => {
                this.setState({ showMenu: false });
                if (onChangeFilter) {
                  onChangeFilter({ type: 'payment_needed' });
                }
              }}
            >
              Payment Needed
            </MenuItem>
          </MenuItemLi>
          <MenuItemLi>
            <MenuItem
              onClick={() => {
                this.setState({ showMenu: false });
                if (onChangeFilter) {
                  onChangeFilter({ type: 'assigned_to_me' });
                }
              }}
            >
              Assigned to Me
            </MenuItem>
          </MenuItemLi>
          <MenuItemLi>
            <MenuItem
              onClick={() => {
                this.setState({ showMenu: false });
                if (onChangeFilter) {
                  onChangeFilter({ type: 'pending_customer_approval' });
                }
              }}
            >
              Pending Customer Approval
            </MenuItem>
          </MenuItemLi>
        </DropdownMenu>
        <PickerWrapper className={showPicker ? 'show' : 'hide'}>
          <DateRangePicker
            ranges={[selectionRange]}
            onChange={range => {
              this.setState({
                showPicker: false
              });
              if (onChangeFilter) {
                onChangeFilter({
                  type,
                  range
                });
              }
            }}
          />
        </PickerWrapper>
      </Wrapper>
    );
  }
}
