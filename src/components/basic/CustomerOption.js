import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  cursor: pointer;
`;

const Name = styled.span`
  color: #337ab7;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  text-overflow: ellipsis;
  font-size: 14px;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 600;
  letter-spacing: 0.1px;
`;

const Email = styled.span`
  color: #7e7d7e;
  font-size: 9pt;
  font-weight: 600;
  font-style: italic;
  display: inline-block;
  font-family: 'Open Sans';
`;

export default ({ data: { label, email, firstName, lastName }, innerProps: { id, ...rest } }) => (
  <Wrapper {...rest} key={id}>
    <Name>
    {label ? label : `${firstName} ${lastName}`}
    </Name>
    <Email>{email}</Email>
  </Wrapper>
);
