import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { findIndex, isEmpty, get } from 'lodash';
import styled from 'styled-components';

import {
  actionTypes as customerActions,
  FilterChildAccounts,
  CreateChildAccount
} from 'store/actions/child-accounts';
import { actionTypes as boatActions, GetBoats, CreateBoat } from 'store/actions/boats';
import { refinedBoatsSelector } from 'store/selectors/boats';
import Modal from 'components/compound/Modal';
import { OrangeButton, HollowButton } from 'components/basic/Buttons';
import { Select } from 'components/basic/Input';
import CustomerOption from 'components/basic/CustomerOption';
import CustomerOptionValue from 'components/basic/CustomerOptionValue';
import BoatInfo from './BoatInfo';
import CustomerModal from 'components/template/CustomerInfoSection/CustomerModal';
import BoatModal from 'components/template/BoatInfoSection/BoatModal';
import { BoatyardSelect } from 'components/basic/Dropdown';


const SubSectionTitle = styled.h5`
  text-transform: uppercase;
  color: #07384b;
  font-size: 12px;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif !important;
  margin-top: 35px;
  margin-bottom: 10px;
`;

class SelectCustomerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: {},
      boat: {},
      refinedBoats: [],
      refinedBoat: {},
      visibleOfCustomerModal: false,
      visibleOfBoatModal: false
    };
  }

  setCustomerSelectRef = (ref) => {
    this.customerSelect = ref;
  };

  loadOptions = val => {
    return this.onChangeUserFilter(val)
      .then((filtered) => {
        return filtered;
      }, () => {
        return [];
      });
  };

  onChangeUserFilter = val => {
    return new Promise((resolve, reject) => {
      this.props.FilterChildAccounts({
        params: {
          'search_by_full_name': val
        },
        success: resolve,
        error: reject
      });
    });
  };

  onChangeUser = user => {
    this.setState({
      customer: user,
      boat: {},
      refinedBoat: {},
      refinedBoats: []
    }, () => {
      this.props.GetBoats({
        params: { 'boat[child_account_id]': user.id },
        success: () => {
          const { boats } = this.props;
          if (!isEmpty(boats)) {
            let index = findIndex(boats, boat => boat.isDefault === true);
            if (index < 0) {
              index = 0;
            }
            this.setState({
              boat: boats[index]
            }, () => {
              this.getRefinedBoats();
            });
          }
        }
      });  
    });
  };

  moveToChooseService = () => {
    const { customer, boat } = this.state;
    this.props.toNext({ customer, boat });
  };

  getRefinedBoats = () => {
    const { boats } = this.props;
    const { customer, boat } = this.state;
    let refinedBoats = [];
    if (!isEmpty(customer)) {
      refinedBoats = boats.map((boat) => ({
        label: boat.name,
        value: boat.id
      }));
    }
    this.setState({
      refinedBoats
    }, () => {
      this.getRefinedBoat(boat);
    });
  };

  handleBoatChange = (selectRef) => {
    const { boats } = this.props;
    const { refinedBoats } = this.state;
    if (selectRef.selectedIndex) {
      const refinedBoat = get(refinedBoats, selectRef.selectedIndex);
      if (!isEmpty(boats) && !isEmpty(refinedBoat)) {
        let index = findIndex(boats, item => item.id === refinedBoat.value);
        if (index < 0) {
          index = 0;
        }
        this.setState({
          refinedBoat,
          boat: boats[index]
        });
      }
    }
  };

  getRefinedBoat = (boat) => {
    const { refinedBoats } = this.state;
    let index = findIndex(refinedBoats, item => item.value === boat.id);
    if (index < 0) {
      index = 0;
    }
    this.setState({
      refinedBoat: refinedBoats[index]
    });
  };

  showCustomerModal = () => {
    this.setState({
      visibleOfCustomerModal: true
    });
  };

  hideCustomerModal = () => {
    this.setState({
      visibleOfCustomerModal: false
    });
  };

  showBoatModal = () => {
    this.setState({
      visibleOfBoatModal: true
    });
  };

  hideBoatModal = () => {
    this.setState({
      visibleOfBoatModal: false
    });
  };

  onCreateCustomer = (data) => {
    const { CreateChildAccount } = this.props;
    CreateChildAccount({
      data: { child_account: { ...data.user } },
      success: (user) => {
        this.hideCustomerModal();
        const newUser = {
          id: user.id,
          type: user.type,
          ...user.attributes
        };
        this.customerSelect.setState({
          defaultOptions: [newUser]
        });
        this.onChangeUser(newUser);    
      }
    });
  }

  onCreateBoat = (data) => {
    const { CreateBoat } = this.props;
    const { customer } = this.state;
    CreateBoat({
      data: {
        boat: {
          child_account_id: customer.id,
          ...data.boat,
        }
      },
      success: (newBoat) => {
        const { customer } = this.state;
        this.hideBoatModal();
        this.setState({
          boat: {},
          refinedBoat: {},
          refinedBoats: []
        }, () => {
          this.props.GetBoats({
            params: { 'boat[child_account_id]': customer.id },
            success: () => {
              const { boats } = this.props;
              if (!isEmpty(boats)) {
                let index = findIndex(boats, boat => boat.id === newBoat.id);
                if (index < 0) {
                  index = 0;
                }
                this.setState({
                  boat: boats[index]
                }, () => {
                  this.getRefinedBoats();
                });
              }
            }
          });  
        });
      }
    })
  };

  render() {
    const { open, onClose, currentCustomerStatus, currentBoatStatus } = this.props;
    const {
      customer, boat, refinedBoats, refinedBoat,
      visibleOfCustomerModal, visibleOfBoatModal
    } = this.state;
    const actionButtons = [
      <OrangeButton
        key="modal_action_button"
        onClick={this.moveToChooseService}
        disabled={isEmpty(customer) || isEmpty(boat)}
      >Next</OrangeButton>
    ];
    return (
      <Modal
        title="Create Order"
        minHeight={265}
        actions={actionButtons}
        open={open}
        onClose={onClose}
      >
        <Row>
          <Col sm={12}><SubSectionTitle style={{ marginTop: 0 }}>SELECT A CUSTOMER</SubSectionTitle></Col>
        </Row>
        <Row style={{ alignItems: 'center'}}>
          <Col sm={12} md={8} lg={7}>
            <BoatyardSelect
              ref={this.setCustomerSelectRef}
              components={{
                Option: CustomerOption,
                SingleValue: CustomerOptionValue
              }}
              defaultOptions
              loadOptions={this.loadOptions}
              onChange={this.onChangeUser}
              value={customer}
            />
          </Col>
          <Col sm={12} md={4} lg={3} lgOffset={2}>
            <HollowButton onClick={this.showCustomerModal}>Add New</HollowButton>
          </Col>
        </Row>
        {!isEmpty(customer) && 
          <React.Fragment>
            <Row>
              <Col sm={12}><SubSectionTitle>SELECT A BOAT</SubSectionTitle></Col>
            </Row>
            <Row style={{ marginBottom: 5, alignItems: 'center' }}>
              <Col sm={12} md={8} lg={7}>
                <Select
                  value={refinedBoat.value}
                  onChange={event => this.handleBoatChange(event.target)}
                >
                  <React.Fragment>
                    {refinedBoats.map(item => (
                      <option value={item.value} key={`boat_${item.value},`}>
                        {item.label}
                      </option>
                    ))}
                  </React.Fragment>
                </Select>
              </Col>
              <Col sm={12} md={4} lg={3} lgOffset={2}>
                <HollowButton style={{ marginTop: 0 }} onClick={this.showBoatModal}>Add New</HollowButton>
              </Col>
            </Row>
            {!isEmpty(boat) &&
              <Row>
                <Col sm={12} md={8}>
                  <BoatInfo boatInfo={boat} />
                </Col>
              </Row>
            }
          </React.Fragment>
        }
        <CustomerModal
          open={visibleOfCustomerModal}
          loading={currentCustomerStatus === customerActions.CREATE_CHILD_ACCOUNT}
          onClose={this.hideCustomerModal}
          onSave={this.onCreateCustomer}
        />
        {!isEmpty(customer) && <BoatModal
          open={visibleOfBoatModal}
          loading={currentBoatStatus === boatActions.CREATE_BOAT}
          user={customer}
          onClose={this.hideBoatModal}
          onSave={this.onCreateBoat}
        />}
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  currentCustomerStatus: state.childAccount.currentStatus,
  currentBoatStatus: state.boat.currentStatus,
  boats: refinedBoatsSelector(state)
});

const mapDispatchToProps = {
  FilterChildAccounts,
  CreateChildAccount,
  GetBoats,
  CreateBoat
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectCustomerModal);
