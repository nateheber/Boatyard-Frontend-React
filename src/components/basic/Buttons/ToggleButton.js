import React from 'react';
import styled from 'styled-components';

import { HollowButton } from './HollowButton';
import ArrBlueIcon from '../../../resources/arrow-blue.png';

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Label = styled.div``;
const ArrBlue = styled.span`
  margin-left: 2px;
  background-image: url(${ArrBlueIcon});
  height: 12px;
  width: 12px;
  background-size: 9px 9px;
  background-repeat: no-repeat;
  background-position: center;
`;

const PlainButton = styled.button`
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 600;
  font-size: 24px;
  text-align: center;
  border: none;
  background: transparent;
  outline: none;
  padding: 15px;
  height: 75px;
  box-sizing: border-box;
`;

export const ToggleButton = ({ title, type, onClick }) => {
  return type === 'plain' ? (
    <PlainButton onClick={onClick}>
      <Content>
        <Label>{title}</Label>
        <ArrBlue />
      </Content>
    </PlainButton>
  ) : (
    <HollowButton onClick={onClick}>
      <Content>
        <Label>{title}</Label>
        <ArrBlue />
      </Content>
    </HollowButton>
  );
};
