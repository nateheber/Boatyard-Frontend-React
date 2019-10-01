import React from 'react';
import styled from 'styled-components';
import { Row } from 'react-flexbox-grid';

const Wrapper = styled(Row)`
  position: fixed;
  left: 0;
  margin: 0px !important;
  width: 100%;
  background-color: #0D485F;
  z-index: 1001;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderWrapper = props => <Wrapper>{props.children}</Wrapper>;
