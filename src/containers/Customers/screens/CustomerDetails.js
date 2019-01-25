import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { Row, Col } from 'react-flexbox-grid';
import { get, isEmpty } from 'lodash';
import styled from 'styled-components';

import { GetUser } from 'store/actions/users';
import { GetBoats, CreateBoat } from 'store/actions/boats';
import { GetOrders } from 'store/actions/orders';
import { GetCreditCards } from 'store/actions/credit-cards';
import { refinedOrdersSelector } from 'store/selectors/orders';

import { OrangeButton } from 'components/basic/Buttons';
import { Section, SectionGroup } from 'components/basic/InfoSection';
import Table from 'components/basic/Table';
import CustomerInfoSection from 'components/template/CustomerInfoSection';
import BoatInfoSection from 'components/template/BoatInfoSection';
import CreditCardSection from 'components/template/CreditCardSection';
import { CustomerDetailsHeader } from '../components/CustomerDetailsHeader';
import BoatModal from 'components/template/BoatInfoSection/BoatModal';

const PageContent = styled(Row)`
  padding: 30px 25px;
`;

class CustomerDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerId: -1,
      visibleOfBoatModal: false
    };
  }

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    const customerId = query.customer;
    this.props.GetUser({ userId: customerId });
    this.props.GetBoats({ params: { 'boat[user_id]': customerId } });
    this.props.GetOrders({ params: { 'order[user_id]': customerId, page: 1 } });
    this.props.GetCreditCards({
      params: { 'credit_card[user_id]': customerId }
    });
    this.setState({
      customerId,
    });
  }
  changePage = (page) => {
    const { customerId } = this.state;
    this.props.GetOrders({ params: { 'order[user_id]': customerId, page: page } });
  }
  getPageCount = () => {
    const { perPage, total } = this.props
    return Math.ceil(total/perPage)
  }
  refreshInfo = () => {
    const { customerId } = this.state;
    this.props.GetUser({ userId: customerId });
    this.props.GetBoats({userId: customerId})
    this.props.GetOrders({ params: { 'order[user_id]': customerId, page: 1 } });
    this.props.GetCreditCards({
      params: { 'credit_card[user_id]': customerId }
    });
    this.setState({
      customerId,
    })
  }
  refreshCards = () => {
    const { customerId } = this.state;
    this.props.GetCreditCards({
      params: { 'credit_card[user_id]': customerId }
    });
  }

  toDetails = (orderId) => {
    this.props.history.push(`/order-details/?order=${orderId}`);
  }

  saveBoat = (data) => {
    const { selectedBoat } = this.state;
    const boatId = get(selectedBoat, 'id', '');
    if (isEmpty(boatId)) {
    } else {
    }
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

  render() {
    const { currentUser, page, orders } = this.props
    const { customerId, selectedBoat,visibleOfBoatModal } = this.state;
    const id = get(currentUser, 'id', '')
    const customerName = `${get(currentUser, 'attributes.firstName')} ${get(currentUser, 'attributes.lastName')}`;
    const attributes = get(currentUser, 'attributes', {})
    const columns = [
      { label: 'orders', value: 'id' },
      { label: 'boat name', value: 'relationships.boat.attributes.name' },
      { label: 'boat make', value: 'relationships.boat.attributes.make' },
      { label: 'service', value: 'relationships.service.attributes.name' },
      { label: 'order placed', value: 'createdAt', isDate: true },
      { label: 'total', value: 'total', isValue: true, prefix: '$' }
    ]
    const pageCount = this.getPageCount()
    return (
      <React.Fragment>
        <CustomerDetailsHeader name={customerName} onDelete={this.deleteCustomer} />
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
                <BoatInfoSection refreshInfo={this.refreshInfo} />
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
          onClose={this.hideBoatModal}
          onSave={this.saveBoat}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  page: state.order.newOrders.total,
  perPage: state.order.newOrders.total,
  total: state.order.newOrders.total,
  orders: refinedOrdersSelector(state)
});

const mapDispatchToProps = {
  GetUser,
  GetBoats,
  CreateBoat,
  GetOrders,
  GetCreditCards
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerDetails));