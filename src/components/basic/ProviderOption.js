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
`;

export default ({ data: { name }, innerProps: { id, ...rest } }) => (
  <Wrapper {...rest} key={id}>
    <Name>
      {name}
    </Name>
  </Wrapper>
);
