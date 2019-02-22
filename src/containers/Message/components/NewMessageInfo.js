import React from 'react';
import styled from 'styled-components';

import { Selector, InputWrapper, InputLabel } from 'components/basic/Input';

const Wrapper = styled.div`
  padding: 35px 30px;
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
