import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import Table from 'components/basic/Table';
import { UsersHeader } from 'components/compound/SectionHeader';

import { fetchUsers } from 'reducers/users';

const Wrapper = styled.div`
  height: 100%;
  background-color: white;
`;

class Users extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  onAdd = () => {
    this.props.history.push(`/user-details/`);
  };
  toDetails = userId => {
    this.props.history.push(`/user-details?user=${userId}`);
  };
  render() {
    const columns = [
      { label: 'first name', value: 'firstName' },
      { label: 'last name', value: 'lastName' },
      { label: 'email', value: 'email' },
      { label: 'contact number', value: 'phoneNumber' }
    ];
    const { users } = this.props;
    console.log(users);
    return (
      <Wrapper>
        <UsersHeader onAdd={this.onAdd} />
        <Table
          columns={columns}
          records={users}
          sortColumn="order"
          toDetails={this.toDetails}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ user: { users } }) => ({ users });
const mapDispatchToProps = {
  fetchUsers
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Users)
);
