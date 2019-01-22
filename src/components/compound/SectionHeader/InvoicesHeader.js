import React from 'react';

import {
  SectionHeaderWrapper,
  LeftPart,
  RightPart
} from 'components/basic/Header';
import {
  ColumnFilter,
  ActionDropdown
} from 'components/basic/Dropdown';
import { PageTitle } from 'components/basic/Typho';

export const InvoicesHeader = ({ columns, selectedColumns, onAction, onChangeColumns }) => (
  <SectionHeaderWrapper>
    <LeftPart>
      <PageTitle>Invoices</PageTitle>
      <ActionDropdown
        items={[
          {
            title: 'Export',
            action: () => {
              onAction('export');
            }
          }
        ]}
      />
    </LeftPart>
    <RightPart>
      <ColumnFilter
        items={columns}
        selected={selectedColumns}
        onChangeSelection={columns => {
          if (onChangeColumns) onChangeColumns(columns);
        }}
      />
    </RightPart>
  </SectionHeaderWrapper>
);
