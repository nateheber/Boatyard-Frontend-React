import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  align-items: center;
  background-color: #fafafa;
  width: 100%;
  min-height: 65px;
  color: #004258;
  text-transform: uppercase;
  position: relative;
  padding: 15px 20px;
  box-sizing: border-box;
`;

const Title = styled.h5`
  display: inline-block;
  text-transform: none !important;
  font-size: 18px !important;
  font-weight: bold;
  line-height: 20px;
  margin: 0 !important;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif !important;
`;

export default ({ title }) => (
  <Wrapper>
    <Title>{title}</Title>
  </Wrapper>
)