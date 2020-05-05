import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { GetNewOrders, SetDispatchedFlag } from 'store/actions/orders';
import { refinedOrdersSelector } from 'store/selectors/orders'
import { NeedAssignmentSection } from 'components/basic/SubSection';
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

class NeedAssignment extends React.Component {

  componentDidMount() {
    this.props.SetDispatchedFlag(false);
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
      {
        label: 'CUSTOMER',
        value: [
          'customerAttributes.name'
        ],
        isCustomer: true
      },
      { label: 'SERVICE', value: 'serviceAttributes.name' },
      { label: 'BOAT NAME', value: 'boatAttributes.name' },
      { label: 'BOAT MAKE', value: 'boatAttributes.make' },
      {
        label: 'City / State',
        value: 'boatAttributes.location[1]',
        combines: [', ']
      }
    ];

    return (
      <Wrapper>
      <NeedAssignmentSection count={total} />
      <OrderTable
        columns={columns}
        items={orders}
      />
      <HollowButton className="btn-view-all" onClick={() => history.push({ pathname: '/orders/', state: { tab: 'needAssignment' } })}>
        VIEW ALL
      </HollowButton>
    </Wrapper>  
    );
  }
}

const mapStateToProps = state => ({
  total: get(state, 'order.newOrders.total'),
  orders: refinedOrdersSelector(state, 'new')
});

const mapDispatchToProps = {
  GetNewOrders,
  SetDispatchedFlag
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
  )(NeedAssignment));
