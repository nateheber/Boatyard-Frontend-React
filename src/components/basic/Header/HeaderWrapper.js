import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  height: 68px;
  width: 100%;
  background-color: #f7941e;
  display: flex;
  flex-direction: row;
  justify-contents: space-between;
  align-items: center;
`;

export const HeaderWrapper = props => <Wrapper>{props.children}</Wrapper>;
