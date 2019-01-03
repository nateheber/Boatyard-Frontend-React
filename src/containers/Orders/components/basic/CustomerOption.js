import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
`;

const Name = styled.span`
  color: #337ab7;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  text-overflow: ellipsis;
`;

const Email = styled.span`
  color: #7e7d7e;
  font-size: 9pt;
  font-weight: 300;
  font-style: italic;
  display: inline-block;
  font-family: 'Open Sans';
`;

export default ({ data: { email, firstName, lastName }, ...rest }) => (
  <Wrapper {...rest}>
    <Name>
      {firstName} {lastName}
    </Name>
    <Email>{email}</Email>
  </Wrapper>
);
