import React from 'react';
import styled from 'styled-components';

import { CheckField } from 'components/basic/Input';

const Wrapper = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  margin-bottom: 60px;
`;

const Content = styled.div`
  display: flex;
  width: 225px;
  height: 487px;
  margin-top: 30px;
`;

export default ({ selected, title, onClick, children }) => (
  <Wrapper>
    <CheckField title={title} checked={selected} onClick={onClick} />
    <Content>
      {children}
    </Content>
  </Wrapper>
);