import React from 'react';
import styled from 'styled-components';
import className from 'classnames';

const Check = styled.button`
  width: 20px;
  height: 20px;
  margin: 5px 10px 5px 0;
  &.small {
    width: 15px;
    height: 15px;
  }
  &.big {
    width: 36px;
    height: 36px;
    margin-top: 0px;
  }
  border: 1px solid #dfdfdf;
  border-image: initial;
  border-radius: 4px !important;
  cursor: pointer;
  position: relative;
  &:hover {
    background: rgb(204, 204, 204);
  }
  &.checked {
    background: rgb(247, 148, 30);
  }
  &.checked::after {
    content: ' ';
    position: absolute;
    top: 1px;
    left: 6px;
    width: 5px;
    height: 10px;
    transform: rotate(45deg);
    border-style: solid;
    border-color: rgb(255, 255, 255);
    border-image: initial;
    border-width: 0px 2px 2px 0px;
  }
  &.small {
    &.checked::after {
      top: 1px;
      left: 5px;
      width: 3px;
      height: 7px;
    }
  }
  &.big {
    &.checked::after {
      top: 1px;
      left: 10px;
      width: 10px;
      height: 19px;
      border-width: 0px 4px 4px 0px;
    }
  }
  outline: none;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  color: ${props => props.color || '#555'};
  cursor: pointer;
`;

export const CheckBox = ({ big, small, checked, onClick }) => (
  <Check
    className={className({
      checked: checked,
      small: small,
      big: big
    })}
    onClick={onClick}
  />
);

export const CheckField = ({ title, big, small, checked, onClick, color }) => (
  <Wrapper color={color} onClick={onClick}>
    <Check
      className={className({
        checked: checked,
        small: small,
        big,
      })}
      onClick={onClick}
    />
    {title}
  </Wrapper>
);
