import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col } from 'react-flexbox-grid';
import { isEmpty } from 'lodash';

import { GetUsers } from 'store/actions/users';
import Table from 'components/basic/Table';
import { UsersHeader } from 'components/compound/SectionHeader';
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


class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      sort: { col: 'last_name', direction: 'asc' },
    };
  }

  componentDidMount() {
    this.loadPage(1);
  }

  onAdd = () => {
    this.props.history.push(`/user-details/`);
  };

  toDetails = user => {
    this.props.history.push(`/user-details?user=${user.id}`);
  };


  loadPage = (page) => {
    const { keyword } = this.state;
    const { GetUsers } = this.props;
    const { sort } = this.state;
    const params = isEmpty(keyword) ? {
      page: page,
      'user[sort]': sort.direction,
      'user[order]': sort.col
    } : {
      page: page,
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

  handleInputChange = (keyword) => {
    this.setState({ keyword }, () => {
      this.loadPage(1);
    });
  };

  render() {
    const columns = [
      { label: 'name', value: 'firstName/lastName', sort: 'last_name' },
      { label: 'email', value: 'email', sort: 'email' },
      { label: 'contact number', value: 'phoneNumber', sort: 'phone_number' }
    ];
    const { sort } = this.state;
    const { users } = this.props;
    return (
      <Wrapper>
        <UsersHeader onAdd={this.onAdd} />
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
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ user: { users } }) => ({ users });
const mapDispatchToProps = {
  GetUsers
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Users)
);
