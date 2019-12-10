import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { toastr } from 'react-redux-toastr';
import { findIndex, isEmpty, get, filter } from 'lodash';
import styled from 'styled-components';
import debounce from "debounce-promise";
import {
  actionTypes as customerActions,
  FilterChildAccounts,
  CreateChildAccount
} from 'store/actions/child-accounts';
import { FilterUsers } from 'store/actions/users';
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
import AsyncSelect from 'react-select/lib/Async';


const SubSectionTitle = styled.h5`
  text-transform: uppercase;
  color: #07384b;
  font-size: 12px;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif !important;
  margin-top: 35px;
  margin-bottom: 5px;
`;

export const colourStyles = {
  option: (provided, state) => ({
    ...provided,
    width: '600px',
    display: 'fixed',
  }),
  control: styles => ({
    ...styles,
    backgroundColor: 'white',
    fontSize: 14,
    fontFamily: 'Montserrat',
    paddingLeft: 5,
    // fontWeight: 400,
    // letterSpacing: -0.3,
    minHeight: 28,
    border: '1px solid #dfdfdf'
  }),
  input: styles => ({
    ...styles,
    fontSize: 14,
    fontFamily: 'Montserrat',
    color: '#555',
    paddingTop: 1,
    paddingBottom: 1
  }),
  loadingMessage: styles => ({
    ...styles,
    fontSize: 14,
    fontFamily: 'Montserrat',
    color: '#555'
  }),
  dropdownIndicator: styles => ({
    ...styles,
    display: 'none'
  }),
  indicatorSeparator: styles => ({
    ...styles,
    display: 'none'
  }),
  clearIndicator: styles => ({
    ...styles,
    display: 'none'
  }),
  placeholder: styles => ({ ...styles }),
};

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
    const { privilege, FilterChildAccounts, FilterUsers } = this.props;
    return new Promise((resolve, reject) => {
      if (privilege === 'admin') {
        const params = isEmpty(val) ? {
          'user[sort]': 'asc',
          'user[order]': 'last_name'
        } : {
          'search_by_full_name': val,
          'user[sort]': 'asc',
          'user[order]': 'last_name'
        };
          FilterUsers({
          params,
          success: resolve,
          error: reject
        });
      } else {
        const params = isEmpty(val) ? {
          'child_account[sort]': 'asc',
          'child_account[order]': 'last_name'
        } : {
          'search_by_full_name': val,
          'child_account[sort]': 'asc',
          'child_account[order]': 'last_name'
        };
          FilterChildAccounts({
          params,
          success: resolve,
          error: reject
        });
      }
    });
  };

  onChangeUser = user => {
    const { privilege } = this.props;
    this.setState({
      customer: user,
      boat: {},
      refinedBoat: {},
      refinedBoats: []
    }, () => {
      if (user && !isEmpty(user)) {
        const params = privilege === 'admin' ?
        { 'boat[user_id]': user.id } :
        { 'boat[child_account_id]': user.id };
  
        this.props.GetBoats({
          params,
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
      }
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
    if (selectRef.selectedIndex >= 0) {
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

  onCreateCustomer = ({user, externalBoats}) => {
    const { privilege, CreateChildAccount, CreateBoat } = this.props;
    const child_account = user;
    if (privilege === 'admin') {
      child_account['provider_id'] = 1;
    }
    CreateChildAccount({
      data: child_account,
      success: (user) => {
        let promises = [];

        if (externalBoats.length > 0) {
          promises = filter(externalBoats, b => b.boatName || b.brand).map(boatData => {
            const data = {
              name: boatData.boatName || boatData.brand,
              child_account_id: user.id,
              make: boatData.brand,
              model: boatData.model,
              year: boatData.year,
              length: boatData.length,
              // location_attributes: {
              //   locatable_type: 'ChildAccount',
              //   locatable_id: user.id,
              //   location_type: 'private_dock',
              //   // address_attributes: {
              //   //   street: 'marinemax stree',
              //   //   city: 'marinemax city',
              //   //   state: 'marinemax state',
              //   //   zip: '00000'
              //   // }
              // }
            };

            return new Promise((resolve, reject) => CreateBoat({data, success: resolve, error: reject}));
          })
        }
        Promise.all(promises).finally(() => {
          this.hideCustomerModal();
          const newUser = {
            id: privilege === 'admin' ? get(user, 'relationships.user.data.id') : user.id,
            type: privilege === 'admin' ? get(user, 'relationships.user.data.type') : user.type,
            ...user.attributes
          };
          this.customerSelect.setState({
            defaultOptions: [newUser]
          });
          this.onChangeUser(newUser);   
          this.refreshBoats(newUser, {}); 
        })
        
      },
      error: (err) => {
        toastr.error(err.message);
      }
    });
  }

  onCreateBoat = (data) => {
    const { privilege, CreateBoat } = this.props;
    const { customer } = this.state;
    const boat = privilege === 'admin' ? {
        user_id: customer.id,
        ...data.boat,
      } : {
        child_account_id: customer.id,
        ...data.boat,
      };
    CreateBoat({
      data: { boat },
      success: (newBoat) => {
        this.hideBoatModal();
        this.setState({
          boat: {},
          refinedBoat: {},
          refinedBoats: []
        }, () => {
          this.refreshBoats(this.state.customer, newBoat); 
        });
      }
    })
  };

  refreshBoats = (customer, newBoat) => {
    const { privilege } = this.props;
    const params = privilege === 'admin' ?
      { 'boat[user_id]': customer.id } :
      { 'boat[child_account_id]': customer.id };
    this.props.GetBoats({
      params: params,
      success: () => {
        const { boats } = this.props;
        if (!isEmpty(boats)) {
          let index = findIndex(boats, boat => boat.id === newBoat.id);
          if (!index || index < 0) {
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
  }

  render() {
    const { open, onClose, currentCustomerStatus, currentBoatStatus, showAdditionalFields } = this.props;
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
        <Row style={{alignItems: 'center', marginBottom: '10px'}}>
          <Col sm={12}><SubSectionTitle style={{ marginTop: 0 }}>SELECT A CUSTOMER</SubSectionTitle></Col>
        </Row>
        <Row style={{alignItems: 'center'}}>
          <Col sm={12} md={9} lg={8}>
            <AsyncSelect
              ref={this.setCustomerSelectRef}
              components={{
                Option: CustomerOption,
                SingleValue: CustomerOptionValue
              }}
              isClearable
              defaultOptions
              loadOptions={debounce(this.loadOptions, 1000, {leading: true})}
              onChange={this.onChangeUser}
              value={customer}
              styles={colourStyles}
              showAdditionalFields={showAdditionalFields}
              noOptionsMessage={()=>"No Result"}
            />
          </Col>
          <Col sm={12} md={3} lg={4}>
            <HollowButton onClick={this.showCustomerModal}>Add New</HollowButton>
          </Col>
        </Row>
        {!isEmpty(customer) && 
          <React.Fragment>
            <Row>
              <Col sm={12}><SubSectionTitle>SELECT A BOAT</SubSectionTitle></Col>
            </Row>
            <Row style={{ marginBottom: 5, alignItems: 'center' }}>
              <Col sm={12} md={9} lg={8}>
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
              <Col sm={12} md={3} lg={4}>
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
          showAdditionalFields={showAdditionalFields}
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
  boats: refinedBoatsSelector(state),
  privilege: state.auth.privilege,
  // showAdditionalFields: state.auth.providerName === 'MarineMax',
  showAdditionalFields: state.auth.providerId === 2
});

const mapDispatchToProps = {
  FilterChildAccounts,
  CreateChildAccount,
  GetBoats,
  CreateBoat,
  FilterUsers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectCustomerModal);
