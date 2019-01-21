import React from 'react';
import { connect } from 'react-redux';

import { CreateOrder } from 'store/actions/orders';

import SelectCustomerModal from '../modals/SelectCustomerModal';
import SelectServiceModal from '../modals/SelectServiceModal';

class OrderCreation extends React.Component {
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
    console.log(boat);
    const data = {
      userId: customer,
      boatId: boat,
      lineItemsAttributes: [
        {
          serviceId: service,
          quantity: 1,
        }
      ]
    };
    this.props.CreateOrder({
      data,
      callback: this.props.onFinishCreation
    })
  }
  render() {
    const { showCustomerModal, showServiceModal } = this.state;
    return (
      <React.Fragment>
        <SelectCustomerModal open={showCustomerModal} onClose={this.closeCustomerModal} toNext={this.toSelectService} />
        <SelectServiceModal open={showServiceModal} onClose={this.closeServiceModal} toNext={this.createNewOrder} />
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
)(OrderCreation);
