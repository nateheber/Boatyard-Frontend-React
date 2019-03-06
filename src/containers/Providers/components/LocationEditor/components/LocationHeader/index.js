import React from 'react';
import styled from 'styled-components';

import { HollowButton } from 'components/basic/Buttons';

const Wrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;
  height: 90px;
  background-color: #ffffff;
  padding: 25px;
  padding-left: 22px;
  padding-right: 90px; 
`;

const Title = styled.div`
  width: 394px;
  height: 39px;
  font-family: Montserrat;
  font-size: 32px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #003247;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-left: 15px;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`

export default ({ onAdd }) => (
  <Wrapper>
    <Title>Locations</Title>
    <ButtonWrapper>
      <HollowButton className="thin-font" onClick={onAdd}>ADD LOCATION</HollowButton>
    </ButtonWrapper>
  </Wrapper>
)