import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';


import { fetchOrders } from 'reducers/orders';
import { NewOrderSection } from 'components/basic/SubSection';
import { OrderTable } from 'components/basic/Order';
import { refinedOrdersSelector } from 'reducers/selector/order'

const Wrapper = styled.div`
  background-color: #fff;
  margin: 15px;
`;

class NewOrders extends React.Component {

  componentDidMount() {
    this.props.fetchOrders({page: 1, per_page: 5, 'order[state]': 'draft'});
  }

  render() {
    const { orders, total } = this.props;
    const columns = [
      { label: 'ORDER', value: 'id', isTitle: true, link: true },
      { label: 'CUSTOMER', value: 'relationships.user.attributes.firstName/relationships.user.attributes.lastName' },
      { label: 'ORDER STATUS', value: 'status' },
      { label: 'BOAT MAKE', value: 'relationships.boat.attributes.make' },
      { label: 'BOAT MODEL', value: 'relationships.boat.attributes.model' },
      { label: 'BOAT NAME', value: 'relationships.boat.attributes.name' }
    ];

    return (
      <Wrapper>
      <NewOrderSection count={total} />
      <OrderTable
        columns={columns}
        items={orders}
      />
    </Wrapper>  
    );
  }
}

const mapStateToProps = state => ({
  total: state.order.total,
  orders: refinedOrdersSelector(state)
});

const mapDispatchToProps = {
  fetchOrders
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewOrders);
