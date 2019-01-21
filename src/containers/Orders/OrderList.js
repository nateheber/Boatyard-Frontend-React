import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import Table from 'components/basic/Table';
import Tab from 'components/basic/Tab';
import { OrderHeader } from 'components/compound/SectionHeader';

import { GetOrders } from 'store/actions/orders';

import OrderCreation from './components/templates/OrderCreation';

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
    this.props.GetOrders({ page: 1 });
  }
  setOrderCreationRef = (ref) => {
    if (ref) {
      this.orderCreation = ref.getWrappedInstance();
    }
  }
  toDetails = orderId => {
    this.props.history.push(`/order-details/?order=${orderId}`);
  };
  getPageCount = () => {
    const { perPage, total } = this.props;
    return Math.ceil(total/perPage);
  }
  changePage = (page) => {
    this.props.fetchOrders({page: page });
  }
  newOrder = () => {
    this.orderCreation.createOrder();
  }
  creationFinished = () => {
    const { page, fetchOrders } = this.props;
    fetchOrders(page);
  }
  render() {
    const { orders, page } = this.props;
    const pageCount = this.getPageCount();
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
            page={page}
            pageCount={pageCount}
            onPageChange={this.changePage}
          />
        </TableWrapper>
        <OrderCreation ref={this.setOrderCreationRef} onFinishCreation={this.creationFinished} />
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ order: { orders, page, perPage, total } }) => ({
  orders,
  perPage,
  total,
  page,
});

const mapDispatchToProps = {
  GetOrders
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OrderList)
);
