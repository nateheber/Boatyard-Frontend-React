import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import Table from '../basic/Table';
import Tab from '../basic/Tab';
import { OrderHeader } from '../compound/SectionHeader';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 100%;
`;

class Order extends React.Component {
  toDetails = orderId => {
    this.props.history.push(`/order-details/${orderId}/`);
  };
  render() {
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
    const tabs = [
      { title: 'ALL', value: 'all', counts: 2 },
      { title: 'NEW', value: 'new', counts: 0 },
      { title: 'IN PROGRESS', value: 'in_progress', counts: 1 },
      { title: 'COMPLETED', value: 'completed', counts: 1 }
    ];
    return (
      <Wrapper>
        <OrderHeader onNewOrder={this.newOrder} />
        <Tab tabs={tabs} selected="all" />
        <Table
          columns={columns}
          records={records}
          sortColumn="order"
          toDetails={this.toDetails}
        />
      </Wrapper>
    );
  }
}

export default withRouter(Order);
