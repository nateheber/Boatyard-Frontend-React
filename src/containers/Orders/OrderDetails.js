import React from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { Row, Col } from 'react-flexbox-grid'
import styled from 'styled-components'
import { get } from 'lodash'

import { GetOrder, UpdateOrder } from 'store/actions/orders'
import { orderSelector } from 'store/selectors/orders'

import { SectionGroup } from 'components/basic/InfoSection'

import CustomerBoat from './components/templates/CustomerBoat'
import LineItemSection from './components/templates/LineItemSection'
import OrderSumarySection from './components/templates/OrderSumarySection'
import OrderReviewSection from './components/templates/OrderReviewSection'
import OrderDetailHeader from './components/templates/OrderDetailHeader'
import Scheduler from './components/templates/Scheduler'
import PaymentsSection from './components/templates/Payments'
import Timeline from './components/templates/Timeline'

import { getUserFromOrder, getBoatFromOrder, getProviderFromOrder } from 'utils/order'

const Wrapper = styled.div`
  padding: 30px 25px;
`;

const Column = styled(Col)`
  padding-right: 15px !important;
  padding-left: 15px !important;
`;

class OrderDetails extends React.Component {
  state = {
    orderId: -1
  }

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    const orderId = query.order;
    this.setState({ orderId }, () => {
      this.props.GetOrder({orderId});
    });
  }

  getOrderInfo = () => {
    const { currentOrder } = this.props;
    const customerInfo = getUserFromOrder(currentOrder);
    const boatInfo = getBoatFromOrder(currentOrder);
    return { boatInfo, customerInfo };
  }

  getProviderId = () => {
    const { currentOrder } = this.props;
    return get(getProviderFromOrder(currentOrder),'id', '');
  }

  getUser = () => {
    const { currentOrder } = this.props;
    return getUserFromOrder(currentOrder);
  }

  getSummaryInfo = () => {
    const { currentOrder } = this.props;
    const total = get(currentOrder, 'attributes.total');
    const subtotal = get(currentOrder, 'attributes.subTotal');
    const taxRate = get(currentOrder, 'attributes.taxRate');
    const taxAmount = get(currentOrder, 'attributes.taxAmount');
    const discount = get(currentOrder, 'attributes.discount');
    const deposit = get(currentOrder, 'attributes.deposit');
    const comments = get(currentOrder, 'attributes.comments');
    return ({
      total, subtotal, taxRate, discount, deposit, taxAmount, comments
    });
  }

  getSpecialInstructions = () => {
    const { currentOrder } = this.props;
    return get(currentOrder, 'attributes.specialInstructions');
  }

  getPaymentInfo = () => {
    const { currentOrder } = this.props;
    const balance = get(currentOrder, 'attributes.balance');
    return { balance }
  }

  getUdpatedDate = () => {
    const { currentOrder } = this.props;
    const updatedAt = get(currentOrder, 'attributes.updatedAt');
    return updatedAt;
  }

  editBoat = () => {
    this.setState({ editBoat: true })
  }

  closeBoatEditor = () => {
    this.setState({ editBoat: false })
  }

  updateBoat = (data) => {
    const { boatInfo: { id } } = this.getOrderInfo();
    const { orderId } = this.state;
    this.props.updateBoats({ id, data, callback: () => { this.props.GetOrder({ orderId }) } })
    this.setState({ editBoat: false })
  }

  updateOrder = (data) => {
    const { orderId } = this.state;
    this.props.UpdateOrder({ orderId, data});
  }

  render() {
    const { boatInfo, customerInfo } = this.getOrderInfo();
    const boatLocation = boatInfo.location;
    const updatedDate = this.getUdpatedDate();
    const { orderId } = this.state;
    const providerId = this.getProviderId();
    const { currentOrder } = this.props;
    const { lineItems } = currentOrder;
    const summaryInfo = this.getSummaryInfo();
    const user = this.getUser();
    const paymentInfo = this.getPaymentInfo();

    return (
      <React.Fragment>
        <OrderDetailHeader order={currentOrder} />
        <Wrapper>
          <Row>
            <Column md={12} sm={12} xs={12} lg={8} xl={8}>
              <SectionGroup>
                <OrderSumarySection lineItem={lineItems[0]} specialInstructions={this.getSpecialInstructions()} />
                <LineItemSection updatedAt={updatedDate} orderId={orderId} providerId={providerId} />
                <OrderReviewSection {...summaryInfo} updateOrder={this.updateOrder}/>
              </SectionGroup>
              <SectionGroup>
                <PaymentsSection orderId={orderId} user={user} providerId={providerId} {...paymentInfo} />
              </SectionGroup>
              <SectionGroup>
                <Scheduler orderId={orderId} />
              </SectionGroup>
            </Column>
            <Column md={12} sm={12} xs={12} lg={4} xl={4}>
              <SectionGroup>
                <CustomerBoat
                  boatInfo={boatInfo}
                  boatLocation={boatLocation}
                  customerInfo={customerInfo}
                  onEditBoat={() => this.editBoat()}
                />
              </SectionGroup>
              <SectionGroup>
                <Timeline order={currentOrder} />
              </SectionGroup>
            </Column>
          </Row>
        </Wrapper>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({ ...orderSelector(state) });

const mapDispatchToProps = {
  GetOrder,
  UpdateOrder
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetails);
