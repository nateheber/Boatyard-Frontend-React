import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import Table from 'components/basic/Table';
import Tab from 'components/basic/Tab';
import { OrderHeader } from 'components/compound/SectionHeader';

import { GetOrders } from 'store/actions/orders';

import NewOrderModal from 'components/template/Orders/NewOrderModal';

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

const columns = [
  { label: 'order', value: 'name' },
  { label: 'order placed', value: 'createdAt' },
  { label: 'total', value: 'total' },
  { label: 'order status', value: 'state' }
];
const tabs = [
  { title: 'NORMAL', value: 'all', counts: 0 },
  { title: 'DISPATCHED', value: 'dispatched', counts: 0 },
];

class OrderList extends React.Component {
  state = { tab: 'all' }

  componentDidMount() {
    this.props.GetOrders({ params: { page: 1 } });
  }

  onChangeTab = (tab) => {
    this.setState({ tab });
    if (tab === 'dispatched') {
      this.props.GetOrders({ params: { page: 1 }, dispatched: true });
    } else {
      this.props.GetOrders({ params: { page: 1 } });
    }
  }

  setNewOrderModalRef = (ref) => {
    if (ref) {
      this.orderCreation = ref.getWrappedInstance();
    }
  };

  toDetails = order => {
    const { tab } = this.state;
    if (tab === 'dispatched') {
      this.props.history.push(`/order-details/?order=${order.id}&dispatched=true`);
    } else {
      this.props.history.push(`/order-details/?order=${order.id}`);
    }
  };

  getPageCount = () => {
    const { perPage, total } = this.props;
    return Math.ceil(total/perPage);
  };

  changePage = (page) => {
    this.props.GetOrders({ params: { page: page } });
  };

  newOrder = () => {
    this.orderCreation.createOrder();
  };

  creationFinished = (orderId) => {
    // const { page, GetOrders } = this.props;
    // GetOrders({ params: { page: page } });
    this.props.history.push(`/order-details/?order=${orderId}`);
  };

  render() {
    const { orders, page } = this.props;
    const pageCount = this.getPageCount();
    const processedOrders = (orders || []).map(order => ({
      ...order,
      name: `Order #${order.id}`,
      createdAt: `${moment(order.createdAt).format('MMM DD, YYYY')}`
    }));
    const { tab } = this.state;
    return (
      <Wrapper>
        <OrderHeader onNewOrder={this.newOrder} />
        <Tab tabs={tabs} selected={tab} onChange={this.onChangeTab} />
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
        <NewOrderModal ref={this.setNewOrderModalRef} onFinishCreation={this.creationFinished} />
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ order: { orders : { orders, page, perPage, total } } }) => ({
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
