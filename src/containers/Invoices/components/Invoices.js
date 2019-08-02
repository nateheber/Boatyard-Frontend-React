import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { withRouter } from 'react-router-dom';

import { GetOpenOrders, GetPaidOrders } from 'store/actions/orders';
import { refinedOrdersSelector } from 'store/selectors/orders'
import Table from 'components/basic/Table';
import Tab from 'components/basic/Tab';
import { InvoicesHeader } from 'components/compound/SectionHeader';

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

const INVOICE_COLUMNS = [
  { label: 'ORDER', value: 'id', isTitle: true },
  { label: 'Due Date', value: 'invoiceDueOn', isDate: true },
  { label: 'CUSTOMER', value: 'relationships.user.attributes.firstName/relationships.user.attributes.lastName' },
  { label: 'Total', value: 'total', prefix: '$', isValue: true, isCurrency: true },
  { label: 'PAYMENT STATUS', value: 'status' }
];

class Invoices extends React.Component {
  constructor(props) {
    super(props);
    const selectedColumns = get(props.location.state, 'selectedColumns', null);
    this.state = {
      currentTab: this.props.type || 'open',
      selectedColumns: selectedColumns || INVOICE_COLUMNS
    };
  }

  componentDidMount() {
    this.props.GetPaidOrders({
      params: {
        page: 1,
        'order[state]': 'completed',
        'order[sort]': 'desc',
        'order[order]': 'created_at'
      }
    });
    this.props.GetOpenOrders({
      params: {
        page: 1,
        'order[state]': 'invoiced',
        'order[sort]': 'desc',
        'order[order]': 'created_at'
      }
    });
  }

  loadOrders = (page = 1) => {
    const { currentTab } = this.state;
    if (currentTab === 'open') {
      this.props.GetOpenOrders({
        params: {
          page: page,
          'order[state]': 'invoiced',
          'order[sort]': 'desc',
          'order[order]': 'created_at'
        }
      });  
    } else {
      this.props.GetPaidOrders({
        params: {
          page: page,
          'order[state]': 'completed',
          'order[sort]': 'desc',
          'order[order]': 'created_at'
        }
      });
    }
  }

  toDetails = order => {
    this.props.history.push(`/orders/${order.id}/detail`);
  };

  getPageCount = () => {
    const { currentTab } = this.state;
    const { openOrders, paidOrders } = this.props;
    if (currentTab === 'open') {
      const { perPage, total } = openOrders;
      return Math.ceil(total/perPage);  
    } else {
      const { perPage, total } = paidOrders;
      return Math.ceil(total/perPage);  
    }
  }

  changePage = (page) => {
    this.loadOrders(page);
  }

  onChangeColumns = (columns) => {
    this.setState({
      selectedColumns: columns
    });
  }

  getCurrentPage = () => {
    const { currentTab } = this.state;
    const { openOrders, paidOrders } = this.props;
    return currentTab === 'open' ? openOrders.page : paidOrders.page;
  }

  handleTabChanged = (tab) => {
    const { selectedColumns } = this.state;
    this.props.history.push({
      pathname: `/invoices/${tab}`,
      state: { selectedColumns: selectedColumns }
    });
  }

  render() {
    const { openOrders, paidOrders, refinedOrders } = this.props;
    const { selectedColumns, currentTab } = this.state;
    const tabs = [
      { title: 'Open', value: 'open', counts: openOrders.total || 0 },
      { title: 'Paid', value: 'paid', counts: paidOrders.total || 0 }
    ];
    return (
      <Wrapper>
        <InvoicesHeader
          columns={INVOICE_COLUMNS}
          selectedColumns={selectedColumns}
          onChangeColumns={this.onChangeColumns} />
        <Tab tabs={tabs} selected={currentTab} onChange={this.handleTabChanged} />
        <TableWrapper>
          <Table
            columns={selectedColumns}
            records={refinedOrders}
            sortColumn="order"
            toDetails={this.toDetails}
            page={this.getCurrentPage()}
            pageCount={this.getPageCount()}
            onPageChange={this.changePage}
          />
        </TableWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, props) => ({
  openOrders: state.order.openOrders,
  paidOrders: state.order.paidOrders,
  refinedOrders: refinedOrdersSelector(state, props.type)
});

const mapDispatchToProps = {
  GetOpenOrders,
  GetPaidOrders
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Invoices)
);
