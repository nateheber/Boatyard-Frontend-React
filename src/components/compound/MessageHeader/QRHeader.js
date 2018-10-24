import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(230, 230, 230);
  padding: 25px 30px;
`;

const Title = styled.div`
  font-family: Montserrat, sans-serif;
  color: rgb(7, 56, 75);
  font-size: 25px;
  text-transform: none;
  font-weight: 700;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
`;

const PlusButton = styled.button`
  outline: none;
  background-color: transparent;
  border: none;
  color: rgb(7, 56, 75);
  font-family: 'Montserrat sans-serif';
  font-weight: bold;
  font-size: 45px;
  line-height: 28px;
  cursor: pointer;
`;

export const QRHeader = ({ onAdd }) => (
  <Wrapper>
    <Title>Quick Replies</Title>
    <PlusButton onClick={onAdd}>+</PlusButton>
  </Wrapper>
);
