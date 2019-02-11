import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { get } from 'lodash';

import Table from 'components/basic/Table';
import Tab from 'components/basic/Tab';
import { OrderHeader } from 'components/compound/SectionHeader';

import { GetOrders, SetDispatchedFlag } from 'store/actions/orders';
import { refinedOrdersSelector } from 'store/selectors/orders';

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

const columns = {
  admin: [
    { label: 'order', value: 'name' },
    { label: 'order placed', value: 'createdAt' },
    { label: 'customer', value: 'relationships.user.attributes.firstName/relationships.user.attributes.lastName' },
    { label: 'service', value: 'relationships.service.attributes.name' },
    { label: 'location', value: 'relationships.boat.relationships.location.address.street/relationships.boat.relationships.location.address.city/relationships.boat.relationships.location.address.state' },
    { label: 'boat name', value: 'relationships.boat.attributes.name' },
    { label: 'boat', value: 'relationships.boat.attributes.make' },
    { label: 'total', value: 'total', isValue: true, isCurrency: true, prefix: '$' },
    { label: 'order status', value: 'state' },
  ],
  provider: [
    { label: 'order', value: 'name' },
    { label: 'order placed', value: 'createdAt' },
    { label: 'total', value: 'total', isValue: true, isCurrency: true, prefix: '$' },
    { label: 'order status', value: 'state' },
  ]
};
const tabs = {
  admin: [
    { title: 'ALL', value: 'all', counts: 0 },
    { title: 'NEED ASSIGNMENT', value: 'needAssignment', counts: 0 },
    { title: 'DISPATCHED', value: 'dispatched', counts: 0 },
  ],
  provider: [
    { title: 'ALL', value: 'all', counts: 0 },
    { title: 'AWAITING ACCEPTANCE', value: 'dispatched', counts: 0 },
  ]
};

class OrderList extends React.Component {
  state = { tab: 'all' }

  componentDidMount() {
    this.props.SetDispatchedFlag(false);
    this.props.GetOrders({ params: { page: 1 } });
  }

  onChangeTab = (tab) => {
    this.setState({ tab });
    this.props.SetDispatchedFlag(tab === 'dispatched');
    if (tab === 'needAssignment') {
      this.props.GetOrders({ params: { page: 1, 'order[state]': 'draft' } })
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
    this.props.history.push(`/order-details/?order=${order.id}`);
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
    const { orders, page, privilege } = this.props;
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
        <Tab tabs={tabs[privilege]} selected={tab} onChange={this.onChangeTab} />
        <TableWrapper>
          <Table
            columns={columns[privilege]}
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

const mapStateToProps = state => ({
  orders: refinedOrdersSelector(state),
  page: get(state, 'order.orders.page', 1),
  perPage: get(state, 'oreder.orders.perPage', 20),
  total: get(state, 'order.orders.total', 0),
  privilege: get(state, 'auth.privilege'),
});

const mapDispatchToProps = {
  GetOrders,
  SetDispatchedFlag,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OrderList)
);
