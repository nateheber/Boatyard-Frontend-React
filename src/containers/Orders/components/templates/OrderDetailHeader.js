import React from 'react';
import { connect } from 'react-redux';
import { Row } from 'react-flexbox-grid';
import { withRouter } from 'react-router-dom';
import { get } from 'lodash';
import styled from 'styled-components';
import { toastr } from 'react-redux-toastr';

import { FilterProviders } from 'store/actions/providers';
import { UpdateOrder, DeleteOrder, AcceptOrder } from 'store/actions/orders';
import { getCustomerName } from 'utils/order';

import { ActionDropdown } from 'components/basic/Dropdown';
import { OrangeButton, HollowButton } from 'components/basic/Buttons';
import { PageTitle } from 'components/basic/Typho';
import OrderStatus from './OrderStatus';


const SectionHeaderWrapper = styled.div`
  box-sizing: border-box;
  background-color: #fff;
  width: 100%;
  margin: 0;
`;

const LeftPart = styled.div`
  min-width: 370px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RightPart = styled.div`
  width: calc(100% - 370px);
  justify-content: flex-end;
  display: flex;
  align-items: center;
`;

class OrderDetailHeader extends React.Component {

  loadOptions = val => {
    return this.onChangeProviderFilter(val)
      .then((filtered) => {
        return filtered;
      },
      () => {
        return [];
      }
    )
  }

  onChangeProviderFilter = val => {
    return new Promise((resolve, reject) => {
      this.props.FilterProviders({
        params : {
          'provider[name]': val,
        },
        success: resolve,
        error: reject
      });
    })
  };

  onChangeProvider = val => {
    const { order } = this.props
    this.props.UpdateOrder({ order_id: order.id, data: { order: { provider_id: val.id } } })
  }

  acceptOrder = () => {
    const { order } = this.props;
    const orderId = get(order, 'id');
    this.props.AcceptOrder({
      orderId,
      success: () => {
        toastr.success('Success', 'Accepted successfully!');
        this.props.history.push('/orders/');
      },
      error: (e) => {
        toastr.error('Error', e.message);
      }
    });
  }

  declineOrder = () => {
    const { order } = this.props;
    const orderId = get(order, 'id');
    this.props.UpdateOrder({
      orderId,
      data: {
        order: {
          transition: 'disassociate'
        }
      },
      success: () => {
        toastr.success('Success', 'Declined successfully!');
        this.props.history.push('/orders/');
      },
      error: (e) => {
        toastr.error('Error', e.message);
      }
    });
  }

  cancelOrder = () => {
    const { order } = this.props;
    const orderId = get(order, 'id');
    this.props.UpdateOrder({
      orderId,
      data: {
        order: {
          transition: 'cancel'
        }
      },
      success: () => {
        toastr.success('Success', 'Canceled successfully!');
      },
      error: (e) => {
        toastr.error('Error', e.message);
      }
    });
  }

  deleteOrder = () => {
    const { order } = this.props;
    const orderId = get(order, 'id');
    this.props.DeleteOrder({
      orderId,
      success: () => {
        toastr.success('Success', 'Deleted successfully!');
        this.props.history.push('/orders/');
      },
      error: (e) => {
        toastr.error('Error', e.message);
      }
    });
  }

  getOrderStatus = () => {
    const { order } = this.props;
    const customerName = getCustomerName(order);
    let id = get(order, 'attributes.providerOrderSequence', null);
    if (!id) {
      id = get(order, 'id', 'Unknown');
    }
    const time = get(order, 'attributes.createdAt', new Date());
    const total = get(order, 'attributes.total');
    const scheduledAt = get(order, 'attributes.scheduledAt');
    const status = get(order, 'attributes.stateAlias');
    return ({
      id,
      time,
      customerName,
      total,
      scheduledAt,
      status,
    })
  }

  renderStatus = () => {
    const orderStatus = this.getOrderStatus();
    return (
      <OrderStatus {...orderStatus} />
    );
  }

  render() {
    const { order, privilege } = this.props;
    const orderStatus = get(order, 'attributes.state');
    const canAcceptOrder = privilege === 'provider' && (orderStatus === 'dispatched' || orderStatus === 'assigned');
    let orderId = get(order, 'attributes.providerOrderSequence', null);
    if (!orderId) {
      orderId = get(order, 'id');
    }
    return (
      <SectionHeaderWrapper>
        <Row style={{ width: '100%', padding: '0px 30px', alignItems: 'center' }}>
          <LeftPart>
            <PageTitle>Order #{orderId}</PageTitle>
            <ActionDropdown
              items={[
                {
                  title: 'Delete Order',
                  action: this.deleteOrder
                },
                {
                  title: 'Cancel Order',
                  action: this.cancelOrder,
                }
              ]}
            />
          </LeftPart>
          {canAcceptOrder && <RightPart>
            <OrangeButton onClick={this.acceptOrder}>Accept Order</OrangeButton>
            <HollowButton onClick={this.declineOrder}>Decline</HollowButton>
          </RightPart>}
        </Row>
        {
          this.renderStatus()
        }
      </SectionHeaderWrapper>
    )
  }
}

const mapStateToProps = state => ({ privilege: state.auth.privilege })

const mapDispatchToProps = {
  FilterProviders,
  UpdateOrder,
  DeleteOrder,
  AcceptOrder
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderDetailHeader));
