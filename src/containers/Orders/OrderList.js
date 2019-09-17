import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { get, filter } from 'lodash';

import Table from 'components/basic/Table';
import Tab from 'components/basic/Tab';
import { OrderHeader } from 'components/compound/SectionHeader';
import LoadingSpinner from 'components/basic/LoadingSpinner';
import { GetOrders, SetDispatchedFlag, UpdateSelectedColumns, actionTypes } from 'store/actions/orders';
import { refinedOrdersSelector, columnsSelector, selectedColumnsSelector } from 'store/selectors/orders';
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

    let tab = ALL_TAB;

    const { state } = props.location;
    if (state && state.hasOwnProperty('tab')) {
      const tabState = get(state, 'tab');
      if (ORDER_TABS.indexOf(tabState) > -1) {
        tab = tabState;
      }
    }
    this.state = {
      tab,
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
          // 'states': 'accepted,provisioned,scheduled,started,invoiced',
          'without_states': 'completed',
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

  onChangeColumns = (selectedColumns) => {
    const { columns } = this.props;
    const allLabels = columns.map(c => c.label);
    const selLabels = selectedColumns.map(c => c.label);
    const unselectedLabels = filter(allLabels, l => selLabels.indexOf(l) === -1);
    this.props.UpdateSelectedColumns({
      unselectedColumns: unselectedLabels
    });
    // this.props.UpdateSelectedColumns(
    //   {unselectedLables: without(, )}
    // );
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
    this.props.history.push({pathname: `/orders/${order.id}/detail`, state: { dispatched }});
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
    this.props.history.push(`/orders/${orderId}/detail`);
  };

  render() {
    const { orders, page, privilege, currentStatus } = this.props;
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

    const { tab } = this.state;
    const { columns, selectedColumns } = this.props;
    const loading = currentStatus === actionTypes.GET_ORDERS;
    return (
      <Wrapper>
        <OrderHeader
          onNewOrder={this.newOrder}
          columns={columns}
          selectedColumns={selectedColumns}
          onChangeColumns={this.onChangeColumns} />
        <Tab tabs={tabs[privilege]} selected={tab} onChange={this.onChangeTab} />
        {
          loading ? <LoadingSpinner loading={true} /> :
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
        }
        <NewOrderModal ref={this.setNewOrderModalRef} onFinishCreation={this.creationFinished} />
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  orders: refinedOrdersSelector(state),
  columns: columnsSelector(state),
  selectedColumns: selectedColumnsSelector(state),
  page: get(state, 'order.orders.page', 1),
  perPage: get(state, 'order.orders.perPage', 20),
  total: get(state, 'order.orders.total', 0),
  privilege: get(state, 'auth.privilege'),
  currentStatus: state.order.currentStatus,
});

const mapDispatchToProps = {
  GetOrders,
  SetDispatchedFlag,
  UpdateSelectedColumns,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OrderList)
);
