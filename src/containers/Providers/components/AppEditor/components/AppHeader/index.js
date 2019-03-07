import React from 'react';
import styled from 'styled-components';

import { HollowButton } from 'components/basic/Buttons';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  height: 90px;
  padding: 22px 90px 22px 25px;
  border-bottom: 1px solid #E6E6E6;
`;

const Header = styled.div`
  display: inline-block;
  color: #003247;
  font-family: Helvetica;
  font-size: 32px;
  text-align: left;
`

export default ({ onDraft }) => (
  <Wrapper>
    <Header>Create App</Header>
    <HollowButton onClick={onDraft}>Save Draft</HollowButton>
  </Wrapper>
)