import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { Row, Col } from 'react-flexbox-grid';
import { get, isEmpty, sortBy } from 'lodash';
import styled from 'styled-components';
import { toastr } from 'react-redux-toastr';

import { actionTypes as userActions, GetUser, UpdateUser } from 'store/actions/users';
import { actionTypes as customerActions, GetChildAccounts } from 'store/actions/child-accounts';
import { actionTypes as orderActions, GetOrders } from 'store/actions/orders';
import {
  actionTypes as providerActions,
  GetPreferredProviders,
  AddPreferredProvider,
  DeletePreferredProvider
} from 'store/actions/providers';
import { actionTypes as boatActions, GetBoats, CreateBoat } from 'store/actions/boats';
import { actionTypes as paymentActions, GetCreditCards } from 'store/actions/credit-cards';
import { SearchProviderLocations } from 'store/actions/providerLocations';
import { refinedOrdersSelector } from 'store/selectors/orders';
import { refinedPreferredProvidersSelector } from 'store/selectors/providers';
import { simpleProviderLocationSelector } from 'store/selectors/providerLocation';

import { HollowButton, OrangeButton } from 'components/basic/Buttons';
import { Section, SectionGroup } from 'components/basic/InfoSection';
import Table from 'components/basic/Table';
import CustomerInfoSection from 'components/template/CustomerInfoSection';
import BoatInfoSection from 'components/template/BoatInfoSection';
import CreditCardSection from 'components/template/CreditCardSection';
import {
  CustomersSection,
  UserDetailsHeader,
  PreferredProvidersSection,
  ProviderOption,
  ProviderOptionValue
} from '../components';
import Modal from 'components/compound/Modal';
import BoatModal from 'components/template/BoatInfoSection/BoatModal';
import LoadingSpinner from 'components/basic/LoadingSpinner';
import { NormalText } from 'components/basic/Typho'
import AsyncSelect from 'react-select/lib/Async';

