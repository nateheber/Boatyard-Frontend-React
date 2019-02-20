import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { Row, Col } from 'react-flexbox-grid';
import { get, isEmpty } from 'lodash';
import styled from 'styled-components';

import { actionTypes as customerActions, GetChildAccount, DeleteChildAccount } from 'store/actions/child-accounts';
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
import { CustomerDetailsHeader } from '../components/CustomerDetailsHeader';
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

class CustomerDetails extends React.Component {
  constructor(props) {
    super(props);
    const query = queryString.parse(this.props.location.search);
    const customerId = query.customer;
    this.state = {
      customerId,
      isFirstLoadCustomer: true,
      isFirstLoadOrders: true,
      isFirstLoadBoats: true,
      isFirstLoadPayments: true,
      visibleOfBoatModal: false,
      visibleofDeleteModal: false
    };
    const { GetChildAccount, GetOrders, GetBoats, GetCreditCards } = this.props;
    GetChildAccount({
      childAccountId: customerId,
      success: () => {
        this.setState({ isFirstLoadCustomer: false });
      }
    });
    GetOrders({
      params: { 'order[child_account_id]': customerId, page: 1 },
      success: () => {
        this.setState({ isFirstLoadOrders: false });
      }
    });
    GetBoats({
      params: { 'boat[child_account_id]': customerId },
      success: () => {
        this.setState({ isFirstLoadBoats: false });
      }
    });
    GetCreditCards({
      params: { 'credit_card[child_account_id]': customerId },
      success: () => {
        this.setState({ isFirstLoadPayments: false });
      }
    });
  }

  changePage = (page) => {
    const { customerId } = this.state;
    this.props.GetOrders({ params: { 'order[child_account_id]': customerId, page: page } });
  }

  getPageCount = () => {
    const { perPage, total } = this.props
    return Math.ceil(total/perPage)
  }
  refreshInfo = () => {
    const { customerId } = this.state;
    this.props.GetChildAccount({ childAccountId: customerId });
    this.props.GetOrders({ params: { 'order[child_account_id]': customerId, page: 1 } });
    this.props.GetCreditCards({
      params: { 'credit_card[child_account_id]': customerId }
    });
    this.setState({
      customerId,
    })
  }
  refreshCards = () => {
    const { customerId } = this.state;
    this.props.GetCreditCards({
      params: { 'credit_card[child_account_id]': customerId }
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
    const { customerId } = this.state;
    CreateBoat({
      data: {
        boat: {
          child_account_id: customerId,
          ...data.boat,
        }
      },
      success: () => {
        this.hideBoatModal();
        this.props.GetBoats({ params: { 'boat[child_account_id]': customerId } });
      },
      error: () => {
      }
    })
  };

  deleteCustomer = () => {
    const { DeleteChildAccount } = this.props;
    const { customerId } = this.state;
    this.hideDeleteModal();
    DeleteChildAccount({
      childAccountId: customerId,
      success: () => {
        this.props.history.push('/customers');
      }
    })
  };

  render() {
    const {
      currentChildAccount,
      page,
      orders,
      customerStatus,
      orderStatus,
      boatStatus,
      paymentStatus
    } = this.props
    const {
      isFirstLoadCustomer,
      isFirstLoadOrders,
      isFirstLoadBoats,
      isFirstLoadPayments,
      visibleOfBoatModal,
      visibleofDeleteModal
    } = this.state;
    const customerName = `${get(currentChildAccount, 'firstName')} ${get(currentChildAccount, 'lastName')}`;
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
    const loadingCustomer = customerStatus === customerActions.GET_CHILD_ACCOUNT;
    const loadingOrders = orderStatus === orderActions.GET_ORDERS;
    const loadingBoats = boatStatus === boatActions.GET_BOATS;
    const loadingPayments = paymentStatus === paymentActions.GET_PAYMENTS;

    return (
      <React.Fragment>
        {((loadingCustomer && isFirstLoadCustomer) || isEmpty(currentChildAccount)) ? (
          <LoadingSpinner loading={true} />
        ) : (
          <React.Fragment>
            <CustomerDetailsHeader name={customerName} onDelete={this.showDeleteModal} />
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
                    <CustomerInfoSection customerInfo={currentChildAccount} refreshInfo={this.refreshInfo} />
                    {!(loadingBoats && isFirstLoadBoats) && <BoatInfoSection user={currentChildAccount} />}
                    <OrangeButton className="secondary" onClick={this.showBoatModal}>ADD BOAT</OrangeButton>
                  </Section>
                </SectionGroup>
                <SectionGroup>
                {!(loadingPayments && isFirstLoadPayments) && <CreditCardSection
                  user={currentChildAccount} onRefresh={this.refreshCards} 
                />}
                </SectionGroup>
              </Col>
            </PageContent>
            <BoatModal
              open={visibleOfBoatModal}
              user={currentChildAccount}
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
            {customerStatus === customerActions.DELETE_CHILD_ACCOUNT && <LoadingSpinner
              loading={customerStatus === customerActions.DELETE_CHILD_ACCOUNT}
            />}
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  customerStatus: state.childAccount.currentStatus,
  orderStatus: state.order.currentStatus,
  boatStatus: state.boat.currentStatus,
  paymentStatus: state.payment.currentStatus,
  currentChildAccount: state.childAccount.currentChildAccount,
  page: state.order.newOrders.total,
  perPage: state.order.newOrders.total,
  total: state.order.newOrders.total,
  orders: refinedOrdersSelector(state)
});

const mapDispatchToProps = {
  GetChildAccount,
  DeleteChildAccount,
  GetBoats,
  CreateBoat,
  GetOrders,
  GetCreditCards
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerDetails));