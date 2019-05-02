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
    padding-top: 20px;
  }
  &.noPadding {
    padding: 0;
  }
`

export const Section = ({ title, mode, onEdit, children, disabled, editComponent, noPadding, ...rest }) => (
  <div>
    {
      title && <SectionHeader title={title} mode={mode} onEdit={onEdit} disabled={disabled} editComponent={editComponent} />
    }
    <Content {...rest} className={classNames({ hasBorder: isEmpty(title), noPadding })}>
      {children}
    </Content>
  </div>
)