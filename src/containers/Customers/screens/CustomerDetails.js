import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { Row, Col } from 'react-flexbox-grid';
import { get } from 'lodash';
import styled from 'styled-components';

import { GetChildAccount, DeleteChildAccount } from 'store/actions/child-accounts';
import { GetBoats, CreateBoat } from 'store/actions/boats';
import { GetOrders } from 'store/actions/orders';
import { GetCreditCards } from 'store/actions/credit-cards';
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
import { actionTypes } from '../../../store/actions/child-accounts';
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
    this.state = {
      customerId: -1,
      visibleOfBoatModal: false,
      visibleofDeleteModal: false
    };
  }

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    const customerId = query.customer;
    this.props.GetChildAccount({ childAccountId: customerId });
    this.props.GetOrders({ params: { 'order[child_account_id]': customerId, page: 1 } });
    this.props.GetBoats({ params: { 'boat[child_account_id]': customerId } });
    this.props.GetCreditCards({
      params: { 'credit_card[child_account_id]': customerId }
    });
    this.setState({
      customerId,
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

  toDetails = (orderId) => {
    this.props.history.push(`/order-details/?order=${orderId}`);
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
    const { currentChildAccount, page, orders, currentStatus } = this.props
    const { customerId, visibleOfBoatModal, visibleofDeleteModal } = this.state;
    const id = get(currentChildAccount, 'id', '')
    const customerName = `${get(currentChildAccount, 'attributes.firstName')} ${get(currentChildAccount, 'attributes.lastName')}`;
    const attributes = get(currentChildAccount, 'attributes', {})
    const columns = [
      { label: 'orders', value: 'id' },
      { label: 'boat name', value: 'relationships.boat.attributes.name' },
      { label: 'boat make', value: 'relationships.boat.attributes.make' },
      { label: 'service', value: 'relationships.service.attributes.name' },
      { label: 'order placed', value: 'createdAt', isDate: true },
      { label: 'total', value: 'total', isValue: true, prefix: '$' }
    ]
    const pageCount = this.getPageCount();
    const actions = [
      <HollowButton onClick={this.hideDeleteModal} key="modal_btn_cancel">Cancel</HollowButton>,
      <OrangeButton onClick={this.deleteCustomer} key="modal_btn_save">Confirm</OrangeButton>
    ];

    return (
      <React.Fragment>
        <CustomerDetailsHeader name={customerName} onDelete={this.showDeleteModal} />
        <PageContent>
          <Col sm={12} md={8} lg={8} xl={8} >
            <Table
              type="secondary"
              columns={columns}
              records={orders}
              toDetails={this.toDetails}
              page={page}
              pageCount={pageCount}
              onPageChange={this.changePage}
            />
          </Col>
          <Col sm={12} md={4} lg={4} xl={4}>
            <SectionGroup>
              <Section title={"Customer & Boat Info"}>
                <CustomerInfoSection customerInfo={{ id, ...attributes }} refreshInfo={this.refreshInfo} />
                <BoatInfoSection type="ChildAccount" customerId={customerId} />
                <OrangeButton className="secondary" onClick={this.showBoatModal}>ADD BOAT</OrangeButton>
              </Section>
            </SectionGroup>
            <SectionGroup>
              <CreditCardSection userId={customerId} onRefresh={this.refreshCards} />
            </SectionGroup>
          </Col>
        </PageContent>
        <BoatModal
          open={visibleOfBoatModal}
          customerId={customerId}
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
          <Label>Deleting {customerName}'s account is permanent and cannot be undone.</Label>
        </Modal>
        {currentStatus === actionTypes.DELETE_CHILD_ACCOUNT && <LoadingSpinner
          loading={currentStatus === actionTypes.DELETE_CHILD_ACCOUNT}
        />}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  currentStatus: state.childAccount.currentStatus,
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