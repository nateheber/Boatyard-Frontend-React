import React from 'react';
import styled from 'styled-components';
import { get } from 'lodash';

import WhiteFlg from 'resources/white_flag.png';

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 84px;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: 100%;
  padding: 0px 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Flag = styled.div`
  box-sizing: border-box;
  width: 22px;
  height: 21px;
  background-image: url(${WhiteFlg});
  background-size: 100%;
  background-repeat: no-repeat;
  padding-left: 12px;
  padding-top: 3px;
  font-size: 11px;
  color: #094359;
  text-transform: uppercase;
  margin-right: 10px;
`;

const Title = styled.div`
  font-size: 18px;
  color: white;
  text-transform: uppercase;
`

export default ({ providerName, image }) => (
  <Wrapper src={image.src}>
    <Flag>{get(providerName, '[0]')}</Flag>
    <Title>{providerName}</Title>
  </Wrapper>
);