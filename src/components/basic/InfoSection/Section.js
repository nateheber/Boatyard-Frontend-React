import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames'
import { isEmpty } from 'lodash'

import SectionHeader from './SectionHeader';

const Content = styled.div`
  padding: 30px 20px;
  background-color: #FFF;
  &.hasBorder {
    border-top: 1px solid #e6e6e6;
    padding-top: 10px;
  }
`

export const Section = ({ title, mode, onEdit, children }) => (
  <div>
    {
      title && <SectionHeader title={title} mode={mode} onEdit={onEdit} />
    }
    <Content className={classNames({ hasBorder: isEmpty(title) })}>
      {children}
    </Content>
  </div>
)