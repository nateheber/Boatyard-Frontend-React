import React from 'react';
import styled from 'styled-components';

const Value = styled.div`
  font-size: 14px;
  color: #555;
`;

export default ({ firstName, lastName }) => (
  <Value>
    {firstName} {lastName}
  </Value>
);
