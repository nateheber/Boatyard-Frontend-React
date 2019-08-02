import React from 'react';
import styled from 'styled-components';

import { CheckField } from 'components/basic/Input';

import HeaderImage from 'resources/preview_header_type2.png';

const Wrapper = styled.div`
  display: flex;
  width: 50%;
  min-width: 260px;
  flex-direction: column;
  margin-bottom: 60px;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 221px;
  height: 487px;
  margin-top: 30px;
  border: 1px solid #979797;
  border-top: none;
`;

const Title = styled.div`
  position: absolute;
  width: 150px;
  top: 28px;
  left: 50%;
  margin-left: -75px;
  color: white;
  font-size: 13.2px;
  text-align: center;
`;

const Header = styled.img`
  width: 100%;
`

export default ({ selected, title, name, onClick, children }) => (
  <Wrapper>
    <CheckField title={name} checked={selected} onClick={onClick} />
    <Content>
      <Header src={HeaderImage} />
      <Title>{title}</Title>
      {children}
    </Content>
  </Wrapper>
);