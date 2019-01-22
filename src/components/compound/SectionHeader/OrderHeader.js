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

export const OrderHeader = ({ onAction, onNewOrder }) => (
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
        items={[
          { label: 'Order', value: 'order' },
          { label: 'Order Placed', value: 'order_placed' },
          { label: 'Customer', value: 'customer' },
          { label: 'Customer Location', value: 'customer_location' },
          { label: 'Boat', value: 'boat' },
          { label: 'Length', value: 'length' },
          { label: 'Total', value: 'total' },
          { label: 'Payment Status', value: 'payment_status' },
          { label: 'Scheduling Status', value: 'scheduling_status' },
          { label: 'Order Status', value: 'order_status' }
        ]}
        onChangeSelection={columns => {
          console.log(columns);
        }}
      />
    </RightPart>
  </SectionHeaderWrapper>
);
