import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col } from 'react-flexbox-grid';
import { isEmpty } from 'lodash';
import { toastr } from 'react-redux-toastr';

import { actionTypes, CreateUser, GetUsers } from 'store/actions/users';
import Table from 'components/basic/Table';
import { UsersHeader } from 'components/compound/SectionHeader';
import { SearchBox } from 'components/basic/Input';
import CustomerModal from 'components/template/CustomerInfoSection/CustomerModal';

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


class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      sort: { col: 'last_name', direction: 'asc' },
      visibleOfModal: false
    };
  }

  componentDidMount() {
    this.loadPage(1);
  }

  toDetails = user => {
    this.props.history.push(`/user-details?user=${user.id}`);
  };


  loadPage = (page) => {
    const { keyword } = this.state;
    const { GetUsers } = this.props;
    const { sort } = this.state;
    const params = isEmpty(keyword) ? {
      page,
      'user[sort]': sort.direction,
      'user[order]': sort.col
    } : {
      page,
      'user[sort]': sort.direction,
      'user[order]': sort.col,
      search_by_full_name: keyword
    };
    GetUsers({ params });
  };

  onSortChange = (sort) => {
    this.setState({ sort: sort }, () => {
      this.loadPage(1);
    });
  };

  getPageCount = () => {
    const { perPage, total } = this.props;
    return Math.ceil(total/perPage);
  };

  changePage = (page) => {
    this.loadPage(page);
  };

  handleInputChange = (keyword) => {
    this.setState({ keyword }, () => {
      this.loadPage(1);
    });
  };

  hideModal = () => {
    this.setState({
      visibleOfModal: false,
    });
  };

  showModal = () => {
    this.setState({
      visibleOfModal: true,
    });
  };

  onSave = (data) => {
    const { CreateUser, page } = this.props;
    CreateUser({
      data: {
        user: {
        ...data.user,
        password: Math.random().toString(36).slice(-8)
        }
      },
      success: () => {
        this.hideModal();
        this.loadPage(page);
      },
      error: (e) => {
        toastr.error('Error', e.message);
      }
    });
  };

  render() {
    const columns = [
      { label: 'name', value: 'firstName/lastName', sort: 'last_name' },
      { label: 'email', value: 'email', sort: 'email' },
      { label: 'contact number', value: 'phoneNumber', sort: 'phone_number' }
    ];
    const { sort, visibleOfModal } = this.state;
    const { users, currentStatus, page } = this.props;
    const pageCount = this.getPageCount();
    return (
      <Wrapper>
        <UsersHeader onAdd={this.showModal} />
        <SearchSection>
          <SearchCotainer>
            <SearchBox placeholder="SEARCH USERS" onChange={this.handleInputChange} />
          </SearchCotainer>
        </SearchSection>
        <Table
          columns={columns}
          records={users}
          sort={sort}
          onSortChange={this.onSortChange}
          toDetails={this.toDetails}
          page={page}
          pageCount={pageCount}
          onPageChange={this.changePage}
        />
        {visibleOfModal && <CustomerModal
          title="Add New User"
          open={visibleOfModal}
          loading={currentStatus === actionTypes.CREATE_USER}
          onClose={this.hideModal}
          onSave={this.onSave}
        />}
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ user: { users, currentStatus, page,perPage ,total } }) => ({
  users,
  currentStatus,
  page,
  perPage,
  total
});
const mapDispatchToProps = {
  CreateUser,
  GetUsers
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Users)
);
