import React from 'react';
import { connect } from 'react-redux';
import { Row } from 'react-flexbox-grid';
import { withRouter } from 'react-router-dom';
import { get } from 'lodash';
import styled from 'styled-components';
import { toastr } from 'react-redux-toastr';

import { FilterProviders } from 'store/actions/providers';
import { UpdateOrder, DeleteOrder, AcceptOrder } from 'store/actions/orders';
import { /*GetConversations,*/ SetMessageBarUIStatus } from 'store/actions/conversations';
import { getCustomerName } from 'utils/order';

import Modal from 'components/compound/Modal';
import MessageBar from '../../../../components/template/MessageBar';
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
  // min-width: 370px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RightPart = styled.div`
  // width: calc(100% - 370px);
  justify-content: flex-end;
  display: flex;
  align-items: center;
`;

class OrderDetailHeader extends React.Component {
  state = {
    visibleofDeleteModal: false,
  }

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
      },
      error: (e) => {
        console.log("acceptOrder");
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
          transition: get(order, 'attributes.state') === 'dispatched' ? 'disassociate' : 'reject'
        }
      },
      success: () => {
        toastr.success('Success', 'Order Declined successfully!');
        this.props.history.push('/orders/');
      },
      error: (e) => {
        console.log("declineOrder");
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
        console.log("cancelOrder");
        toastr.error('Error', e.message);
      }
    });
  }

  reopenOrder = () => {
    const { order } = this.props;
    const orderId = get(order, 'id');
    this.props.UpdateOrder({
      orderId,
      data: {
        order: {
          transition: 'reopen'
        }
      },
      success: () => {
        toastr.success('Success', 'Order reopened successfully!');
      },
      error: (e) => {
        console.log(this.reopenOrder);
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
        console.log("deleteOrder");
        toastr.error('Error', e.message);
      }
    });
  }

  canCompleteOrder = () => {
    const { order } = this.props;
    const orderState = get(order, 'attributes.state');
    return orderState === 'accepted' ||
      orderState === 'provisioned' ||
      orderState === 'scheduled' ||
      orderState === 'started' ||
      orderState === 'invoiced';
  };

  completeOrder = () => {
    const { order } = this.props;
    const orderId = get(order, 'id');
    this.props.UpdateOrder({
      orderId,
      data: {
        order: {
          transition: 'complete'
        }
      },
      success: () => {
        toastr.success('Success', 'Completed successfully!');
      },
      error: (e) => {
        console.log(this.completeOrder);
        toastr.error('Error', e.message);
      }
    });
  }

  messageCustomer = () => {
    const { showMessage, SetMessageBarUIStatus, order } = this.props;
    const customer = get(order, 'relationships.user');
    SetMessageBarUIStatus({opened: !showMessage, newMessage: true, user: customer});
  }

  getOrderStatus = () => {
    const { privilege, order } = this.props;
    const customerName = getCustomerName(order, privilege);
    let id = get(order, 'attributes.providerOrderSequence', null);
    if (!id) {
      id = get(order, 'id', 'Unknown');
    }
    const time = get(order, 'attributes.createdAt', new Date());
    const total = get(order, 'attributes.total');
    const scheduledAt = get(order, 'attributes.scheduledAt');
    const status = get(order, 'attributes.state');
    const stateAlias = get(order, 'attributes.stateAlias');
    return ({
      id,
      time,
      customerName,
      total,
      scheduledAt,
      status,
      stateAlias
    })
  }

  renderStatus = () => {
    const orderStatus = this.getOrderStatus();
    return (
      <OrderStatus {...orderStatus} />
    );
  }

  render() {
    const { order, privilege, showMessage } = this.props;
    const { visibleofDeleteModal } = this.state;
    const orderStatus = get(order, 'attributes.state');
    const canAcceptOrder = privilege === 'provider' && (orderStatus === 'dispatched' || orderStatus === 'assigned');
    let orderId = get(order, 'attributes.providerOrderSequence', null);
    if (!orderId) {
      orderId = get(order, 'id');
    }
    const items = [
      {
        title: 'Delete Order',
        action: () => this.setState({visibleofDeleteModal: true})
      },
      {
        title: 'Cancel Order',
        action: this.cancelOrder
      }
    ];
    if (this.canCompleteOrder()) {
      items.push({
        title: 'Mark as Complete',
        action: this.completeOrder
      });
    }
    if (orderStatus === 'completed') {
      items.push({
        title: 'Reopen Order',
        action: this.reopenOrder
      });
    }
    if (orderStatus === 'accepted') {
      items.push({
        title: 'Message Customer',
        action: this.messageCustomer
      });
    }

    const actions = [
      <HollowButton onClick={() => this.setState({visibleofDeleteModal: false})} key="modal_btn_cancel">Cancel</HollowButton>,
      <OrangeButton onClick={this.deleteOrder} key="modal_btn_save">Confirm</OrangeButton>
    ];

    return (
      <SectionHeaderWrapper>
        <Row style={{ width: '100%', padding: '0px 30px', alignItems: 'center', justifyContent: 'space-between' }}>
          <LeftPart>
            <PageTitle>Order #{orderId}</PageTitle>
            <ActionDropdown
              items={items}
              title='ACTION'
            />
          </LeftPart>
          {canAcceptOrder && <RightPart>
            <OrangeButton onClick={this.acceptOrder}>Accept Order</OrangeButton>
            <HollowButton onClick={this.declineOrder}>Decline Order</HollowButton>
          </RightPart>}
        </Row>
        {
          this.renderStatus()
        }
        <Modal
          title={'Are you sure?'}
          actions={actions}
          normal={true}
          open={visibleofDeleteModal}
          onClose={() => {this.setState({visibleofDeleteModal: false})}}
        >
          <div>Are you sure you want to delete this order?</div>
        </Modal>
      </SectionHeaderWrapper>
    )
  }
}

const mapStateToProps = state => ({ 
  privilege: state.auth.privilege,
  showMessage: state.conversation.ui.opened 
})

const mapDispatchToProps = {
  FilterProviders,
  UpdateOrder,
  DeleteOrder,
  AcceptOrder,
  SetMessageBarUIStatus
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderDetailHeader));
