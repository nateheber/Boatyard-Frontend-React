import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import AsyncSelect from 'react-select/lib/Async';
import { Row, Col } from 'react-flexbox-grid';

import { actionTypes, GetUsers, FilterUsers, CreateUser } from 'store/actions/users';
import Table from 'components/basic/Table';
import CustomerOption from 'components/basic/CustomerOption';
import CustomerOptionValue from 'components/basic/CustomerOptionValue';
import CustomerModal from 'components/template/CustomerInfoSection/CustomerModal';
import { CustomersHeader } from '../components/CustomersHeader';

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
      showNewModal: false
    };
  }

  componentDidMount() {
    this.loadCustomers();
  }

  loadCustomers = (page) => {
    this.props.GetUsers({
      params: { page: page || 1 }
    });
  };

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
    });
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

  createCustomer = (data) => {
    const { CreateUser } = this.props;
    CreateUser({
      data,
      success: () => {
        this.hideModal();
        this.loadCustomers();
      },
      error: () => {
        const { errors } = this.props;
        console.log('----------error---------', errors);
        if (errors && errors.length > 0) {
          toastr.error(errors[0].message);
        }
      }
    });
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
    this.loadCustomers(page);
  };

  getPageCount = () => {
    const { perPage, total } = this.props;
    return Math.ceil(total/perPage);
  };

  render() {
    const { currentStatus, page, users } = this.props;
    const { showNewModal } = this.state;
    const pageCount = this.getPageCount();
    const columns = [
      { label: 'name', value: 'firstName/lastName' },
      { label: 'phone', value: 'phoneNumber' },
      { label: 'email', value: 'email' },
      { label: 'location', value: 'location' },
      { label: 'last order', value: 'lastOrder' },
      { label: 'orders', value: 'orders' },
      { label: 'total spent', value: 'totalSpent' }
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
        <CustomerModal
          open={showNewModal}
          loading={currentStatus === actionTypes.CREATE_USER}
          onClose={this.closeNewModal}
          onSave={this.createCustomer}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  currentStatus: state.user.currentStatus,
  users: state.user.users,
  page: state.user.page,
  perPage: state.user.perPage,
  total: state.user.total,
  errors: state.user.errors
});

const mapDispatchToProps = {
  GetUsers,
  FilterUsers,
  CreateUser
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Customers));
