import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 778px) {
    display: none;
  }
`;

const THeader = styled.div`
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

export const OrderTableHeader = ({ columns }) => (
  <Wrapper>
    {columns.map((column, idx) => (
      <THeader key={`header_${idx}`} style={{ width: column.width || `${100 / columns.length}%`}}>{column.label}</THeader>
    ))}
  </Wrapper>
);
