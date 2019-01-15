import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import { Row, Col } from 'react-flexbox-grid'
import { get } from 'lodash'
import moment from 'moment'
import styled from 'styled-components'

import { fetchUser } from 'reducers/users'
import { getUserBoats } from 'reducers/boats'
import { getUserOrders } from 'reducers/orders'
import { fetchPayments } from 'reducers/payments'

import { Section } from 'components/basic/InfoSection'
import Table from 'components/basic/Table'
import CustomerInfoSection from 'components/template/CustomerInfoSection'
import BoatInfoSection from 'components/template/BoatInfoSection'

import { CustomerDetailsHeader } from '../components/CustomerDetailsHeader'

const PageContent = styled(Row)`
  padding: 30px 25px;
`;

class CustomerDetails extends React.Component {
  componentDidMount() {
    const query = queryString.parse(this.props.location.search)
    const customerId = query.customer
    this.props.fetchUser(customerId)
    this.props.fetchPayments(customerId)
    this.props.getUserBoats({userId: customerId})
    this.props.getUserOrders({ userId: customerId, page: 1 })
    this.setState({
      customerId,
    })
  }
  changePage = (page) => {
    const { customerId } = this.state;
    this.props.getUserOrders({ userId: customerId, page })
  }
  getPageCount = () => {
    const { perPage, total } = this.props
    return Math.ceil(total/perPage)
  }
  parseOrders = () => {
    const { orders, included } = this.props
    const parsedOrders = orders.map(order => {
      const { id, relationships, createdAt, total } = order
      const boatType = get(relationships, 'boat.data.type')
      const boatId = get(relationships, 'boat.data.id')
      const boat = get(included, `${boatType}.${boatId}`, {})
      const boatName = get(boat, 'attributes.name')
      const boatMake = get(boat, 'attributes.make')
      const orderCreated = moment(createdAt).format('MMM D, YYYY')
      return ({
        id,
        name: `Order #${id}`,
        boatName,
        boatMake,
        orderCreated,
        total: `$${total}`
      })
    })
    return parsedOrders
  }
  render() {
    const { currentUser, page } = this.props
    const id = get(currentUser, 'id', '')
    const customerName = get(currentUser, 'attributes.name');
    const attributes = get(currentUser, 'attributes', {})
    const processedOrders = this.parseOrders()
    const columns = [
      { label: 'orders', value: 'name' },
      { label: 'boat name', value: 'boatName' },
      { label: 'boat make', value: 'boatMake' },
      { label: 'order placed', value: 'orderCreated' },
      { label: 'total', value: 'total' }
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
              records={processedOrders}
              sortColumn="order"
              toDetails={this.toDetails}
              page={page}
              pageCount={pageCount}
              onPageChange={this.changePage}
            />
          </Col>
          <Col sm={12} md={4} lg={4} xl={4}>
            <Section title={"Customer & Boat Info"}>
              <CustomerInfoSection customerInfo={{ id, ...attributes }} />
              <BoatInfoSection />
            </Section>
          </Col>
        </PageContent>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({
  user: { currentUser },
  order: {
    orders,
    included,
    page,
    perPage,
    total
  }
}) => ({
  currentUser,
  orders,
  included,
  page,
  total,
  perPage,
})

const mapDispatchToProps = {
  fetchUser,
  getUserBoats,
  getUserOrders,
  fetchPayments,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerDetails));