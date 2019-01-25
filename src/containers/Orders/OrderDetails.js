import React from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { Row, Col } from 'react-flexbox-grid'
import styled from 'styled-components'
import { get } from 'lodash'

import { GetOrder, UpdateOrder } from 'store/actions/orders'
import { fetchLineItems } from 'store/reducers/lineItems'
import { updateBoats } from 'store/reducers/boats'
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

const Wrapper = styled.div`
  padding: 30px;
`

const getOrderDetails = (orderInfo) => {
  const included = get(orderInfo, 'included', [])
  let boatInfo = {}
  let customerInfo = {}
  let providerInfo = {}
  for (let i = 0; i < included.length; i += 1) {
    switch (included[i].type) {
      case 'boats': {
        const {
          id,
          attributes
        } = included[i];
        boatInfo = {
          id,
          ...attributes
        };
        break;
      }
      case 'users': {
        const {
          id,
          attributes: {
            firstName,
            lastName,
            email,
            phoneNumber,
          }
        } = included[i];
        customerInfo = {
          id,
          firstName,
          lastName,
          email,
          phoneNumber
        }
        break;
      }
      case 'providers': {
        const {
          id,
        } = included[i];
        providerInfo = {
          id,
          ...included[i].data
        }
        break;
      }
      default:
      break;
    }
  }
  return { boatInfo, customerInfo, providerInfo };
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
    this.setState({
      orderId
    })
  }

  getOrderInfo = () => {
    const { currentOrder } = this.props;
    const { boatInfo, customerInfo } = getOrderDetails(currentOrder);
    return { boatInfo, customerInfo };
  }

  getProviderId = () => {
    const { currentOrder } = this.props;
    const { providerInfo } = getOrderDetails(currentOrder);
    return providerInfo.id;
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

  updateOrder = (data) => {
    const { orderId } = this.state;
    this.props.UpdateOrder({ orderId, data});
  }

  render() {
    const { boatInfo, customerInfo } = this.getOrderInfo();
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
            <Col md={12} sm={12} xs={12} lg={8} xl={8}>
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
            </Col>
            <Col md={12} sm={12} xs={12} lg={4} xl={4}>
              <SectionGroup>
                <CustomerBoat
                  boatInfo={boatInfo}
                  customerInfo={customerInfo}
                  onEditBoat={() => this.editBoat()}
                />
              </SectionGroup>
              <SectionGroup>
                <Timeline order={currentOrder} />
              </SectionGroup>
            </Col>
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
  updateBoats,
  UpdateOrder
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetails);
