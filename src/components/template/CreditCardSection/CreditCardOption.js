import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { capitalize } from 'lodash';

import CheckedMarker from 'resources/checked_marker.png'

const Wrapper = styled.div`
  height: 35px;
  margin-bottom: 15px;
  margin-top: 35px;
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const CardInfo = styled.div`
  font-size: 14px;
  line-height: 20px;
  font-family: 'Source Sans', sans-serif;
  color: #8f8f8f;
  display: flex;
  align-items: center;
  &.selected {
    color: #003247;
  }
  padding-left: 20px;
`

const RadioButton = styled.span`
  position: relative;
  display: inline-block;
  &::before {
    display: block;
    box-sizing: border-box;
    content: '';
    width: 16px
    height: 16px;
    border: 1px solid #003247;
    border-radius: 8px;
  }
  &.active::after {
    position: absolute;
    display: block; 
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 4.5px;
    background-color: #003247;
    top: 3px;
    left: 3px;
  }
  cursor: pointer;
`

const MarkerImg = styled.img`
  width: 23px;
  height: 20px;
  margin-left: 20px;
`

export default ({ creditCard: { id, attributes: { name, last4, isDefault } }, isSelected, onSelect }) => (
  <Wrapper onClick={() => onSelect(id)} >
    <RadioButton onClick={() => onSelect(id)} className={classNames({ active: isSelected })}/>
    <CardInfo className={classNames({ selected: isSelected })}>
      {capitalize(name)} xxxxxxxx{last4}
    </CardInfo>
    {isDefault && <MarkerImg src={CheckedMarker} />}
  </Wrapper>
)