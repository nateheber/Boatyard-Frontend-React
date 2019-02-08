import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { CreateOrder } from 'store/actions/orders';
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
    const { customer, boat } = this.state;
    const data = {
      order: {
        childAccountId: customer.id,
        boatId: boat.id,
        ...orderValues,
        lineItemsAttributes: [
          {
            serviceId: service.id,
            quantity: 1
          }
        ],
        properties: {
          ...serviceValues
        }
      }
    };
    this.props.CreateOrder({
      data,
      success: (order) => {
        const { onFinishCreation } = this.props;
        this.closeServiceModal();
        if (onFinishCreation) onFinishCreation(get(order, 'id'));
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

const mapDispatchToProps = {
  CreateOrder,
}

export default connect(
  null,
  mapDispatchToProps,
  null,
  { withRef: true }
)(NewOrderModal);
