import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import AsyncSelect from 'react-select/lib/Async';
import { Row, Col } from 'react-flexbox-grid';
import { isNumber } from 'lodash';

import {
  actionTypes,
  GetChildAccounts,
  FilterChildAccounts,
  CreateChildAccount
} from 'store/actions/child-accounts';
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
  padding: 0 30px 15px;
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
    this.props.GetChildAccounts({
      params: { page: page || 1 }
    });
  };

  loadOptions = val => {
    return this.onChangeCustomerFilter(val)
    .then((filtered) => {
      return filtered.map(childAccount => ({
        value: childAccount.id,
        firstName: childAccount.firstName,
        lastName: childAccount.lastName,
        email: childAccount.email
      }));
    }, () => {
      return [];
    });
  };

  onChangeCustomerFilter = val => {
    return new Promise((resolve, reject) => {
      this.props.FilterChildAccounts({
        params: {
          'search_by_full_name': val
        },
        success: resolve,
        error: reject
      });
    });
  };

  onChangeCustomer = (val) => {
    this.props.history.push(`/customer-details/?customer=${val.value}`);
  };

  createCustomer = (data) => {
    const { CreateChildAccount } = this.props;
    CreateChildAccount({
      data: { child_account: { ...data.user } },
      success: () => {
        this.closeNewModal();
        this.loadCustomers();
      },
      error: () => {
        const { errors } = this.props;
        if (errors && errors.length > 0) {
          for (const key in errors) {
            if (isNumber(key)) {
              toastr.error(errors[key].join(''));
            }else {
              toastr.error(key, errors[key].join(''));
            }
          }
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
    const { currentStatus, page, childAccounts } = this.props;
    const { showNewModal } = this.state;
    const pageCount = this.getPageCount();
    const columns = [
      { label: 'name', value: 'attributes.firstName/attributes.lastName' },
      { label: 'phone', value: 'attributes.phoneNumber' },
      { label: 'email', value: 'attributes.email' },
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
                onChange={this.onChangeCustomer}
              />
            </SearchWrapper>
          </Col>
        </Row>
        <Table
          columns={columns}
          records={childAccounts}
          sortColumn="order"
          toDetails={this.toDetails}
          page={page}
          pageCount={pageCount}
          onPageChange={this.changePage}
        />
        <CustomerModal
          open={showNewModal}
          loading={currentStatus === actionTypes.CREATE_CHILD_ACCOUNT}
          onClose={this.closeNewModal}
          onSave={this.createCustomer}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  currentStatus: state.childAccount.currentStatus,
  childAccounts: state.childAccount.childAccounts,
  page: state.childAccount.page,
  perPage: state.childAccount.perPage,
  total: state.childAccount.total,
  errors: state.childAccount.errors
});

const mapDispatchToProps = {
  GetChildAccounts,
  FilterChildAccounts,
  CreateChildAccount
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Customers));
