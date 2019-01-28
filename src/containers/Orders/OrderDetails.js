import React from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { Row, Col } from 'react-flexbox-grid'
import styled from 'styled-components'
import { get, set, findIndex, forEach } from 'lodash'

import { GetOrder, UpdateOrder } from 'store/actions/orders'
import { fetchLineItems } from 'store/reducers/lineItems'
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

import { getProviderIdFromOrder } from 'utils/order'

const Wrapper = styled.div`
  padding: 30px 25px;
`

const Column = styled(Col)`
  padding-right: 15px !important;
  padding-left: 15px !important;
`

const getOrderDetails = (orderInfo) => {
  const included = get(orderInfo, 'included', [])
  const boatIdx = findIndex(included, item => item.type === 'boats');
  const boatInfo = { id: get(included, `[${boatIdx}].id`), ...get(included, `[${boatIdx}].attributes`) }
  const customerIdx = findIndex(included, item => item.type === 'users');
  const customerInfo = {
    id: get(included, `[${customerIdx}].id`), ...get(included, `[${customerIdx}].attributes`)
  }
  const providerIdx = findIndex(included, item => item.type === 'providers');
  const providerInfo = {
    id: get(included, `[${providerIdx}].id`), ...get(included, `[${providerIdx}].attributes`)
  }
  return { boatInfo, customerInfo, providerInfo };
}

const getLocations = (orderInfo) => {
  const included = get(orderInfo, 'included', []);
  const locations = {};
  forEach(included, (item) => {
    if (item.type === 'locations') {
      const { id } = item;
      set(locations, `${id}`, item);
    }
  })
  return locations;
}

class OrderDetails extends React.Component {
  state = {
    orderId: -1
  }

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    const orderId = query.order;
    this.props.GetOrder({orderId});
    this.props.fetchLineItems(orderId);
    this.setState({ orderId })
  }

  getOrderInfo = () => {
    const { currentOrder } = this.props;
    const { boatInfo, customerInfo } = getOrderDetails(currentOrder);
    return { boatInfo, customerInfo };
  }

  getProviderId = () => {
    const { currentOrder } = this.props;
    return getProviderIdFromOrder(currentOrder);
  }

  getUserId = () => {
    const { currentOrder } = this.props;
    const userId = get(currentOrder, 'data.relationships.user.data.id');
    return userId;
  }

  getSummaryInfo = () => {
    const { currentOrder } = this.props;
    const total = get(currentOrder, 'data.attributes.total')
    const subtotal = get(currentOrder, 'data.attributes.subTotal')
    const taxRate = get(currentOrder, 'data.attributes.taxRate')
    const taxAmount = get(currentOrder, 'data.attributes.taxAmount')
    const discount = get(currentOrder, 'data.attributes.discount')
    const deposit = get(currentOrder, 'data.attributes.deposit')
    const comments = get(currentOrder, 'data.attributes.comments')
    return ({
      total, subtotal, taxRate, discount, deposit, taxAmount, comments
    })
  }

  getPaymentInfo = () => {
    const { currentOrder } = this.props;
    const balance = get(currentOrder, 'data.attributes.balance');
    return { balance }
  }

  getUdpatedDate = () => {
    const { currentOrder } = this.props;
    const updatedAt = get(currentOrder, 'data.attributes.updatedAt');
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

  getBoatLocation = (boatInfo) => {
    const { currentOrder } = this.props;
    const { locationId } = boatInfo;
    const locations = getLocations(currentOrder);
    return get(locations, `${locationId}`);
  }

  render() {
    const { boatInfo, customerInfo } = this.getOrderInfo();
    const boatLocation = this.getBoatLocation(boatInfo);
    const updatedDate = this.getUdpatedDate();
    const { orderId } = this.state;
    const providerId = this.getProviderId();
    const { lineItems, currentOrder } = this.props;
    const summaryInfo = this.getSummaryInfo();
    const userId = this.getUserId();
    const paymentInfo = this.getPaymentInfo();
    return (
      <React.Fragment>
        <OrderDetailHeader orderId={orderId} />
        <Wrapper>
          <Row>
            <Column md={12} sm={12} xs={12} lg={8} xl={8}>
              <SectionGroup>
                <OrderSumarySection lineItem={lineItems[0]} />
                <LineItemSection updatedAt={updatedDate} orderId={orderId} providerId={providerId} />
                <OrderReviewSection {...summaryInfo} updateOrder={this.updateOrder}/>
              </SectionGroup>
              <SectionGroup>
                <PaymentsSection orderId={orderId} userId={userId} providerId={providerId} {...paymentInfo} />
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
  fetchLineItems,
  UpdateOrder
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetails);
