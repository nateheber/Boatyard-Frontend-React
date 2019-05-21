import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import moment from 'moment';
import { toastr } from 'react-redux-toastr';

import { CreateOrder, UpdateOrder, AcceptOrder } from 'store/actions/orders';
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
      boat: -1,
      loading: false
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
    const { CreateOrder, UpdateOrder, AcceptOrder, onFinishCreation, privilege } = this.props;
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
    this.setState({ loading: true });
    if (whenValues.hasOwnProperty('when')) {
      const scheduleAttributes = {
        asap: null,
        flexible: null,
        complicated: null,
        specific_start: null,
        specific_stop: null
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
            let specific_stop = moment(day);
            if (slot === constants.WHEN_SLOT_MORNING) {
              specific_start = specific_start.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
              specific_stop = specific_stop.set({ hour: 12, minute: 0, second: 0, millisecond: 0 });
            } else {
              specific_start = specific_start.set({ hour: 12, minute: 0,second: 0, millisecond: 0 });
              specific_stop = specific_stop.set({ hour: 23, minute: 59, second: 59, millisecond: 999 });
            }
            scheduleAttributes['specific_start'] = specific_start.format('YYYY-MM-DD HH:mm:ssZ');
            scheduleAttributes['specific_stop'] = specific_stop.format('YYYY-MM-DD HH:mm:ssZ');
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
            if (privilege === 'admin') {
              this.setState({ loading: false });
              this.closeServiceModal();
              if (onFinishCreation) onFinishCreation(get(order, 'id'));
            } else {
              AcceptOrder({
                orderId: order.id,
                success: () => {
                  this.setState({ loading: false });
                  this.closeServiceModal();
                  if (onFinishCreation) onFinishCreation(get(order, 'id'));
                },
                error: (e) => {
                  this.setState({ loading: false });
                  toastr.error('Error', e.message);
                }
              });
            }
          },
          error: (e) => {
            this.setState({ loading: false });
            toastr.error('Error', e.message);
          }
        });
      },
      error: (e) => {
        this.setState({ loading: false });
        toastr.error('Error', e.message);
      }
    });
  };

  render() {
    const { showCustomerModal, showServiceModal, boat, loading } = this.state;
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
            loading={loading}
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
  UpdateOrder,
  AcceptOrder
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(NewOrderModal);
