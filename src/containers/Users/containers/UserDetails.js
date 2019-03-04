import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { Row, Col } from 'react-flexbox-grid';
import { get, isEmpty } from 'lodash';
import styled from 'styled-components';

import { actionTypes as userActions, GetUser, UpdateUser } from 'store/actions/users';
import { actionTypes as customerActions, GetChildAccounts } from 'store/actions/child-accounts';
import { actionTypes as orderActions, GetOrders } from 'store/actions/orders';
import {
  actionTypes as providerActions,
  GetProviders,
  GetPreferredProviders,
  AddPreferredProvider,
  DeletePreferredProvider
} from 'store/actions/providers';
import { actionTypes as boatActions, GetBoats, CreateBoat } from 'store/actions/boats';
import { actionTypes as paymentActions, GetCreditCards } from 'store/actions/credit-cards';
import { refinedOrdersSelector } from 'store/selectors/orders';
import { refinedPreferredProvidersSelector } from 'store/selectors/providers';

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
import { BoatyardSelect } from 'components/basic/Dropdown';

export const Label = styled(NormalText)`
  font-family: 'Open sans-serif', sans-serif;
  padding: 10px 0;
`;

const PageContent = styled(Row)`
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
    };
    const { GetUser, GetChildAccounts, GetOrders, GetBoats, GetCreditCards, GetPreferredProviders } = this.props;
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
    GetChildAccounts({
      params: { 'child_account[user_id]': userId, per_page: 1000 },
      success: () => {
        this.setState({ isFirstLoadCustomers: false });
      }
    });
    GetPreferredProviders({
      params: { 'preferred_provider[user_id]': userId, per_page: 1000 },
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
    this.props.history.push(`/order-details/?order=${order.id}`);
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
    const { AddPreferredProvider, GetPreferredProviders } = this.props;
    if (!isEmpty(selectedProvider)) {
      AddPreferredProvider({
        data: {
          preferred_provider: {
            user_id: userId,
            provider_id: selectedProvider.id
          }
        },
        success: () => {
          this.setState({
            selectedProvider: {}
          });
          GetPreferredProviders({
            params: { 'preferred_provider[user_id]': userId, per_page: 1000 },
            success: () => {
              const { providers, preferredProviders } = this.props;
              const options = providers.filter(o1 => preferredProviders.filter(o2 => o2.providerId.toString() === o1.id.toString()).length === 0);
              this.providerSelect.setState({
                defaultOptions: options
              });      
            }
          });      
        }
      });
    }
  };

  removePreferredProvider = (provider) => {
    const { userId } = this.state;
    const { DeletePreferredProvider, GetPreferredProviders } = this.props;
    DeletePreferredProvider({
      providerId: provider.id,
      success: () => {
        GetPreferredProviders({
          params: { 'preferred_provider[user_id]': userId, per_page: 1000 },
          success: () => {
            const { providers, preferredProviders } = this.props;
            const options = providers.filter(o1 => preferredProviders.filter(o2 => o2.providerId.toString() === o1.id.toString()).length === 0);
            this.providerSelect.setState({
              defaultOptions: options
            });      
          }
        });      
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

  loadOptions = val => {
    return this.onChangeUserFilter(val)
      .then((filtered) => {
        const { isFirstLoadPreferredProviders } = this.state;
        if (isFirstLoadPreferredProviders) {
          return filtered;
        } else {
          const { preferredProviders } = this.props;
          return filtered.filter(o1 => preferredProviders.filter(o2 => o2.providerId.toString() === o1.id.toString()).length === 0);  
        }
      }, () => {
        return [];
      });
  };

  onChangeUserFilter = val => {
    const { GetProviders } = this.props;
    return new Promise((resolve, reject) => {
      const params = isEmpty(val) ? {
        'user[sort]': 'asc',
        'user[order]': 'last_name'
      } : {
        'search_by_full_name': val,
        'user[sort]': 'asc',
        'user[order]': 'last_name'
      };
      GetProviders({
        params,
        success: resolve,
        error: reject
      });
    });
  };


  onChangeProvider = user => {
    this.setState({
      selectedProvider: user,
    });
  };

  render() {
    const {
      customers,
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
      { label: 'orders', value: 'id' },
      { label: 'order placed', value: 'createdAt', isDate: true },
      { label: 'service', value: 'relationships.service.attributes.name' },
      { label: 'boat name', value: 'relationships.boat.attributes.name' },
      { label: 'boat make', value: 'relationships.boat.attributes.make' },
      { label: 'total paid', value: 'totalPayments', isCurrency: true, isValue: true, prefix: '$' }
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
              <Col sm={12} md={8} lg={8} xl={8} >
                {!(loadingOrders && isFirstLoadOrders) && <Table
                  type="secondary"
                  columns={columns}
                  records={orders}
                  toDetails={this.toDetails}
                  page={page}
                  pageCount={pageCount}
                  onPageChange={this.changePage}
                />}
                <Row>
                  {!(loadingCustomers && isFirstLoadCustomers) && <Col sm={12} md={12} lg={6} xl={6} style={{ marginTop: 15, marginBottom: 15 }}>
                    <Section title={"Customer Accounts"}>
                      <CustomersSection customers={customers} />
                    </Section>
                  </Col>}
                  {!(loadingPreferredProviders && isFirstLoadPreferredProviders) && <Col sm={12} md={12} lg={6} xl={6}  style={{ marginTop: 15, marginBottom: 15 }}>
                    <Section title={"Preferred Providers"}>
                      <PreferredProvidersSection user={currentUser} providers={preferredProviders} onRemove={this.removePreferredProvider} />
                    </Section>
                    {!currentUser.isDisabled && <ActionSection>
                      <Col sm={8} md={8} lg={8}>
                        <BoatyardSelect
                          ref={this.setProviderSelectRef}
                          components={{
                            Option: ProviderOption,
                            SingleValue: ProviderOptionValue
                          }}
                          defaultOptions
                          loadOptions={this.loadOptions}
                          onChange={this.onChangeProvider}
                          value={selectedProvider}
                        />
                      </Col>
                      <HollowButton onClick={this.addPreferredProvider} style={{minWidth: 'inherit'}}>Add</HollowButton>
                    </ActionSection>}
                  </Col>}
                </Row>
              </Col>
              <Col sm={12} md={4} lg={4} xl={4}>
                <SectionGroup>
                  <Section title={"User & Boat Info"}>
                    <CustomerInfoSection type="user" customerInfo={currentUser} refreshInfo={this.refreshInfo} />
                    {!(loadingBoats && isFirstLoadBoats) && <BoatInfoSection user={currentUser} />}
                    {!currentUser.isDisabled && <OrangeButton className="secondary" onClick={this.showBoatModal}>ADD BOAT</OrangeButton>}
                  </Section>
                </SectionGroup>
                <SectionGroup>
                {!(loadingPayments && isFirstLoadPayments) && <CreditCardSection
                  user={currentUser} onRefresh={this.refreshCards} 
                />}
                </SectionGroup>
              </Col>
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
  providers: state.provider.providers
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
  GetProviders
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserDetails));
