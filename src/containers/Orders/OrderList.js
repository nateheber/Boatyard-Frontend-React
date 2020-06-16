import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { get, filter, isEmpty } from 'lodash';

import Table from 'components/basic/Table';
import Tab from 'components/basic/Tab';
import { OrderHeader } from 'components/compound/SectionHeader';
import LoadingSpinner from 'components/basic/LoadingSpinner';
import { GetOrders, SetDispatchedFlag, UpdateSelectedColumns } from 'store/actions/orders';
import { refinedOrdersSelector, columnsSelector, selectedColumnsSelector, statusSelector, providerStatusSelector } from 'store/selectors/orders';
//import { getCustomerName } from 'utils/order';
import { getToken } from 'store/selectors/auth';
import { apiBaseUrl } from '../../api/config';

import NewOrderModal from 'components/template/Orders/NewOrderModal';
// import { string } from 'prop-types';

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
  position: relative;
  .loading {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, .5);
    z-index: 2;
  }
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
      page: 1,
      pageCount: 0,
      searching: false,
      orders: [],
      filteredOrders: [],
      keyword: '',
      selectedFilters: [],
      startDate: null,
      endDate: null
    };
  }

  componentDidMount() {
    const { keyword } = this.state;
    isEmpty(keyword) ? this.loadOrders() : this.loadOrders(keyword);
    //const { orders } = this.props;
    // const { tab } = this.state;
    // this.onChangeTab(tab);
   // this.setState({ orders })
  }

  componentWillUnmount() {
    this.props.SetDispatchedFlag(false);
  }

  loadOrders = (keyword) => {
    const { GetOrders, page, perPage, privilege } = this.props;
    const { selectedFilters, startDate, endDate } = this.state;
    let stringFilters = selectedFilters.map(filter => filter.value).join(',');
    let start = startDate === null ? '' : moment(startDate).format('YYYY-MM-DD');
    let end = endDate === null ? '' : moment(endDate).format('YYYY-MM-DD');
    const params = isEmpty(keyword) ? 
    privilege === 'admin' ?
    {
      page: page ? page : 1,
      per_page: 15,
      states: stringFilters,
      start: start,
      stop: end,
      'order[sort]': 'desc', 
      'order[order]': 'created_at'
    } : 
    {
      page: page,
      per_page: perPage,
      //search: keyword,
      states: stringFilters,
      start: start,
      stop: end,
      //'order[order]': 'provider_order_sequence',
      'order[sort]': 'desc'
    } :
    {
      page: page,
      search: keyword,
      states: stringFilters,
      start: start,
      stop: end,
      per_page: 15,
      'order[sort]': 'desc'
    };
    GetOrders({ params });
  }

  onChangeTab = (tab, page = 1) => {
    console.log(page);
    const { privilege } = this.props;
    const { keyword, selectedFilters, startDate, endDate } = this.state;
    let stringFilters = selectedFilters.map(filter => filter.value).join(',');
    let start = startDate === null ? '' : moment(startDate).subtract('days', 1).format('YYYY-MM-DD');
    let end = endDate === null ? '' : moment(endDate).add('days', 1).format('YYYY-MM-DD');
    this.props.SetDispatchedFlag(false);
    this.setState({ tab });
    if (tab === NEED_ASSIGNMENT_TAB) {
      this.props.GetOrders({ params: { page, per_page: 15, 'order[state]': 'draft', search: keyword, start: start, stop: end } });
    } else if (tab === INVOICED_TAB) {
      this.props.GetOrders({
        params: {
          page,
          per_page: 15,
          start: start, 
          stop: end,
          'invoices': true,
          'states': 'accepted,provisioned,scheduled,started,invoiced',
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
            'order[order]': 'provider_order_sequence',
            'order[sort]': 'desc'
          }
        });
      } else {
        this.props.GetOrders({ params: { page, per_page: 15, states: 'dispatched', search: keyword, start: start, stop: end } });
      }
    } else {
      if (privilege === 'provider') {
        console.log("Privilege");
        this.props.GetOrders({
          params: {
            page,
            per_page: 15,
            search: keyword,
            states: stringFilters,
            start: start,
            stop: end,
            // 'order[order]': 'provider_order_sequence',
            'order[sort]': 'desc',
            'order[order]': 'created_at'
          }
        });
      } else {
        console.log("changing pages")
        this.setState({ searching: true});
        this.props.GetOrders({ 
          params: { 
            page: page, 
            per_page: 15, 
            search: keyword, 
            states: stringFilters, 
            start: start, 
            stop: end, 
            'order[sort]': 
            'desc', 'order[order]': 'created_at' 
          } 
        });
        //this.setState({searching: false});
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
    this.props.history.push({pathname: `/orders/${order.id}/detail`, state: { dispatched, lastPage: this.state.page }});
  };

  getPageCount = () => {
    const { perPage, total } = this.props;
    return Math.ceil(total/perPage);
  };

  changePage = (page) => {
    const { tab } = this.state;
    this.setState({ page });
    this.onChangeTab(tab, page);
  };

  newOrder = () => {
    this.orderCreation.createOrder();
  };

  creationFinished = (orderId) => {
    this.props.history.push(`/orders/${orderId}/detail`);
  };

  handleSearch = (keyword) => {
    if (keyword.length <= 0) {
      this.setState({ searching: false});
      this.loadOrders();
    } else {
      this.setState({ keyword, searching: true }, () => {
        this.loadOrders(keyword);
      });
    }
  }

  handleFilter = (filters) => {
    if (filters.length <= 0) {
      this.setState({ searching: false});
      this.loadOrders();
    } else {
      this.setState({ selectedFilters: filters, searching: true }, () => {

        this.loadOrders();
      })
    }
  }

  onDatesChange = (start, end) => {
    console.log("~~~~~~~~~~~Running OnDatesChange~~~~~~~~~~~~");
    const { keyword, selectedFilters } = this.state;
    let stringFilters = selectedFilters.map(filter => filter.value).join(',');
    this.setState({startDate: start, endDate: end, searching: true, page: 1}, () => {
      this.props.GetOrders({ 
        params: { 
          page: 1, 
          per_page: 25, 
          search: keyword, 
          states: stringFilters, 
          start: this.state.startDate === null ? '' : moment(this.state.startDate).format('YYYY-MM-DD'),//.subtract('days', 1).format('YYYY-MM-DD'), 
          stop: this.state.endDate === null ? '' : moment(this.state.endDate).add('days', 1).format('YYYY-MM-DD'), 
          'order[sort]': 'desc', 
          'order[order]': 'created_at' 
        } 
      });
      //this.loadOrders();
    });
  }

  resetFilters = () => {
    this.setState({ selectedFilters: [] }, () => {
      this.loadOrders();
    });
  }

  handleExport = () => {
    const { token } = this.props;
    const { selectedFilters, startDate, endDate } = this.state;
    let stringFilters = selectedFilters.map(filter => filter.value).join(',');
    let start = startDate === null ? '' : moment(startDate).format('YYYY-MM-DD');
    let end = endDate === null ? '' : moment(endDate).format('YYYY-MM-DD');
    const now = new Date();
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `${token}`);
    myHeaders.append('Content-Type', 'application/json');
    let url;
    if (stringFilters.length === 0) {
      if (start === null) {
        url = `${apiBaseUrl}/reports/transactions?start=2020-06-01&stop=2020-06-30&xls=true`;
      } else {
        url = `${apiBaseUrl}/reports/transactions?start=${start}&stop=${end}&xls=true`;
      }
    } else {
      if (start === null) {
        url = `${apiBaseUrl}/reports/transactions?order_states=${stringFilters}&start=2020-06-01&stop=2020-06-30&xls=true`;
      } else {
        url = `${apiBaseUrl}/reports/transactions?order_states=${stringFilters}&start=${start}&stop=${end}&xls=true`;
      }
    }
    console.log(url);
    fetch(url, {
      headers: myHeaders
    })
    .then((resp) => resp.blob())
    .then(function(blob) {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Transactions-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    })
  }

  render() {
    const { orders, page, privilege, statuses, providerStatuses, loading } = this.props;
    const selectedStatuses = privilege === 'admin' ? statuses : providerStatuses;
    const pageCount = this.getPageCount();
    const processedOrders = (orders || []).map(order => {
      let name = `Order #${order.id}`;
      //let customerName = getCustomerName(order, privilege);
      let customerName = order.customerAttributes !== null ? get(order, 'customerAttributes.name') : '';
      if (privilege === 'provider') {
        if (order.state === 'dispatched' || order.state === 'assigned') {
          name = '_';
          //customerName = '_';
        } else if (order.providerOrderSequence) {
          name = `Order #${order.providerOrderSequence}`;
        }
      }
      if (order.state === 'draft') {
        order.stateAlias = 'Needs Assignment';
      }
      if (order.state === 'declined') {
        order.stateAlias = 'Quote Declined';
      }
      return {
      ...order,
      name,
      customerName,
      createdAt: `${moment(order.createdAt).format('MMM DD, YYYY')}`
      };
    });

    const { tab, selectedFilters, searching, startDate, endDate } = this.state;
    console.log(this.state);
    const { columns, selectedColumns } = this.props;
    if (loading && !searching) return <LoadingSpinner loading={true} />
    return (
      <Wrapper>
        <OrderHeader
          onNewOrder={this.newOrder}
          onSearch={this.handleSearch}
          onExport={this.handleExport}
          columns={columns}
          statuses={statuses}
          selectedColumns={selectedColumns}
          onChangeColumns={this.onChangeColumns} />
        <Tab tabs={tabs[privilege]} selected={tab} onChange={this.onChangeTab} />
          <Content>
            <TableWrapper>
            { loading && <LoadingSpinner loading={true} /> }
              <Table
                columns={selectedColumns}
                records={processedOrders}
                statuses={selectedStatuses}
                resetFilters={this.resetFilters}
                startDate={startDate}
                endDate={endDate}
                onDatesChange={this.onDatesChange}
                onChangeFilter={this.handleFilter}
                selectedFilters={selectedFilters}
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
  columns: columnsSelector(state),
  statuses: statusSelector(),
  providerStatuses: providerStatusSelector(),
  selectedColumns: selectedColumnsSelector(state),
  page: get(state, 'order.orders.page', 1),
  perPage: get(state, 'order.orders.perPage', 20),
  total: get(state, 'order.orders.total', 0),
  privilege: get(state, 'auth.privilege'),
  currentStatus: state.order.currentStatus,
  loading: state.order.loading,
  token: getToken(state)
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
