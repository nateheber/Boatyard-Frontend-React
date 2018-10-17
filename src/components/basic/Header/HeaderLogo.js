import React from 'react';
import styled from 'styled-components';

import LogoImage from '../../../resources/logo.svg';

const HeaderLogo = styled.img`
  margin: 0 auto;
  display: block;
  width: 40px;
  vertical-align: middle;
`;

const HeaderWrapper = styled.div`
  width: 195px;
  @media (max-width: 991px) and (min-width: 768px) {
    display: none !important;
  }
`;

export const Logo = () => (
  <HeaderWrapper>
    <HeaderLogo src={LogoImage} alt="logo" />
  </HeaderWrapper>
);
