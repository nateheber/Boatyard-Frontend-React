import React from 'react';
import { connect } from 'react-redux';

import { CreateOrder } from 'store/actions/orders';

import SelectCustomerModal from './SelectCustomerModal';
import SelectServiceModal from './SelectServiceModal';

class NewOrderModal extends React.Component {
  state = {
    showCustomerModal: false,
    showServiceModal: false,
    customer: -1,
    boat: -1
  }
  createOrder = () => {
    this.setState({
      customer: {},
      boat: {},
      showCustomerModal: true,
      showServiceModal: false,
    })
  }
  toSelectService = ({ customer, boat }) => {
    this.setState({
      customer,
      boat,
      showCustomerModal: false,
      showServiceModal: true,
    });
  }
  closeCustomerModal = () => {
    this.setState({
      showCustomerModal: false,
    })
  }
  closeServiceModal = () => {
    this.setState({
      showServiceModal: false,
    })
  }
  createNewOrder = (service) => {
    const { customer, boat } = this.state;
    console.log('------Collected Data------', customer, boat, service);
    const data = {
      order: {
        childAccountId: customer.id,
        boatId: boat.id,
        lineItemsAttributes: [
          {
            serviceId: service.id,
            quantity: 1
          }
        ]
      }
    };
    this.props.CreateOrder({
      data,
      success: this.props.onFinishCreation
    });
  }
  render() {
    const { showCustomerModal, showServiceModal } = this.state;
    return (
      <React.Fragment>
        {showCustomerModal &&
          <SelectCustomerModal open={showCustomerModal} onClose={this.closeCustomerModal} toNext={this.toSelectService} />
        }
        {showServiceModal &&
          <SelectServiceModal open={showServiceModal} onClose={this.closeServiceModal} toNext={this.createNewOrder} />
        }
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  CreateOrder,
}

export default connect(
  null,
  mapDispatchToProps,
  null,
  { withRef: true }
)(NewOrderModal);
