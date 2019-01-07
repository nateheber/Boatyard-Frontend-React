import React from 'react';
import styled from 'styled-components';

import SectionHeader from './SectionHeader';

const Content = styled.div`
  padding: 30px 20px;
  background-color: #fff;
`

export default ({ title, children }) => (
  <div>
    <SectionHeader title={title} />
    <Content>
      {children}
    </Content>
  </div>
)