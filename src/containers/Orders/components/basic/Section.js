import React from 'react';
import styled from 'styled-components';

import SectionHeader from './SectionHeader';

const Content = styled.div`
  padding: 30px 20px;
  background-color: #fff;
`

export default ({ title, mode, onEdit, children }) => (
  <div>
    <SectionHeader title={title} mode={mode} onEdit={onEdit} />
    <Content>
      {children}
    </Content>
  </div>
)