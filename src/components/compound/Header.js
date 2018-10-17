import React from 'react';

import { Logo, HeaderWrapper, RightMenu } from '../basic/Header';
import { SearchBox } from '../basic/Input';

const Header = () => (
  <HeaderWrapper>
    <Logo />
    <SearchBox placeholder="Search by order number, user, boat, etc" />
    <RightMenu />
  </HeaderWrapper>
);

export default Header;
