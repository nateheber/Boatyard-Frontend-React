import React from 'react';
import styled from 'styled-components';

import BackImage from 'resources/back.svg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 70px;
  padding: 5px 30px;
  height: 70px;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  @media (max-width: 991px) {
    background-color: rgb(230, 230, 230);
  }
`;

const BackButton = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  z-index: 9999;
  padding: 1px 7px 2px;
  @media (min-width: 991px) {
    display: none;
  }
`;

const BackImg = styled.img`
  width: 13px;
  height: 22px;
`;

const DisplayName = styled.div`
  display: inline;
  font-family: 'Montserrat', sans-serif !important;
  color: #07384b;
  font-weight: bold;
  font-size: 16px;
  margin-right: 5px;
`;

const Description = styled.div`
  display: inline;
  color: #898989;
  font-family: 'Montserrat', sans-serif !important;
  font-weight: bold;
  font-size: 14px;
`;

export const InboxContentHeader = ({ name, description, onBack }) => (
  <Wrapper>
    <BackButton onClick={onBack}>
      <BackImg src={BackImage} alt="back" />
    </BackButton>
    <DisplayName>{name}</DisplayName>
    <Description>{description}</Description>
  </Wrapper>
);
