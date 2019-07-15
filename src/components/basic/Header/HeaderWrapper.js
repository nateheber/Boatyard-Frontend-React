import React from 'react';
import styled from 'styled-components';
import { Row } from 'react-flexbox-grid';

const Wrapper = styled(Row)`
  position: fixed;
  left: 0;
  margin: 0px !important;
  height: 68px;
  width: 100%;
  background-color: #0D485F;
  align-items: center;
  z-index: 1001;
  box-sizing: border-box;
  align-items: center;
`;

export const HeaderWrapper = props => <Wrapper>{props.children}</Wrapper>;
