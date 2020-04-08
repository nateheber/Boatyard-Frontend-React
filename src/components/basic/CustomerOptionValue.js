import React from 'react';
import styled from 'styled-components';

const Value = styled.div`
  font-size: 12px;
  color: #555;
`;

export default ({ data: { firstName, lastName } }) => (
  <Value>
    {firstName} {lastName}
  </Value>
);
