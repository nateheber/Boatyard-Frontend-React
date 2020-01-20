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
  // color: #898889;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  text-overflow: ellipsis;
  font-size: 14px;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 600;
  letter-spacing: 0.1px;
`;

export default ({ data: { name, provider_name }, innerProps: { id, ...rest } }) => (
  <Wrapper {...rest} key={id}>
    <Name>
      {`${provider_name} - ${name}`}
    </Name>
  </Wrapper>
);
