import React from 'react';
import styled from 'styled-components';
import { Col } from 'react-flexbox-grid';

import LogoImage from '../../../resources/logo.svg';

const HeaderLogo = styled.img`
  width: 40px;
  vertical-align: middle;
`;

const HeaderWrapper = styled(Col)`
  max-width: 195px !important;
  padding: 0px !important;
  text-align: center;
  @media (max-width: 991px) {
    display: none !important;
  }
`;

export const Logo = () => (
  <HeaderWrapper xs={2}>
    <HeaderLogo src={LogoImage} alt="logo" />
  </HeaderWrapper>
);
