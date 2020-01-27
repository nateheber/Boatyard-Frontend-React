import React from 'react';

import {
  SectionHeaderWrapper,
  LeftPart,
  RightPart
} from 'components/basic/Header';
import { SearchBox } from 'components/basic/Input';
import { OrangeButton, HollowButton } from 'components/basic/Buttons';
import {
  // FilterOptions,
  ColumnFilter,
  // ActionDropdown
} from 'components/basic/Dropdown';
import { PageTitle } from 'components/basic/Typho';

export const OrderHeader = ({  columns, statuses, selectedColumns, onChangeColumns, onAction, onNewOrder, onSearch, onExport }) => (
  <SectionHeaderWrapper>
    <LeftPart>
      <PageTitle>Orders</PageTitle>
      {/* <FilterOptions /> */}
      {/* <ActionDropdown
        items={[
          {
            title: 'Export',
            action: () => {
              onAction('export');
            }
          }
        ]}
      /> */}
      <SearchBox style={{ width: 260 }} placeholder="Search by Order #, Customer or Boat" onChange={onSearch} />
      <HollowButton className="desktop" onClick={onExport}>Export</HollowButton>
    </LeftPart>
    <RightPart>
      <OrangeButton className="desktop" onClick={onNewOrder}>New Order</OrangeButton>
      <ColumnFilter
        title='SHOW COLUMNS'
        items={columns}
        selected={selectedColumns}
        onChangeSelection={columns => {
          if (onChangeColumns) onChangeColumns(columns);
        }}
      />
      <ColumnFilter
        items={statuses}
        title='FILTER'
        // selected={selectedColumns}
        // onChangeSelection={columns => {
        //   if (onChangeColumns) onChangeColumns(columns);
        // }}
      />
    </RightPart>
  </SectionHeaderWrapper>
);
