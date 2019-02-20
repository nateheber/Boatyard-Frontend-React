import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { CreateOrder, UpdateOrder } from 'store/actions/orders';
import SelectCustomerModal from './SelectCustomerModal';
import SelectServiceModal from './SelectServiceModal';

class NewOrderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCustomerModal: false,
      showServiceModal: false,
      customer: -1,
      boat: -1
    };
  
  }

  createOrder = () => {
    this.setState({
      customer: {},
      boat: {},
      showCustomerModal: true,
      showServiceModal: false,
    })
  };

  toSelectService = ({ customer, boat }) => {
    this.setState({
      customer,
      boat,
      showCustomerModal: false,
      showServiceModal: true,
    });
  };

  closeCustomerModal = () => {
    this.setState({
      showCustomerModal: false,
    })
  };

  closeServiceModal = () => {
    this.setState({
      showServiceModal: false,
    })
  };

  createNewOrder = (service, serviceValues = {}, orderValues = {}) => {
    const { CreateOrder, UpdateOrder, onFinishCreation, privilege } = this.props;
    const { customer, boat } = this.state;
    const orderData = {
      boat_id: boat.id,
      ...orderValues,
      line_items_attributes: [
        {
          service_id: service.id,
          quantity: 1
        }
      ],
      // properties: {
      //   ...serviceValues
      // }
    };
    if (privilege === 'admin') {
      orderData['user_id'] = customer.id;
    } else {
      orderData['child_account_id'] = customer.id;
    }
    CreateOrder({
      data: { order: orderData },
      success: (order) => {
        UpdateOrder({
          orderId: order.id,
          data: {
            order: {
              id: order.id,
              properties: {
                ...serviceValues
              }
            }
          },
          success: () => {
            this.closeServiceModal();
            if (onFinishCreation) onFinishCreation(get(order, 'id'));
          }
        });
      }
    });
  };

  render() {
    const { showCustomerModal, showServiceModal, boat } = this.state;
    return (
      <React.Fragment>
        {showCustomerModal &&
          <SelectCustomerModal
            open={showCustomerModal}
            onClose={this.closeCustomerModal}
            toNext={this.toSelectService}
          />
        }
        {showServiceModal &&
          <SelectServiceModal
            open={showServiceModal}
            boat={boat}
            onClose={this.closeServiceModal}
            toNext={this.createNewOrder}
          />
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  privilege: state.auth.privilege
});

const mapDispatchToProps = {
  CreateOrder,
  UpdateOrder
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(NewOrderModal);
