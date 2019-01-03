import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import Table from 'components/basic/Table';
import Tab from 'components/basic/Tab';
import { OrderHeader } from 'components/compound/SectionHeader';

import { fetchOrders } from 'reducers/orders';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 100%;
`;

const TableWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow-y: scroll;
`;

class OrderList extends React.Component {
  componentDidMount() {
    this.props.fetchOrders();
  }
  toDetails = orderId => {
    this.props.history.push(`/order-details/?order=${orderId}`);
  };
  render() {
    const { orders } = this.props;
    const processedOrders = orders.map(order => ({
      ...order,
      name: `Order #${order.id}`,
      createdAt: `${moment(order.createdAt).format('MMM DD, YYYY')}`
    }));
    const columns = [
      { label: 'order', value: 'name' },
      { label: 'order placed', value: 'createdAt' },
      { label: 'total', value: 'total' },
      { label: 'order status', value: 'state' }
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
        <TableWrapper>
          <Table
            columns={columns}
            records={processedOrders}
            sortColumn="order"
            toDetails={this.toDetails}
          />
        </TableWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ order: { orders } }) => ({
  orders
});

const mapDispatchToProps = {
  fetchOrders
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OrderList)
);
