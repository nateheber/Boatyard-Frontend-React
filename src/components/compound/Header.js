import React from 'react';

import { Logo, HeaderWrapper, RightMenu } from '../basic/Header';
import { HamburgerButton } from '../basic/Buttons';
import { SearchBox } from '../basic/Input';

const Header = ({ onMenuToggle }) => (
  <HeaderWrapper>
    <HamburgerButton onClick={onMenuToggle} />
    <Logo />
    <SearchBox placeholder="Search by order number, user, boat, etc" />
    <RightMenu />
  </HeaderWrapper>
);

export default Header;
