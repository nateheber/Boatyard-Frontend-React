import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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

  componentDidMount() {
    this.props.GetNewOrders({
      params: {
        page: 1,
        per_page: 5,
        'order[state]': 'draft',
        'order[sort]': 'desc',
        'order[order]': 'created_at'
      }
    });
  }

  render() {
    const { orders, total, history } = this.props;
    const columns = [
      { label: 'ORDER', value: 'id', isTitle: true, type: 'new', link: true },
      { label: 'CUSTOMER', value: 'relationships.user.attributes.firstName/relationships.user.attributes.lastName' },
      { label: 'SERVICE', value: 'relationships.service.attributes.name' },
      { label: 'BOAT NAME', value: 'relationships.boat.attributes.name' },
      { label: 'BOAT MAKE', value: 'relationships.boat.attributes.make' },
      { label: 'ORDER STATUS', value: 'status' }
    ];

    return (
      <Wrapper>
      <NewOrderSection count={total} />
      <OrderTable
        columns={columns}
        items={orders}
      />
      <HollowButton className="btn-view-all" onClick={() => history.push('/orders/')}>
        VIEW ALL
      </HollowButton>
    </Wrapper>  
    );
  }
}

const mapStateToProps = state => ({
  total: state.order.newOrders.total,
  orders: refinedOrdersSelector(state, 'new')
});

const mapDispatchToProps = {
  GetNewOrders
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewOrders));
