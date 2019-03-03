import React from 'react';
import styled from 'styled-components';

import Sihlouette from 'resources/phone_silhouette.png';
import ButtonSilhouette from 'resources/phoneButtons.png';

const Wrapper = styled.div`
  position: relative;
  width: 247px;
  height: 464px;
  border-radius: 44.5px;
  background-color: white;
  background-image: url(${Sihlouette});
  background-repeat: no-repeat;
  background-size: 100%;
  padding-left: 13px;
  padding-right: 13px;
  padding-bottom: 12px;
  padding-top: 80px;
  &::after {
    content: '';
    position: absolute;
    display: inline-block;
    width: 92px;
    height: 196px;
    left: -46px;
    top: 53px;
    background-image: url(${ButtonSilhouette});
  }
`;

const ContentHolder = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  border-bottom-right-radius: 38.5px;
  border-bottom-left-radius: 38.5px;
  overflow: hidden;
`

export default ({ children }) => (
  <Wrapper>
    <ContentHolder>
      {children}
    </ContentHolder>
  </Wrapper>
)