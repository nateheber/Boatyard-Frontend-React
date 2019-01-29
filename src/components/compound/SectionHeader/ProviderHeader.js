import React from 'react';

import {
  SectionHeaderWrapper,
  LeftPart,
  RightPart
} from 'components/basic/Header';
import { ColumnFilter } from 'components/basic/Dropdown';
import { PageTitle } from 'components/basic/Typho';

export const ProviderHeader = ({ columns, selectedColumns, onChangeColumns }) => (
  <SectionHeaderWrapper>
    <LeftPart>
      <PageTitle>Providers</PageTitle>
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
