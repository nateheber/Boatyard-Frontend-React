import React from 'react';

import {
  SectionHeaderWrapper,
  LeftPart,
  RightPart
} from 'components/basic/Header';
import { SearchBox } from 'components/basic/Input';
import { OrangeButton, HollowButton } from 'components/basic/Buttons';
import { ColumnFilter } from 'components/basic/Dropdown';
import { PageTitle } from 'components/basic/Typho';

export const OrderHeader = ({  columns, selectedColumns, onChangeColumns, onAction, onNewOrder, onSearch }) => (
  <SectionHeaderWrapper>
    <LeftPart>
      <PageTitle>Orders</PageTitle>
      <SearchBox style={{ width: 260 }} placeholder="Search by Order #, Customer or Boat" onChange={onSearch} />
      <HollowButton className="desktop" onClick={onNewOrder}>Export</HollowButton>
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
