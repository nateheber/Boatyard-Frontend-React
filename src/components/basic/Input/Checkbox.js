import React from 'react';
import styled from 'styled-components';

const Check = styled.div`
  width: 20px;
  height: 20px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(199, 199, 199);
  border-image: initial;
  border-radius: 4px !important;
  cursor: pointer;
  margin-right: 10px;
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
    top: 2px;
    left: 7px;
    width: 5px;
    height: 10px;
    transform: rotate(45deg);
    border-style: solid;
    border-color: rgb(255, 255, 255);
    border-image: initial;
    border-width: 0px 2px 2px 0px;
  }
`;

export const CheckBox = ({ checked, onClick }) => (
  <Check className={checked ? 'checked' : 'unchecked'} onClick={onClick} />
);
