import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import Silhouette from 'resources/phone_silhouette.png';
import Silhouette2 from 'resources/phone_silhouette_type2.png';
import ButtonSilhouette from 'resources/phoneButtons.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionName = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #003247;
  margin-bottom: 25px;
`;

const Wrapper = styled.div`
  position: relative;
  width: 223px;
  height: 415px;
  background-color: white;
  background-image: url(${Silhouette});
  &.secondary {
    background-image: url(${Silhouette2});
  }
  background-repeat: no-repeat;
  background-size: 100%;
  padding-left: 11px;
  padding-right: 11px;
  padding-bottom: 11px;
  padding-top: 72px;
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
  margin-bottom: 40px;
`;

const ContentHolder = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  border-bottom-right-radius: 35px;
  border-bottom-left-radius: 35px;
  padding: 0 1px;
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
  <Container>
    <SectionName>Home</SectionName>
    <Wrapper className={classNames({ secondary })} >
      {
        secondary && <Title>{title}</Title>
      }
      <ContentHolder>
        {children}
      </ContentHolder>
    </Wrapper>
  </Container>
);