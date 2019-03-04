import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import Silhouette from 'resources/phone_silhouette.png';
import Silhouette2 from 'resources/phone_silhouette_type2.png';
import ButtonSilhouette from 'resources/phoneButtons.png';

const Wrapper = styled.div`
  position: relative;
  width: 247px;
  height: 464px;
  border-radius: 44.5px;
  background-color: white;
  background-image: url(${Silhouette});
  &.secondary {
    background-image: url(${Silhouette2});
  }
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
`;

const Title = styled.div`
  position: absolute;
  width: 150px;
  top: 50px;
  left: 50%;
  margin-left: -75px;
  color: white;
  font-size: 13.2px;
  text-align: center;
`;

export default ({ secondary, title, children }) => (
  <Wrapper className={classNames({ secondary })} >
    {
      secondary && <Title>{title}</Title>
    }
    <ContentHolder>
      {children}
    </ContentHolder>
  </Wrapper>
)