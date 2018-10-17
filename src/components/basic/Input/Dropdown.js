import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const DropBox = styled.a`
  min-width: 130px;
  border: 1px solid #a9b5bb;
  cursor: pointer;
  font-size: 12px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  text-align: center;
  border-radius: 6px !important;
  display: inline-block;
  margin: 0;
  margin-left: 15px;
  padding: 5px 15px;
  position: relative;
  height: 30px;
  &.active {
    background-color: #a9b5bb;
  }
`;

const DropDownUl = styled.ul`
  display: none;
  text-align: left;
  position: absolute;
  width: 100%;
  max-width: 200px;
  z-index: 99;
  border: 1px solid #eaeaea;
  text-transform: none;
  background-color: #fff;
  padding: 0;
  left: auto !important;
  font-weight: 400;
  list-style: none;
  min-width: 190px;
  margin-top: 15px;
  right: 0;
  margin-top: 15px;
  display: none;
  &.order-filterDropdown {
    max-width: 400px !important;
    width: 270px !important;
    transform: translateX(17%);
  }
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
  &.show {
    display: block;
  }
`;

const OptionWrapper = styled.li``;

const OptionButton = styled.button`
  background: transparent;
  border: none;
  padding: 10px 20px !important;
  width: 100%;
  text-align: left;
  font-size: 12px;
  font-weight: 400;
  font-family: Montserrat, sans-serif;
`;

export const Option = ({ title }) => (
  <OptionWrapper>
    <OptionButton>{title}</OptionButton>
  </OptionWrapper>
);

export class Dropdown extends React.Component {
  state = {
    selected: -1
  };
  render() {
    const { title } = this.props;
    const { selected } = this.state;
    return (
      <div>
        <DropBox />
      </div>
    );
  }
}
