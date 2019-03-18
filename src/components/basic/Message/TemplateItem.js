import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-left: 8.33333%;
  width: 91.66667%;
`;

const TypeText = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 18px;
  color: rgb(7, 56, 75);
  font-weight: bold;
  text-transform: capitalize;
`;

const Description = styled.div`
  font-family: 'Source Sans', sans-serif !important;
  font-size: 12px;
  color: rgb(137, 137, 137);
  font-weight: bold;
`;

export const TemplateItem = ({ type, description }) => (
  <Wrapper>
    <TypeText>{type}</TypeText>
    <Description>{description}</Description>
  </Wrapper>
);
