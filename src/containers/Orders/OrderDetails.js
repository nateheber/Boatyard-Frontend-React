import React from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { Row, Col } from 'react-flexbox-grid'
import styled from 'styled-components'
import { get } from 'lodash'

import { getOrder, updateOrders } from 'reducers/orders'
import { fetchLineItems } from 'reducers/lineItems'
import { updateBoats } from 'reducers/boats'
import { orderSelector } from 'reducers/selector/order'

import { SectionGroup } from 'components/basic/InfoSection'

import CustomerBoat from './components/templates/CustomerBoat'
import LineItemSection from './components/templates/LineItemSection'
import OrderSumarySection from './components/templates/OrderSumarySection'
import OrderReviewSection from './components/templates/OrderReviewSection'

import BoatEditor from './components/modals/EditBoatModal'

const Wrapper = styled.div`
  padding: 15px;
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
    orderId: -1,
    editBoat: false,
  }

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    const orderId = query.order;
    this.props.getOrder(orderId);
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

  getSummaryInfo = () => {
    const { currentOrder } = this.props;
    const total = get(currentOrder, 'data.attributes.total')
    const subtotal = get(currentOrder, 'data.attributes.subTotal')
    const taxRate = get(currentOrder, 'data.attributes.taxRate')
    const taxAmount = get(currentOrder, 'data.attributes.taxAmount')
    const discount = get(currentOrder, 'data.attributes.discount')
    const deposit = get(currentOrder, 'data.attributes.deposit')
    return ({
      total, subtotal, taxRate, discount, deposit, taxAmount
    })
  }

  editBoat = () => {
    this.setState({
      editBoat: true,
    })
  }

  closeBoatEditor = () => {
    this.setState({
      editBoat: false,
    })
  }

  updateBoat = (data) => {
    const { boatInfo: { id } } = this.getOrderInfo();
    const { orderId } = this.state;
    this.props.updateBoats({
      id,
      data,
      callback: () => {
        this.props.getOrder(orderId)
      }
    })
    this.setState({
      editBoat: false,
    })
  }

  updateOrder = (data) => {
    const { orderId } = this.state;
    this.props.updateOrders({ id: orderId, data })
  }

  render() {
    const { boatInfo, customerInfo } = this.getOrderInfo();
    const { orderId, editBoat } = this.state;
    const providerId = this.getProviderId();
    const { lineItems } = this.props;
    const summaryInfo = this.getSummaryInfo();
    return (
      <Wrapper>
        <Row>
          <Col md={12} sm={12} xs={12} lg={8} xl={8}>
            <SectionGroup>
              <OrderSumarySection lineItem={lineItems[0]} />
              <LineItemSection orderId={orderId} providerId={providerId} />
              <OrderReviewSection {...summaryInfo} updateOrder={this.updateOrder}/>
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
          </Col>
        </Row>
        <BoatEditor
          boatInfo={boatInfo}
          open={editBoat}
          onClose={this.closeBoatEditor}
          onSave={this.updateBoat}
        />
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({ ...orderSelector(state) });

const mapDispatchToProps = {
  getOrder,
  fetchLineItems,
  updateBoats,
  updateOrders
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetails);
