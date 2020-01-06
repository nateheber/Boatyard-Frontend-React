import React from 'react';
import styled from 'styled-components';

import { CheckBox } from '../Input';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  padding: 0px 15px;
`;

const Content = styled.div`
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 14px;
  font-family: 'Source Sans Pro', sans-serif;
  color: rgb(7, 56, 75);
`;

const TextBody = styled.div`
  font-size: 14px;
  font-family: 'Source Sans Pro', sans-serif;
  color: rgb(137, 137, 137);
`;

export const QRItem = ({ attributes: { name, body }, selected, onCheck, onSelect }) => (
  <Wrapper onClick={onSelect}>
    <CheckBox checked={selected} onClick={onCheck} />
    <Content>
      <Title>{name}</Title>
      <TextBody>
        {body.slice(0, 120)}
        ...
      </TextBody>
    </Content>
  </Wrapper>
);
