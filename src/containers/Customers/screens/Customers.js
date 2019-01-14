import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import Table from 'components/basic/Table'
import { CustomersHeader } from 'components/compound/SectionHeader'

import { fetchUsers } from 'reducers/users'

const Wrapper = styled.div`
  height: 100%;
  background-color: white;
`;

class Customers extends React.Component {
  componentDidMount() {
    this.props.fetchUsers(1);
  }
  toDetails = customerId => {
    this.props.history.push(`/customer-details/?customer=${customerId}`)
  };
  changePage = (page) => {
    this.props.fetchUsers(page)
  }
  getPageCount = () => {
    const { perPage, total } = this.props
    return Math.ceil(total/perPage)
  }
  parseUser = () => {
    const { users } = this.props;
    return users.map(({ firstName, lastName, ...rest }) => ({
      name: `${firstName} ${lastName}`,
      ...rest
    }))
  }
  render() {
    const { page } = this.props
    const pageCount = this.getPageCount()
    const users = this.parseUser()
    const columns = [
      { label: 'name', value: 'name' },
      { label: 'phone', value: 'phoneNumber' },
      { label: 'email', value: 'email' },
      { label: 'location', value: 'location' },
      { label: 'last order', value: 'last_order' },
      { label: 'orders', value: 'orders' },
      { label: 'total spent', value: 'total_spent' }
    ]
    return (
      <Wrapper>
        <CustomersHeader />
        <Table
          columns={columns}
          records={users}
          sortColumn="order"
          toDetails={this.toDetails}
          page={page}
          pageCount={pageCount}
          onPageChange={this.changePage}
        />
      </Wrapper>
    )
  }
}

const mapStateToProps = ({ user: { users, page, perPage, total } }) => ({
  users,
  page,
  perPage,
  total
})

const mapDispatchToProps = {
  fetchUsers
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Customers))
