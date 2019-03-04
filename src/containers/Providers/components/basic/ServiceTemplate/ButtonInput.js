import React from 'react';
import styled from 'styled-components';

import LabelInput from './LabelInput';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 203px;
  height: 30.6px;
  border-radius: 8px;
  background-color: #f7941e;
  padding-left: 10px;
  padding-right: 10px;
`;

export default ({ title, onChange }) => (
  <Wrapper>
    <LabelInput className="button" value={title} onChange={onChange} />
  </Wrapper>
)