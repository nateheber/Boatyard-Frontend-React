import React from 'react';
import styled from 'styled-components';

import { Logo, HeaderWrapper, RightMenu } from 'components/basic/Header';
import { HamburgerButton } from 'components/basic/Buttons';
import { SearchBox } from 'components/basic/Input';

const RightPart = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px;
`

const Header = ({ onMenuToggle }) => (
  <HeaderWrapper>
    <HamburgerButton onClick={onMenuToggle} />
    <Logo />
    <RightPart xs={10}>
      <SearchBox secondary placeholder="Search by order number, user, boat, etc" />
      <RightMenu />
    </RightPart>
  </HeaderWrapper>
);

export default Header;
