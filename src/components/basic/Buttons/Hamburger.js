import React from 'react';
import styled from 'styled-components';

import HamburgerIcon from '../../../resources/left_mobile_nav.svg';

const Wrapper = styled.div`
  // width: 16.66667%;
  // max-width: 195px;
  padding: 15px;
  display: none;
  @media (max-width: 991px) {
    z-index: 99999;
    display: block !important;
  }
`;
const Button = styled.button`
  width: 25px;
  height: 19px;
  background-color: transparent;
  border: none;
  padding: 0;
  outline: none;
`;

const Icon = styled.img`
  width: 25px;
  height: 19px;
  cursor: pointer;
`;

export const HamburgerButton = props => (
  <Wrapper>
    <Button {...props}>
      <Icon src={HamburgerIcon} />
    </Button>
  </Wrapper>
);
