import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col } from 'react-flexbox-grid';
import { isEmpty } from 'lodash';
import {
  actionTypes,
  GetChildAccounts,
  FilterChildAccounts,
  CreateChildAccount
} from 'store/actions/child-accounts';
import { CreateBoat } from 'store/actions/boats';
import Table from 'components/basic/Table';
import CustomerModal from 'components/template/CustomerInfoSection/CustomerModal';
import { CustomersHeader } from '../components/CustomersHeader';
import { SearchBox } from 'components/basic/Input';

const Wrapper = styled.div`
  height: 100%;
  background-color: white;
`;

const SearchSection = styled(Row)`
  border-top: 1px solid #D5DBDE;
  border-bottom: 1px solid #D5DBDE;
  margin: 0 0 20px 0 !important;
`;

const SearchCotainer = styled(Col)`
  padding: 24px 20px;
  width: 305px;
`;

class Customers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewModal: false,
      sort: { col: 'last_name', direction: 'asc' },
    };
  }

  componentDidMount() {
    this.loadPage(1);
  }


  loadPage = (page) => {
    const { keyword } = this.state;
    const { GetChildAccounts } = this.props;
    const { sort } = this.state;
    const params = isEmpty(keyword) ? {
      page: page,
      'child_account[sort]': sort.direction,
      'child_account[order]': sort.col
    } : {
      page: page,
      'child_account[sort]': sort.direction,
      'child_account[order]': sort.col,
      search_by_full_name: keyword
    };
    GetChildAccounts({ params });
  };

  onSortChange = (sort) => {
    this.setState({ sort: sort }, () => {
      this.loadPage(1);
    });
  };

  handleInputChange = (keyword) => {
    this.setState({ keyword }, () => {
      this.loadPage(1);
    });
  };

  onChangeCustomer = (val) => {
    this.props.history.push(`/customer-details/?customer=${val.value}`);
  };

  createCustomer = (data) => {
    const { CreateChildAccount } = this.props;
    CreateChildAccount({
      data: { child_account: { ...data.user } },
      success: (result) => {
        //console.log(result);
        const boats = data.externalBoats;
        this.createBoats(boats, result.id);
        this.closeNewModal();
        this.loadPage(1);
      },
      error: (e) => {
        toastr.error('Error', e.message);
      }
    });
  };

  createBoats = (data, id) => {
    const { CreateBoat } = this.props;
    data.forEach(boat => {
      const boat_data = {
        name: boat.boatName || 'User\'s Boat',
        year: boat.year || '',
        model: boat.model || '',
        length: boat.length || '',
        make: boat.manufacturer || boat.brand || '',
        is_default: false,
        child_account_id: id

      }
      CreateBoat({
        data: { boat: boat_data },
        success: () => {
          console.log("Boat added...");
        },
        error: (e) => {
          console.log("Error on adding boat...");
        }
      });
    });
  }

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

  toDetails = customer => {
    this.props.history.push(`/customer-details/?customer=${customer.id}`);
  };

  changePage = (page) => {
    this.loadPage(page);
  };

  getPageCount = () => {
    const { perPage, total } = this.props;
    return Math.ceil(total/perPage);
  };

  render() {
    const { currentStatus, page, childAccounts, showAdditionalFields } = this.props;
    const { showNewModal, sort } = this.state;
    const pageCount = this.getPageCount();
    const columns = [
      { label: 'name', value: 'firstName/lastName', sort: 'last_name' },
      { label: 'phone', value: 'phoneNumber', sort: 'phone_number', isPhone: true },
      { label: 'email', value: 'email', sort: 'email' },
      { label: 'location', value: 'location' },
      { label: 'last order', value: 'lastOrder' },
      { label: 'orders', value: 'orders' },
      { label: 'total spent', value: 'totalSpent' }
    ];
    return (
      <Wrapper>
        <CustomersHeader onNew={this.openNewModal} />
        <SearchSection>
          <SearchCotainer>
            <SearchBox placeholder="SEARCH CUSTOMERS" onChange={this.handleInputChange} />
          </SearchCotainer>
        </SearchSection>
        <Table
          columns={columns}
          records={childAccounts}
          sort={sort}
          onSortChange={this.onSortChange}
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
          showAdditionalFields={showAdditionalFields}
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
  //showAdditionalFields: state.auth.providerName === 'MarineMax',
  showAdditionalFields: state.auth.providerId === 2
});

const mapDispatchToProps = {
  GetChildAccounts,
  FilterChildAccounts,
  CreateChildAccount, 
  CreateBoat
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Customers));
