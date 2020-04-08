import React from 'react'
import styled from 'styled-components'
import classNames from 'classnames'
import { Row, Col } from 'react-flexbox-grid'
import { capitalize } from 'lodash'

import CheckedMarker from 'resources/checked_marker.png'
import RemoveIcon from 'resources/remove-icon-small.png'

const Wrapper = styled(Row)`
  height: 35px;
  margin-bottom: 10px;
  padding: 0 10px;
  > div {
    font-size: 14px;
    line-height: 20px;
    font-family: 'Source Sans', sans-serif;
    color: #003247;
    display: flex;
    align-items: center;
    &.col-sm-4 {
      justify-content: center;
    }
    &.col-sm-2 {
      padding-left: 0;
      > div {
        width: 100%;
      }
    }
  }
`;

const RadioButton = styled.span`
  position: relative;
  display: inline-block;
  &::before {
    display: block;
    box-sizing: border-box;
    content: '';
    width: 16px
    height: 16px;
    border: 1px solid #004258;
    border-radius: 8px;
  }
  &.active::after {
    position: absolute;
    display: block; 
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 4.5px;
    background-color: #f7941e;
    top: 3px;
    left: 3px;
  }
  cursor: pointer;
`

const MarkerImg = styled.img`
  width: 23px;
  height: 20px;
`

const RemoveButton = styled.img`
  width: 9px;
  height: 9px;
  &:hover {
    opacity: 0.5;
  }
  cursor: pointer;
  margin-left: 5px;
`

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  &.is-default {
    justify-content: space-between;
  }
`

export default ({ creditCard: { id, attributes: { name, last4, isDefault } }, onSetDefault, onRemove }) => (
  <Wrapper>
    <Col sm={6}>
      {capitalize(name)} xxxx-{last4}
    </Col>
    <Col sm={4}>
      <RadioButton onClick={() => onSetDefault(id)} className={classNames({ active: isDefault })}/>
    </Col>
    <Col sm={2}>
      <ButtonsWrapper className={isDefault && 'is-default'}>
        {isDefault && <MarkerImg src={CheckedMarker} />}
        <RemoveButton src={RemoveIcon} onClick={() => onRemove(id)} />
      </ButtonsWrapper>
    </Col>
  </Wrapper>
);