const colourStyles = {
  control: styles => ({
    ...styles,
    backgroundColor: 'white',
    fontSize: 14,
    fontFamily: 'Source Sans Pro, sans-serif',
    fontWeight: 400,
    letterSpacing: -0.3,
    minHeight: 28,
    border: '1px solid #dfdfdf'
  }),
  input: styles => ({
    ...styles,
    fontFamily: 'Source Sans Pro, sans-serif',
    fontSize: 14,
    color: '#555',
    paddingTop: 1,
    paddingBottom: 1
  }),
  loadingMessage: styles => ({
    ...styles,
    fontFamily: 'Source Sans Pro, sans-serif',
    fontSize: 14,
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

export const Label = styled(NormalText)`
  font-family: 'Open sans-serif', sans-serif;
  padding: 10px 0;
`;

const PageContent = styled.div`
  padding: 30px 25px;
`;

const ActionSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 25px 15px;
`;

class UserDetails extends React.Component {
  constructor(props) {
    super(props);
    const query = queryString.parse(this.props.location.search);
    const userId = query.user;
    this.state = {
      userId,
      currentUser: null,
      isFirstLoadUser: true,
      isFirstLoadOrders: true,
      isFirstLoadCustomers: true,
      isFirstLoadPreferredProviders: true,
      isFirstLoadBoats: true,
      isFirstLoadPayments: true,
      visibleOfBoatModal: false,
      visibleofDeleteModal: false,
      selectedProvider: {},
      keyword: ''
    };
    const { GetUser, GetOrders, GetBoats, GetCreditCards, GetPreferredProviders } = this.props;
    GetUser({
      userId: userId,
      success: (currentUser) => {
        this.setState({ isFirstLoadUser: false, currentUser });
      }
    });
    GetOrders({
      params: { 'order[user_id]': userId, page: 1, per_page: 10 },
      success: () => {
        this.setState({ isFirstLoadOrders: false });
      }
    });
    // GetChildAccounts({
    //   params: { 'child_account[user_id]': userId, per_page: 1000 },
    //   success: () => {
    //     this.setState({ isFirstLoadCustomers: false });
    //   }
    // });
    GetPreferredProviders({
      params: { 'preferred_provider[user_id]': userId, per_page: 1000, provider_location: true, 'preferred_provider[order]': 'id', 'order[sort]': 'asc' },
      success: () => {
        this.setState({ isFirstLoadPreferredProviders: false });
      }
    });
    GetBoats({
      params: { 'boat[user_id]': userId },
      success: () => {
        this.setState({ isFirstLoadBoats: false });
      }
    });
    GetCreditCards({
      params: { 'credit_card[user_id]': userId },
      success: () => {
        this.setState({ isFirstLoadPayments: false });
      }
    });
    SearchProviderLocations({
      params: {
        search: '',
        page: 1,
        per_page: 1000
      }
    });
  };

  setProviderSelectRef = (ref) => {
    this.providerSelect = ref;
  };

  changePage = (page) => {
    const { userId } = this.state;
    this.props.GetOrders({ params: { 'order[user_id]': userId, page: page, per_page: 10 } });
  };

  getPageCount = () => {
    const { perPage, total } = this.props;
    return Math.ceil(total/perPage);
  };

  refreshInfo = (currentUser) => {
    const { userId } = this.state;
    if (currentUser) {
      this.setState({ currentUser });
    } else {
      GetUser({
        userId: userId,
        success: (currentUser) => {
          this.setState({ currentUser });
        }
      });
    }
    this.props.GetOrders({ params: { 'order[user_id]': userId, page: 1, per_page: 10 } });
    this.props.GetCreditCards({
      params: { 'credit_card[user_id]': userId }
    });
    this.setState({
      userId,
    });
  };

  refreshCards = () => {
    const { userId } = this.state;
    this.props.GetCreditCards({
      params: { 'credit_card[user_id]': userId }
    });
  };

  toDetails = order => {
    this.props.history.push(`/orders/${order.id}/detail`);
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

  showDeleteModal = () => {
    this.setState({
      visibleofDeleteModal: true
    });
  };

  hideDeleteModal = () => {
    this.setState({
      visibleofDeleteModal: false
    });
  };

  addNewBoat = (data) => {
    const { CreateBoat } = this.props;
    const { userId } = this.state;
    CreateBoat({
      data: {
        boat: {
          user_id: userId,
          ...data.boat,
        }
      },
      success: () => {
        this.hideBoatModal();
        this.props.GetBoats({ params: { 'boat[user_id]': userId } });
      },
      error: () => {
      }
    })
  };

  addPreferredProvider = () => {
    const { userId, selectedProvider } = this.state;
    const { AddPreferredProvider } = this.props;
    if (!isEmpty(selectedProvider)) {
      AddPreferredProvider({
        data: {
          preferred_provider: {
            user_id: userId,
            provider_id: selectedProvider.providerId,
            provider_location_id: selectedProvider.id
          }
        },
        success: () => {
          toastr.success('Success', 'Added successfully!');
          this.setState({ selectedProvider: {} });
        },
        error: (e) => {
          toastr.error('Error', e.message);
        }
      });
    }
  };

  removePreferredProvider = (provider) => {
    const { DeletePreferredProvider } = this.props;
    DeletePreferredProvider({
      providerId: provider.id,
      success: () => {
        toastr.success('Success', 'Deleted successfully!');
      },
      error: (e) => {
        toastr.error('Error', e.message);
      }
    });
  };

  toggleDisableUser = () => {
    const { UpdateUser } = this.props;
    const { currentUser } = this.state;
    UpdateUser({
      userId: currentUser.id,
      data: {
        user: {
          is_disabled: !currentUser.isDisabled
        }
      },
      success: (currentUser) => {
        this.setState({ currentUser });
        this.hideDeleteModal();
      }
    });
  };

  loadOptions = val =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(this.filterProviderLocation(val));
    }, 10);
  });

  filterProviderLocation = val => {
    const { providerLocations, preferredProviders } = this.props;
    const filtered = providerLocations.filter(location => preferredProviders.filter(preferred => `${preferred.relationships.providerLocation.id}` === `${location.id}`).length === 0);
    const sorted = sortBy(filtered, ['provider_name', 'name']);
    if (val && val.length > 0) {
      let results = sorted.filter(location => location.name.toLowerCase().includes(val.toLowerCase()) || location.provider_name.toLowerCase().includes(val.toLowerCase()) );
      return sortBy(results, ['provider_name', 'name']);
    } else {
      let results = sorted;
      return sortBy(results, ['provider_name', 'name']);
    }
  };

  defaultOptions = () => {
    console.log('default optioning....');
    const { providerLocations, preferredProviders } = this.props;
    console.log(this.props.providerLocations);
    return sortBy(providerLocations.filter(location => preferredProviders.filter(preferred => `${preferred.relationships.providerLocation.id}` === `${location.id}`).length === 0), ['provider_name', 'name']);
  };

  onChangeProvider = user => {
    this.setState({
      selectedProvider: user,
    });
  };

  render() {
    const {
      // customers,
      page,
      orders,
      preferredProviders,
      userStatus,
      customerStatus,
      providerStatus,
      orderStatus,
      boatStatus,
      paymentStatus
    } = this.props
    const {
      currentUser,
      isFirstLoadUser,
      isFirstLoadCustomers,
      isFirstLoadOrders,
      isFirstLoadPreferredProviders,
      isFirstLoadBoats,
      isFirstLoadPayments,
      visibleOfBoatModal,
      visibleofDeleteModal,
      selectedProvider
    } = this.state;
    const userName = `${get(currentUser, 'firstName')} ${get(currentUser, 'lastName')}`;
    const columns = [
      { label: 'orders', value: 'id', width: 1 },
      { label: 'order placed', value: 'createdAt', isDate: true, width: 1 },
      { label: 'service', value: 'relationships.service.attributes.name', width: 1 },
      { label: 'boat name', value: 'relationships.boat.attributes.name', width: 1 },
      { label: 'boat make', value: 'relationships.boat.attributes.make', width: 1 },
      { label: 'total paid', value: 'totalPayments', isCurrency: true, isValue: true, prefix: '$', width: 1 }
    ]
    const pageCount = this.getPageCount();
    const actions = [
      <HollowButton onClick={this.hideDeleteModal} key="modal_btn_cancel">Cancel</HollowButton>,
      <OrangeButton onClick={this.toggleDisableUser} key="modal_btn_save">Confirm</OrangeButton>
    ];
    const loadingUser = userStatus === userActions.GET_USER;
    const loadingOrders = orderStatus === orderActions.GET_ORDERS;
    const loadingCustomers = customerStatus === customerActions.GET_CHILD_ACCOUNTS;
    const loadingPreferredProviders = providerStatus === providerActions.GET_PREFERRED_PROVIDERS;
    const loadingBoats = boatStatus === boatActions.GET_BOATS;
    const loadingPayments = paymentStatus === paymentActions.GET_PAYMENTS;
    return (
      <React.Fragment>
        {((loadingUser && isFirstLoadUser) || isEmpty(currentUser)) ? (
          <LoadingSpinner loading={true} />
        ) : (
          <React.Fragment>
            <UserDetailsHeader user={currentUser} onDelete={this.showDeleteModal} />
            <PageContent>
              <Row>
                <Col sm={12} md={8} lg={8} xl={8}>
                  <Row>
                    <Col sm={12} style={{ marginBottom: 16 }}>
                      {!(loadingOrders && isFirstLoadOrders) && <Table
                        type="secondary"
                        columns={columns}
                        records={orders}
                        toDetails={this.toDetails}
                        page={page}
                        pageCount={pageCount}
                        onPageChange={this.changePage}
                        noData={'There are no orders.'}
                      />}
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} md={12} lg={6} xl={6} style={{ marginBottom: 16 }}>
                      <Section title={"Customer Accounts"}>
                      {!(loadingCustomers && isFirstLoadCustomers) && <CustomersSection customers={[]} />}
                      </Section>
                    </Col>
                    <Col sm={12} md={12} lg={6} xl={6}  style={{ marginBottom: 16 }}>
                      <Section title={"Preferred Providers"}>
                      {!(loadingPreferredProviders && isFirstLoadPreferredProviders) &&
                        <PreferredProvidersSection user={currentUser} providers={preferredProviders} onRemove={this.removePreferredProvider}
                      />}
                      </Section>
                      {!currentUser.isDisabled && <ActionSection>
                        <Col style={{ width: 'calc(100% - 100px)'}}>
                          <AsyncSelect
                            ref={this.setProviderSelectRef}
                            isClearable
                            components={{
                              Option: ProviderOption,
                              SingleValue: ProviderOptionValue
                            }}
                            defaultOptions={this.defaultOptions()}
                            loadOptions={this.loadOptions}
                            onChange={this.onChangeProvider}
                            value={selectedProvider}
                            styles={colourStyles}
                          />
                        </Col>
                        <HollowButton onClick={this.addPreferredProvider} style={{minWidth: 'inherit'}}>Add</HollowButton>
                      </ActionSection>}
                    </Col>
                  </Row>
                </Col>
                <Col sm={12} md={4} lg={4} xl={4}>
                  <Row>
                    <Col sm={12}>
                      <SectionGroup>
                        <Section title={"User & Boat Info"}>
                          <CustomerInfoSection type="user" customerInfo={currentUser} refreshInfo={this.refreshInfo} />
                          {!(loadingBoats && isFirstLoadBoats) && <BoatInfoSection user={currentUser} />}
                          {!currentUser.isDisabled && <OrangeButton className="secondary" onClick={this.showBoatModal}>ADD BOAT</OrangeButton>}
                        </Section>
                      </SectionGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <SectionGroup>
                      {!(loadingPayments && isFirstLoadPayments) && <CreditCardSection
                        user={currentUser} onRefresh={this.refreshCards}
                      />}
                      </SectionGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </PageContent>
            <BoatModal
              open={visibleOfBoatModal}
              user={currentUser}
              onClose={this.hideBoatModal}
              onSave={this.addNewBoat}
            />
            <Modal
              title={'Are You Sure?'}
              actions={actions}
              normal={true}
              open={visibleofDeleteModal}
              onClose={this.hideDeleteModal}
            >
              {currentUser.isDisabled && <Label>Do you want to restore &#39;{userName}&#39;?</Label>}
              {!currentUser.isDisabled && <Label>Do you want to suspend &#39;{userName}&#39;?</Label>}
            </Modal>
            {userStatus === userActions.DELETE_USER && <LoadingSpinner
              loading={userStatus === userActions.DELETE_USER}
            />}
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  userStatus: state.user.currentStatus,
  orderStatus: state.order.currentStatus,
  boatStatus: state.boat.currentStatus,
  paymentStatus: state.payment.currentStatus,
  providerStatus: state.provider.currentStatus,
  page: state.order.orders.page,
  perPage: state.order.orders.perPage,
  total: state.order.orders.total,
  orders: refinedOrdersSelector(state),
  customerStatus: state.childAccount.currentStatus,
  customers: state.childAccount.childAccounts,
  preferredProviders: refinedPreferredProvidersSelector(state),
  providerLocations: simpleProviderLocationSelector(state)
});

const mapDispatchToProps = {
  GetUser,
  GetChildAccounts,
  UpdateUser,
  GetBoats,
  CreateBoat,
  GetOrders,
  GetCreditCards,
  GetPreferredProviders,
  AddPreferredProvider,
  DeletePreferredProvider,
  SearchProviderLocations
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserDetails));
