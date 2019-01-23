import React from 'react';
import styled from 'styled-components';
import { Row } from 'react-flexbox-grid';

const Wrapper = styled(Row)`
  position: fixed;
  left: 0;
  margin: 0px !important;
  height: 68px;
  width: 100%;
  background-color: #f7941e;
  align-items: center;
  z-index: 9999;
  box-sizing: border-box;
  align-items: center;
`;

export const HeaderWrapper = props => <Wrapper>{props.children}</Wrapper>;
