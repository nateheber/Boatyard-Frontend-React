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
import { getCustomerName, getBoatFromOrder } from 'utils/order';

import NewOrderModal from 'components/template/Orders/NewOrderModal';

const ALL_TAB = 'all';
const NEED_ASSIGNMENT_TAB = 'needAssignment';
const INVOICED_TAB = 'invoiced';
const DISPATCHED_TAB = 'dispatched';

const PER_PAGE = 15;
const TOTAL_ORDER_COUNT = 1000;

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
      columns[2]['value'] = ['relationships.childAccount.attributes.firstName/relationships.childAccount.attributes.lastName'];
      columns.splice(4, 1);
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
      selectedColumns: columns,
      page: 1,
      pageCount: 0,
      orders: [],
      filteredOrders: [],
      keyword: ''
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
      this.loadOrders({
        page,
        per_page: TOTAL_ORDER_COUNT,
        'order[state]': 'draft'
      });
    } else if (tab === INVOICED_TAB) {
      this.loadOrders({
        page,
        per_page: TOTAL_ORDER_COUNT,
        'invoices': true,
        // 'order[order]': 'position',
        // 'order[sort]': 'desc'
      });
    } else if (tab === DISPATCHED_TAB) {
      if (privilege === 'provider') {
        this.props.SetDispatchedFlag(true);
        this.loadOrders({
          page,
          per_page: TOTAL_ORDER_COUNT,
          // 'order[order]': 'position',
          // 'order[sort]': 'desc'
        });
      } else {
        this.loadOrders({
          page,
          per_page: TOTAL_ORDER_COUNT,
          'order[state]': 'dispatched'
        });
      }
    } else {
      if (privilege === 'provider') {
        this.loadOrders({
          page,
          per_page: TOTAL_ORDER_COUNT,
          // 'order[order]': 'position',
          // 'order[sort]': 'desc'
        });
      } else {
        this.loadOrders({
          page,
          per_page: TOTAL_ORDER_COUNT
        });
      }
    }
  };

  loadOrders = (params, page = 1) => {
    const { GetOrders } = this.props;
    GetOrders({
      params,
      success: () => {
        this.processOrders();
      }
    });
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

  changePage = (page) => {
    // const { tab } = this.state;
    // this.onChangeTab(tab, page);
    this.setState({ page });
  };

  processOrders = () => {
    const { privilege, orders } = this.props;
    const { tab } = this.state;
    let processedOrders = (orders || []).map(order => {
      let name = `Order #${order.id}`;
      if (privilege === 'provider') {
        if (order.state === 'dispatched' || order.state === 'assigned') {
          name = '-';
        } else if(order.providerOrderSequence) {
          name = `Order #${order.providerOrderSequence}`;
        }
      }
      return {
        ...order,
        name,
        createdAt: `${moment(order.createdAt).format('MMM DD, YYYY')}`
      };
    });
    if (tab === ALL_TAB && privilege === 'provider') {
      const dispatchedOrders = processedOrders.filter(order => order.state === 'dispatched' || order.state === 'assigned');
      const restOrders = processedOrders.filter(order => order.state !== 'dispatched' && order.state !== 'assigned');
      processedOrders = dispatchedOrders.concat(restOrders);
    }
    this.setState({ orders: processedOrders }, () => {
      this.filterOrders();
    });
  };

  filterOrders = () => {
    const { privilege } = this.props;
    const { orders, keyword } = this.state;
    let filteredOrders = orders.slice(0);
    if (keyword.trim().length > 0) {
      const lowerKeyword = keyword.toLowerCase();
      filteredOrders = orders.filter(order => {
        const customerName = (getCustomerName(order, privilege) || '').toLowerCase();
        const boatName = (get(getBoatFromOrder(order), 'name') || '').toLowerCase();
        return order.id.indexOf(keyword) > -1 ||
          order.stateAlias.toLowerCase().indexOf(lowerKeyword) > -1 ||
          customerName.indexOf(lowerKeyword) > -1 ||
          boatName.indexOf(lowerKeyword) > -1;
      });
    }
    const pageCount = Math.ceil(filteredOrders.length / PER_PAGE);
    this.setState({
      page: 1,
      pageCount,
      filteredOrders
    });
  };

  newOrder = () => {
    this.orderCreation.createOrder();
  };

  creationFinished = (orderId) => {
    this.props.history.push(`/order-details/?order=${orderId}`);
  };

  handleSearch = (keyword) => {
    this.setState({ keyword }, () => {
      this.filterOrders();
    });
  };

  handleExport = () => {
  };

  render() {
    const { privilege } = this.props;
    const { tab, columns, selectedColumns, page, pageCount, filteredOrders } = this.state;
    return (
      <Wrapper>
        <OrderHeader
          onNewOrder={this.newOrder}
          columns={columns}
          selectedColumns={selectedColumns}
          onChangeColumns={this.onChangeColumns}
          onSearch={this.handleSearch}
          onExport={this.handleExport} />
        <Tab tabs={tabs[privilege]} selected={tab} onChange={this.onChangeTab} />
        <Content>
          <TableWrapper>
            <Table
              columns={selectedColumns}
              records={filteredOrders.slice((page - 1) * 15, page * 15)}
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
