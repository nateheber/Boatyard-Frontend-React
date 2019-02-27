import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { Row, Col } from 'react-flexbox-grid';
import { get, isEmpty } from 'lodash';
import styled from 'styled-components';

import { actionTypes as userActions, GetUser, DeleteUser } from 'store/actions/users';
import { actionTypes as orderActions, GetOrders } from 'store/actions/orders';
import { actionTypes as boatActions, GetBoats, CreateBoat } from 'store/actions/boats';
import { actionTypes as paymentActions, GetCreditCards } from 'store/actions/credit-cards';
import { refinedOrdersSelector } from 'store/selectors/orders';

import { HollowButton, OrangeButton } from 'components/basic/Buttons';
import { Section, SectionGroup } from 'components/basic/InfoSection';
import Table from 'components/basic/Table';
import CustomerInfoSection from 'components/template/CustomerInfoSection';
import BoatInfoSection from 'components/template/BoatInfoSection';
import CreditCardSection from 'components/template/CreditCardSection';
import { UserDetailsHeader } from './UserDetailsHeader';
import Modal from 'components/compound/Modal';
import BoatModal from 'components/template/BoatInfoSection/BoatModal';
import LoadingSpinner from 'components/basic/LoadingSpinner';
import { NormalText } from 'components/basic/Typho'

export const Label = styled(NormalText)`
  font-family: 'Open sans-serif', sans-serif;
  padding: 10px 0;
`;

const PageContent = styled(Row)`
  padding: 30px 25px;
`;

class UserDetails extends React.Component {
  constructor(props) {
    super(props);
    const query = queryString.parse(this.props.location.search);
    const userId = query.user;
    this.state = {
      userId,
      isFirstLoadUser: true,
      isFirstLoadOrders: true,
      isFirstLoadBoats: true,
      isFirstLoadPayments: true,
      visibleOfBoatModal: false,
      visibleofDeleteModal: false
    };
    const { GetUser, GetOrders, GetBoats, GetCreditCards } = this.props;
    GetUser({
      userId: userId,
      success: () => {
        this.setState({ isFirstLoadUser: false });
      }
    });
    GetOrders({
      params: { 'order[user_id]': userId, page: 1 },
      success: () => {
        this.setState({ isFirstLoadOrders: false });
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
  }

  changePage = (page) => {
    const { userId } = this.state;
    this.props.GetOrders({ params: { 'order[user_id]': userId, page: page } });
  }

  getPageCount = () => {
    const { perPage, total } = this.props
    return Math.ceil(total/perPage)
  }
  refreshInfo = () => {
    const { userId } = this.state;
    this.props.GetUser({ userId: userId });
    this.props.GetOrders({ params: { 'order[user_id]': userId, page: 1 } });
    this.props.GetCreditCards({
      params: { 'credit_card[user_id]': userId }
    });
    this.setState({
      userId,
    })
  }
  refreshCards = () => {
    const { userId } = this.state;
    this.props.GetCreditCards({
      params: { 'credit_card[user_id]': userId }
    });
  }

  toDetails = order => {
    this.props.history.push(`/order-details/?order=${order.id}`);
  }

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

  deleteCustomer = () => {
    const { DeleteUser } = this.props;
    const { userId } = this.state;
    this.hideDeleteModal();
    DeleteUser({
      userId: userId,
      success: () => {
        this.props.history.push('/users');
      }
    })
  };

  render() {
    const {
      currentUser,
      page,
      orders,
      customerStatus,
      orderStatus,
      boatStatus,
      paymentStatus
    } = this.props
    const {
      isFirstLoadUser,
      isFirstLoadOrders,
      isFirstLoadBoats,
      isFirstLoadPayments,
      visibleOfBoatModal,
      visibleofDeleteModal
    } = this.state;
    const customerName = `${get(currentUser, 'firstName')} ${get(currentUser, 'lastName')}`;
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
      <OrangeButton onClick={this.deleteCustomer} key="modal_btn_save">Confirm</OrangeButton>
    ];
    const loadingCustomer = customerStatus === userActions.GET_USER;
    const loadingOrders = orderStatus === orderActions.GET_ORDERS;
    const loadingBoats = boatStatus === boatActions.GET_BOATS;
    const loadingPayments = paymentStatus === paymentActions.GET_PAYMENTS;

    return (
      <React.Fragment>
        {((loadingCustomer && isFirstLoadUser) || isEmpty(currentUser)) ? (
          <LoadingSpinner loading={true} />
        ) : (
          <React.Fragment>
            <UserDetailsHeader name={customerName} onDelete={this.showDeleteModal} />
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
              </Col>
              <Col sm={12} md={4} lg={4} xl={4}>
                <SectionGroup>
                  <Section title={"Customer & Boat Info"}>
                    <CustomerInfoSection customerInfo={currentUser} refreshInfo={this.refreshInfo} />
                    {!(loadingBoats && isFirstLoadBoats) && <BoatInfoSection user={currentUser} />}
                    <OrangeButton className="secondary" onClick={this.showBoatModal}>ADD BOAT</OrangeButton>
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
              <Label>Deleting {customerName}&#39;s account is permanent and cannot be undone.</Label>
            </Modal>
            {customerStatus === userActions.DELETE_USER && <LoadingSpinner
              loading={customerStatus === userActions.DELETE_USER}
            />}
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  customerStatus: state.user.currentStatus,
  orderStatus: state.order.currentStatus,
  boatStatus: state.boat.currentStatus,
  paymentStatus: state.payment.currentStatus,
  currentUser: state.user.currentUser,
  page: state.order.newOrders.total,
  perPage: state.order.newOrders.total,
  total: state.order.newOrders.total,
  orders: refinedOrdersSelector(state)
});

const mapDispatchToProps = {
  GetUser,
  DeleteUser,
  GetBoats,
  CreateBoat,
  GetOrders,
  GetCreditCards
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserDetails));
