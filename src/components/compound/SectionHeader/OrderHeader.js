import React from 'react';

import {
  SectionHeaderWrapper,
  LeftPart,
  RightPart
} from 'components/basic/Header';
import { OrangeButton } from 'components/basic/Buttons';
import {
  FilterOptions,
  ColumnFilter,
  ActionDropdown
} from 'components/basic/Dropdown';
import { PageTitle } from 'components/basic/Typho';

export const OrderHeader = ({  columns, selectedColumns, onChangeColumns, onAction, onNewOrder }) => (
  <SectionHeaderWrapper>
    <LeftPart>
      <PageTitle>Orders</PageTitle>
      <FilterOptions />
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
      <OrangeButton className="desktop" onClick={onNewOrder}>New Order</OrangeButton>
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
