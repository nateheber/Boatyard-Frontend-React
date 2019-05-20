import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { get } from 'lodash';

import { GetNewOrders } from 'store/actions/orders';
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
    const { GetNewOrders } = this.props;
    GetNewOrders({
      params: {
        page: 1,
        per_page: 5,
        'order[order]': 'position',
        'order[sort]': 'desc'
      }
    });
  }

  render() {
    const { history } = this.props;
    const { total, orders } = this.props;
    let newOrders = orders;
    if (total > 5) {
      newOrders = orders.slice(0, 5);
    }
    const processedOrders = (newOrders || []).map(order => {
      let name = `Order #${order.id}`;
      if (order.providerOrderSequence) {
        name = `Order #${order.providerOrderSequence}`;
      }
      return {
        ...order,
        name
      };
    });
    const columns = [
      { label: 'ORDER', value: 'name', isTitle: true, type: 'new', link: true },
      {
        label: 'CUSTOMER',
        value: [
          'relationships.user.attributes.firstName/relationships.user.attributes.lastName',
          'relationships.childAccount.attributes.firstName/relationships.childAccount.attributes.lastName'
        ],
        isCustomer: true,
        // type: 'new-customer'
      },
      { label: 'SERVICE', value: 'relationships.service.attributes.name' },
      { label: 'BOAT NAME', value: 'relationships.boat.attributes.name' },
      { label: 'BOAT MAKE', value: 'relationships.boat.attributes.make' },
      { label: 'ORDER STATUS', value: 'status' }
    ];
    return (
      <Wrapper>
      <NewOrderSection count={total >= 5 ? 5 : total } />
      <OrderTable
        columns={columns}
        items={processedOrders}
      />
      {total > 5 && <HollowButton className="btn-view-all" onClick={() => history.push('/orders/')}>
        VIEW ALL
      </HollowButton>}
    </Wrapper>  
    );
  }
}

const mapStateToProps = state => ({
  total: get(state, 'order.newOrders.total', 0),
  orders: refinedOrdersSelector(state, 'new'),
});

const mapDispatchToProps = {
  GetNewOrders
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewOrders));
