import React from 'react';

import { Logo, HeaderWrapper, RightMenu } from 'components/basic/Header';
import { HamburgerButton } from 'components/basic/Buttons';
import { SearchBox } from 'components/basic/Input';

const Header = ({ onMenuToggle }) => (
  <HeaderWrapper>
    <HamburgerButton onClick={onMenuToggle} />
    <Logo />
    <SearchBox placeholder="Search by order number, user, boat, etc" />
    <RightMenu />
  </HeaderWrapper>
);

export default Header;
