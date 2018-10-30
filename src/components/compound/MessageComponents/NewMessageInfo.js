import React from 'react';
import styled from 'styled-components';

import { Selector } from '../../basic/Input';

const Wrapper = styled.div`
  padding: 35px 30px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InputLabel = styled.div`
  display: flex;
  flex: 1;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  color: #333;
`;

const SelectorWrapper = styled.div`
  display: flex;
  flex: 5;
`;

export const NewMessageInfo = ({ options, onChange }) => (
  <Wrapper>
    <InputWrapper>
      <InputLabel>To</InputLabel>
      <SelectorWrapper>
        <Selector options={options} onChange={onChange} />
      </SelectorWrapper>
    </InputWrapper>
  </Wrapper>
);
