import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const THeader = styled.div`
  width: 16.66667%;
  font-size: 11px;
  word-wrap: break-word;
  word-break: break-word;
  font-family: Montserrat, sans-serif !important;
  margin: 20px 0;
  padding-left: 15px;
  padding-right: 15px;
  color: #004258;
  font-weight: bold;
  text-transform: uppercase;
`;

export const OrderTableHeader = props => {
  return (
    <Wrapper>
      <THeader>ORDER</THeader>
      <THeader>CUSTOMER</THeader>
      <THeader>ORDER STATUS</THeader>
      <THeader>BOAT MAKE</THeader>
      <THeader>BOAT MODEL</THeader>
      <THeader>BOAT NAME</THeader>
    </Wrapper>
  );
};
