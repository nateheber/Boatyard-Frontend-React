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
import { getCustomerName } from 'utils/order';

import NewOrderModal from 'components/template/Orders/NewOrderModal';

const ALL_TAB = 'all';
const NEED_ASSIGNMENT_TAB = 'needAssignment';
const INVOICED_TAB = 'invoiced';
const DISPATCHED_TAB = 'dispatched';

const ORDER_TABS = [ALL_TAB, NEED_ASSIGNMENT_TAB, INVOICED_TAB, DISPATCHED_TAB];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  overflow-x: scroll;
`;

const TableWrapper = styled.div`
  width: auto;
  min-width: 100%;
`;

const ORDER_COLUMNS = [
  { label: 'order', value: 'name', width: 1 },
  { label: 'order placed', value: 'createdAt', width: 1.2 },
  {
    label: 'CUSTOMER',
    value: [
      'relationships.user.attributes.firstName/relationships.user.attributes.lastName'
    ],
    isCustomer: true,
    width: 1.2
  },
  { label: 'service', value: 'relationships.service.attributes.name', width: 1 },
  // {
  //   label: 'location',
  //   value: 'relationships.boat.relationships.location.address.street/relationships.boat.relationships.location.address.city/relationships.boat.relationships.location.address.state',
  //   combines: [', ', ', '],
  //   width: 2.5
  // },
  { label: 'provider', value: 'relationships.provider.attributes.name', width: 1 },
  {
    label: 'location',
    street: 'relationships.boat.relationships.location.address.street',
    city: 'relationships.boat.relationships.location.address.city',
    state: 'relationships.boat.relationships.location.address.state',
    isLocation: true,
    width: 2.5
  },
  { label: 'boat name', value: 'relationships.boat.attributes.name', width: 1.5, },
  { label: 'boat', value: 'relationships.boat.attributes.make', width: 1.2, },
  { label: 'total', value: 'total', isValue: true, isCurrency: true, prefix: '$', width: 0.8, },
  { label: 'order status', value: 'stateAlias', width: 1.2 },
];
const tabs = {
  admin: [
    { title: 'ALL', value: ALL_TAB, counts: 0 },
    { title: 'NEED ASSIGNMENT', value: NEED_ASSIGNMENT_TAB, counts: 0 },
    { title: 'DISPATCHED', value: DISPATCHED_TAB, counts: 0 },
  ],
  provider: [
    { title: 'ALL', value: ALL_TAB, counts: 0 },
    { title: 'INVOICED', value: INVOICED_TAB, counts: 0 },
    { title: 'AWAITING ACCEPTANCE', value: DISPATCHED_TAB, counts: 0 },
  ]
};

class OrderList extends React.Component {
  constructor(props) {
    super(props);
    const columns = ORDER_COLUMNS.slice(0);
    let tab = ALL_TAB;
    if (props.privilege === 'provider') {
      columns.splice(4, 1);
      // columns[2]['value'] = ['relationships.childAccount.attributes.firstName/relationships.childAccount.attributes.lastName'];
      columns[2]['value'] = ['customerName'];
    }
    const { state } = props.location;
    if (state && state.hasOwnProperty('tab')) {
      const tabState = get(state, 'tab');
      if (ORDER_TABS.indexOf(tabState) > -1) {
        tab = tabState;
      }
    }
    this.state = {
      tab,
      columns,
      selectedColumns: columns
    };
  }

  componentDidMount() {
    const { tab } = this.state;
    this.onChangeTab(tab);
  }

  componentWillUnmount() {
    this.props.SetDispatchedFlag(false);
  }

  onChangeTab = (tab, page = 1) => {
    const { privilege } = this.props;
    this.props.SetDispatchedFlag(false);
    this.setState({ tab });
    if (tab === NEED_ASSIGNMENT_TAB) {
      this.props.GetOrders({ params: { page, per_page: 15, 'order[state]': 'draft' } });
    } else if (tab === INVOICED_TAB) {
      this.props.GetOrders({
        params: {
          page,
          per_page: 15,
          'invoices': true,
          'order[order]': 'provider_order_sequence',
          'order[sort]': 'desc'
        }
      });
    } else if (tab === DISPATCHED_TAB) {
      if (privilege === 'provider') {
        this.props.SetDispatchedFlag(true);
        this.props.GetOrders({
          params: {
            page,
            per_page: 15,
            // 'order[order]': 'provider_order_sequence',
            // 'order[sort]': 'desc'
          }
        });
      } else {
        this.props.GetOrders({ params: { page, per_page: 15, 'order[state]': 'dispatched' } });
      }
    } else {
      if (privilege === 'provider') {
        this.props.GetOrders({
          params: {
            page,
            per_page: 15,
            'order[order]': 'provider_order_sequence',
            'order[sort]': 'desc'
          }
        });
      } else {
        this.props.GetOrders({ params: { page, per_page: 15 } });
      }
    }
  };

  onChangeColumns = (columns) => {
    this.setState({
      selectedColumns: columns
    });
  };

  setNewOrderModalRef = (ref) => {
    if (ref) {
      this.orderCreation = ref.getWrappedInstance();
    }
  };

  toDetails = order => {
    const { state } = order;
    const { privilege } = this.props;
    let dispatched = false;
    if (state === 'dispatched' && privilege === 'provider') {
      dispatched = true;
    }
    this.props.history.push({pathname: '/order-details/', search: `?order=${order.id}`, state: { dispatched }});
  };

  getPageCount = () => {
    const { perPage, total } = this.props;
    return Math.ceil(total/perPage);
  };

  changePage = (page) => {
    const { tab } = this.state;
    this.onChangeTab(tab, page);
  };

  newOrder = () => {
    this.orderCreation.createOrder();
  };

  creationFinished = (orderId) => {
    this.props.history.push(`/order-details/?order=${orderId}`);
  };

  render() {
    const { orders, page, privilege } = this.props;
    const pageCount = this.getPageCount();
    const processedOrders = (orders || []).map(order => {
      let name = `Order #${order.id}`;
      let customerName = getCustomerName(order, privilege);
      if (privilege === 'provider') {
        if (order.state === 'dispatched' || order.state === 'assigned') {
          name = '_';
          customerName = '_';
        } else if (order.providerOrderSequence) {
          name = `Order #${order.providerOrderSequence}`;
        }
      }  
      return {
      ...order,
      name,
      customerName,
      createdAt: `${moment(order.createdAt).format('MMM DD, YYYY')}`
      };
    });

    const { tab, columns, selectedColumns } = this.state;
    return (
      <Wrapper>
        <OrderHeader
          onNewOrder={this.newOrder}
          columns={columns}
          selectedColumns={selectedColumns}
          onChangeColumns={this.onChangeColumns} />
        <Tab tabs={tabs[privilege]} selected={tab} onChange={this.onChangeTab} />
        <Content>
          <TableWrapper>
            <Table
              columns={selectedColumns}
              records={processedOrders}
              toDetails={this.toDetails}
              page={page}
              pageCount={pageCount}
              onPageChange={this.changePage}
            />
          </TableWrapper>
        </Content>
        <NewOrderModal ref={this.setNewOrderModalRef} onFinishCreation={this.creationFinished} />
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  orders: refinedOrdersSelector(state),
  page: get(state, 'order.orders.page', 1),
  perPage: get(state, 'order.orders.perPage', 20),
  total: get(state, 'order.orders.total', 0),
  privilege: get(state, 'auth.privilege')
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
