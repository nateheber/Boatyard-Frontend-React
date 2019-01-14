import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import { Row, Col } from 'react-flexbox-grid'
import { get } from 'lodash'

import { fetchUser } from 'reducers/users'
import { getUserBoats } from 'reducers/boats'
import { getUserOrders } from 'reducers/orders'

import { Section } from 'components/basic/InfoSection'
import CustomerInfoSection from 'components/template/CustomerInfoSection'
import BoatInfoSection from 'components/template/BoatInfoSection'

class CustomerDetails extends React.Component {
  componentDidMount() {
    const query = queryString.parse(this.props.location.search)
    const customerId = query.customer
    this.props.fetchUser(customerId)
    this.props.getUserBoats({userId: customerId})
    this.props.getUserOrders({ userId: customerId })
    this.setState({
      customerId,
    })
  }
  getPageCount = () => {
    const { perPage, total } = this.props
    return Math.ceil(total/perPage)
  }
  parseOrders = () => {
    const { orders } = this.props
    console.log(orders)
  }
  render() {
    const { currentUser } = this.props
    const id = get(currentUser, 'id', '')
    const attributes = get(currentUser, 'attributes', {})
    this.parseOrders();
    return (
      <Row>
        <Col sm={12} md={8} lg={8} xl={8} >

        </Col>
        <Col sm={12} md={4} lg={4} xl={4}>
          <Section title={"Customer & Boat Info"}>
            <CustomerInfoSection customerInfo={{ id, ...attributes }} />
            <BoatInfoSection />
          </Section>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = ({
  user: { currentUser },
  order: {
    orders,
    page,
    perPage,
    total
  }
}) => ({
  currentUser,
  orders,
  page,
  total,
  perPage,
})

const mapDispatchToProps = {
  fetchUser,
  getUserBoats,
  getUserOrders
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerDetails));