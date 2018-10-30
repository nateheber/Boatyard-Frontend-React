import React from 'react';

import { SectionHeaderWrapper, LeftPart, RightPart } from '../../basic/Header';
import { OrangeButton } from '../../basic/Buttons';
import {
  FilterOptions,
  ColumnFilter,
  ActionDropdown
} from '../../basic/Dropdown';
import { PageTitle } from '../../basic/Typho';

export const OrderHeader = ({ onAction }) => (
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
      <OrangeButton className="desktop">New Order</OrangeButton>
      <ColumnFilter
        items={[
          { title: 'Order', value: 'order' },
          { title: 'Order Placed', value: 'order_placed' },
          { title: 'Customer', value: 'customer' },
          { title: 'Customer Location', value: 'customer_location' },
          { title: 'Boat', value: 'boat' },
          { title: 'Length', value: 'length' },
          { title: 'Total', value: 'total' },
          { title: 'Payment Status', value: 'payment_status' },
          { title: 'Scheduling Status', value: 'scheduling_status' },
          { title: 'Order Status', value: 'order_status' }
        ]}
      />
    </RightPart>
  </SectionHeaderWrapper>
);
