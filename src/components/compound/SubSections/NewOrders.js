import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { get, merge, orderBy } from 'lodash';

import { GetNewOrders, GetOrders } from 'store/actions/orders';
import { refinedOrdersSelector } from 'store/selectors/orders'
import { NewOrderSection } from 'components/basic/SubSection';
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

class NewOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      loaded: false,
      total: 0,
      orders: []
    };
  }

  componentDidMount() {
    const { GetNewOrders, GetOrders } = this.props;
    GetNewOrders({
      params: {
        page: 1,
        per_page: 5,
        'order[state]': 'draft',
        'order[sort]': 'desc',
        'order[order]': 'created_at'
      },
      success: () => {
        GetOrders({
          params: {
            page: 1,
            per_page: 5,
            'order[state]': 'dispatched',
            'order[sort]': 'desc',
            'order[order]': 'created_at'
          },
          success: () => {
            const { draftTotal, dispatchedTotal, draftOrders, dispatchedOrders } = this.props;
            let total = draftTotal + dispatchedTotal;
            let orders = orderBy(merge(draftOrders, dispatchedOrders), ['createdAt'], ['desc']);
            if (total > 5) {
              orders = orders.slice(0, 5);
              total = 5;
            }
            this.setState({ loaded: true, total, orders });
          }
        });
      }
    });
  }

  render() {
    const { history } = this.props;
    const { loaded, total, orders } = this.state;
    const columns = [
      { label: 'ORDER', value: 'id', isTitle: true, type: 'new', link: true },
      {
        label: 'CUSTOMER',
        value: [
          'relationships.user.attributes.firstName/relationships.user.attributes.lastName',
          'relationships.childAccount.attributes.firstName/relationships.childAccount.attributes.lastName'
        ],
        isCustomer: true,
        type: 'new-customer'
      },
      { label: 'SERVICE', value: 'relationships.service.attributes.name' },
      { label: 'BOAT NAME', value: 'relationships.boat.attributes.name' },
      { label: 'BOAT MAKE', value: 'relationships.boat.attributes.make' },
      { label: 'ORDER STATUS', value: 'status' }
    ];
    return (
      <Wrapper>
      <NewOrderSection count={total} />
      {loaded && <OrderTable
        columns={columns}
        items={orders}
      />}
      {loaded && <HollowButton className="btn-view-all" onClick={() => history.push('/orders/')}>
        VIEW ALL
      </HollowButton>}
    </Wrapper>  
    );
  }
}

const mapStateToProps = state => ({
  draftTotal: get(state, 'order.newOrders.total'),
  dispatchedTotal: get(state, 'order.orders.total'),
  draftOrders: refinedOrdersSelector(state, 'new'),
  dispatchedOrders: refinedOrdersSelector(state, '')
});

const mapDispatchToProps = {
  GetNewOrders,
  GetOrders
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewOrders));
