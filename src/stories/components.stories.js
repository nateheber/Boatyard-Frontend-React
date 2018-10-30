import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Selector } from '../components/basic/Input';
import Tab from '../components/basic/Tab';
import Table from '../components/basic/Table';
import {
  FilterOptions,
  ActionDropdown,
  ColumnFilter
} from '../components/basic/Dropdown';

storiesOf('Common Components', module)
  .add('Selector', () => {
    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ];
    return <Selector options={options} />;
  })
  .add('Filter Options', () => (
    <FilterOptions
      onChangeFilter={filter => {
        console.log(filter);
      }}
    />
  ))
  .add('Action Dropdown', () => {
    const items = [
      {
        title: 'Import',
        action: () => {}
      },
      {
        title: 'Export',
        action: () => {}
      }
    ];
    return <ActionDropdown items={items} />;
  })
  .add('Column Filter', () => {
    const items = [
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
    ];
    return (
      <ColumnFilter
        items={items}
        onChangeSelection={selection => {
          console.log(selection);
        }}
      />
    );
  })
  .add('Tabs', () => {
    const items = [
      { title: 'ALL', value: 'all', counts: 2 },
      { title: 'NEW', value: 'new', counts: 0 },
      { title: 'IN PROGRESS', value: 'in_progress', counts: 1 },
      { title: 'COMPLETED', value: 'completed', counts: 1 }
    ];
    return <Tab tabs={items} selected="all" />;
  })
  .add('Table', () => {
    const columns = [
      { label: 'order', value: 'order' },
      { label: 'order placed', value: 'order_placed' },
      { label: 'customer', value: 'customer' },
      { label: 'total', value: 'total' },
      { label: 'payment status', value: 'payment_status' },
      { label: 'scheduling status', value: 'scheduling_status' },
      { label: 'order status', value: 'order_status' }
    ];
    const records = [
      {
        order: 'NEW ORDER',
        order_placed: '2018/09/09',
        customer: 'Test',
        total: '$200',
        payment_status: 'paid',
        scheduling_status: 'scheduled',
        order_status: 'pending'
      },
      {
        order: 'NEW ORDER',
        order_placed: '2018/10/10',
        customer: 'Test',
        total: '$200',
        payment_status: 'paid',
        scheduling_status: 'scheduled',
        order_status: 'pending'
      },
      {
        order: 'NEW ORDER',
        order_placed: '2018/11/11',
        customer: 'Test',
        total: '$200',
        payment_status: 'paid',
        scheduling_status: 'scheduled',
        order_status: 'pending'
      }
    ];
    return <Table columns={columns} records={records} sortColumn="order" />;
  });
