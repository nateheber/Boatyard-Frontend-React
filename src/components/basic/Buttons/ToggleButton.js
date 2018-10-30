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

export const ToggleButton = ({ title, onClick }) => (
  <HollowButton onClick={onClick}>
    <Content>
      <Label>{title}</Label>
      <ArrBlue />
    </Content>
  </HollowButton>
);
