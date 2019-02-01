import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { get } from 'lodash';

import { GetOpenOrders } from 'store/actions/orders';
import { refinedOrdersSelector } from 'store/selectors/orders'
import { OpenInvoicesSection } from 'components/basic/SubSection';
import { OrderTable } from 'components/basic/Order';
import { HollowButton } from 'components/basic/Buttons'

const Wrapper = styled.div`
  background-color: #fff;
  margin: 15px;
  .btn-view-all {
    margin: 15px;
    color: #004258;
  }
`;

class OpenInvoices extends React.Component {

  componentDidMount() {
    this.props.GetOpenOrders({
      params: {
        page: 1,
        per_page: 5,
        'order[state]': 'invoiced',
        'order[sort]': 'desc',
        'order[order]': 'created_at'  
      }
    });
  }

  render() {
    const { total, orders, history } = this.props;
    const columns = [
      { label: 'ORDER', value: 'id', width: '35%', isTitle: true, link: true },
      { label: 'CUSTOMER', value: 'relationships.user.attributes.firstName/relationships.user.attributes.lastName', width: '65%' }
    ];

    return (
      <Wrapper>
      <OpenInvoicesSection count={total} />
      <OrderTable
        columns={columns}
        items={orders}
        hiddenHeader={true}
      />
      <HollowButton className="btn-view-all" onClick={() => history.push('/invoices/')}>
        VIEW ALL
      </HollowButton>
    </Wrapper>  
    );
  }
}

const mapStateToProps = state => ({
  total: get(state, 'order.openOrders.total', 0),
  orders: refinedOrdersSelector(state ,'open')
});

const mapDispatchToProps = {
  GetOpenOrders
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
  )(OpenInvoices));
