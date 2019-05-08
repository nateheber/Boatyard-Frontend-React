import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import moment from 'moment';

import { CreateOrder, UpdateOrder } from 'store/actions/orders';
import SelectCustomerModal from './SelectCustomerModal';
import SelectServiceModal from './SelectServiceModal';
import * as constants from 'utils/constants';

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

  createNewOrder = (service, whenValues = {}, serviceValues = {}, orderValues = {}) => {
    console.log('----------3--------');
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
    console.log('----------4--------');
    if (whenValues.hasOwnProperty('when')) {
      const scheduleAttributes = {
        asap: null,
        flexible: null,
        complicated: null,
        specific_start: null,
        specific_end: null
      };
  
      switch (whenValues['when']) {
        case constants.WHEN_FLEXIBLE_OPTION: {
          scheduleAttributes['flexible'] = true;
          break;
        }
        case constants.WHEN_ASAP_OPTION: {
          scheduleAttributes['asap'] = true;
          break;
        }
        case constants.WHEN_SPEICFIC_DATE_OPTION: {
          if (whenValues.hasOwnProperty('day') && whenValues.hasOwnProperty('slot')) {
            const day = whenValues['day'];
            const slot = whenValues['slot'];
            let specific_start = moment(day);
            let specific_end = moment(day);
            if (slot === constants.WHEN_SLOT_MORNING) {
              specific_start = specific_start.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
              specific_end = specific_end.set({ hour: 12, minute: 0, second: 0, millisecond: 0 });
            } else {
              specific_start = specific_start.set({ hour: 12, minute: 0,second: 0, millisecond: 0 });
              specific_end = specific_end.set({ hour: 23, minute: 59, second: 59, millisecond: 999 });
            }
            scheduleAttributes['specific_start'] = specific_start.format('YYYY-MM-DD HH:mm:ssZ');
            scheduleAttributes['specific_end'] = specific_end.format('YYYY-MM-DD HH:mm:ssZ');
          }
          break;
        }
        case constants.WHEN_COMPLICATED_OPTION: {
          scheduleAttributes['complicated'] = true;
          break;
        }
        default:
          break;
      }
      orderData['line_items_attributes'][0]['line_item_schedules_attributes'] = [scheduleAttributes];
    }
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
