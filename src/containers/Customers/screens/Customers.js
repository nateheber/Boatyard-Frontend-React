import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import AsyncSelect from 'react-select/lib/Async'
import { Row, Col } from 'react-flexbox-grid'

import Table from 'components/basic/Table'
import CustomerOption from 'components/basic/CustomerOption';
import CustomerOptionValue from 'components/basic/CustomerOptionValue';

import { GetUsers, FilterUsers } from 'store/actions/users'

import { CustomersHeader } from '../components/CustomersHeader'
import NewCustomerModal from '../components/NewCustomerModal'

const Wrapper = styled.div`
  height: 100%;
  background-color: white;
`;

const SearchWrapper = styled.div`
  padding: 30px;
`;

class Customers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewModal: false,
    };
  }

  componentDidMount() {
    this.props.GetUsers({
      params: { page: 1 }
    });
  }

  loadOptions = val => {
    return this.onChangeUserFilter(val)
      .then((filtered) => {
        return filtered.map(user => ({
          value: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }));
      }, () => {
        return [];
      })
  };

  onChangeUserFilter = val => {
    return new Promise((resolve, reject) => {
      this.props.FilterUsers({
        keyword: val,
        success: resolve,
        error: reject
      });
    });
  };

  onChangeUser = (val) => {
    this.props.history.push(`/customer-details/?customer=${val.value}`);
  };

  closeNewModal = () => {
    this.setState({
      showNewModal: false,
    });
  };

  openNewModal = () => {
    this.setState({
      showNewModal: true,
    });
  };

  toDetails = customerId => {
    this.props.history.push(`/customer-details/?customer=${customerId}`);
  };

  changePage = (page) => {
    this.props.GetUsers({
      params: { page }
    });
  };

  getPageCount = () => {
    const { perPage, total } = this.props;
    return Math.ceil(total/perPage);
  };

  parseUser = () => {
    const { users } = this.props;
    return users.map(({ firstName, lastName, ...rest }) => ({
      name: `${firstName} ${lastName}`,
      ...rest
    }));
  };

  render() {
    const { page } = this.props;
    const { showNewModal } = this.state;
    const pageCount = this.getPageCount();
    const users = this.parseUser();
    const columns = [
      { label: 'name', value: 'name' },
      { label: 'phone', value: 'phoneNumber' },
      { label: 'email', value: 'email' },
      { label: 'location', value: 'location' },
      { label: 'last order', value: 'last_order' },
      { label: 'orders', value: 'orders' },
      { label: 'total spent', value: 'total_spent' }
    ];
    return (
      <Wrapper>
        <CustomersHeader onNew={this.openNewModal} />
        <Row>
          <Col md={8} lg={4} sm={12}>
            <SearchWrapper>
              <AsyncSelect
                components={{
                  Option: CustomerOption,
                  SingleValue: CustomerOptionValue
                }}
                defaultOptions
                loadOptions={this.loadOptions}
                onChange={this.onChangeUser}
              />
            </SearchWrapper>
          </Col>
        </Row>
        <Table
          columns={columns}
          records={users}
          sortColumn="order"
          toDetails={this.toDetails}
          page={page}
          pageCount={pageCount}
          onPageChange={this.changePage}
        />
        <NewCustomerModal open={showNewModal} onClose={this.closeNewModal} />
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ user: { users, page, perPage, total } }) => ({
  users,
  page,
  perPage,
  total
});

const mapDispatchToProps = {
  GetUsers,
  FilterUsers
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Customers));
