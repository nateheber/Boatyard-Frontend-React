import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { findIndex } from 'lodash';

import { UserEditor } from './Editors';

import { updateUsers, createUsers } from 'reducers/users';
import { setErrorState, resetErrorState } from 'reducers/appstate';

class UserDetails extends React.Component {
  constructor(props) {
    super(props);
    const query = queryString.parse(props.location.search);
    const userId = query.user;
    const idx = findIndex(props.users, user => user.id === userId);
    const userDetail = props.users[idx];
    if (userId) {
      this.state = {
        userId,
        ...userDetail
      };
    } else {
      this.state = {
        userId: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
      };
    }
  }
  onSave = data => {
    const { firstName, lastName, email, phoneNumber } = this.state;
    const { setErrorState, resetErrorState } = this.props;
    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      phoneNumber === ''
    ) {
      setErrorState('Please fill out all the required fields');
      setTimeout(resetErrorState, 3000);
    } else {
      if (this.state.userId) {
        this.props.updateUsers({
          id: this.state.userId,
          data: {
            user: data
          }
        });
        this.props.history.goBack();
      } else {
        this.props.createUsers(data);
      }
    }
  };
  onCancel = () => {
    this.props.history.goBack();
  };
  render() {
    return (
      <UserEditor
        {...this.state}
        onCancel={this.onCancel}
        onSave={this.onSave}
      />
    );
  }
}

const mapStateToProps = ({ user: { users } }) => ({
  users
});

const mapDispatchToProps = {
  updateUsers,
  createUsers,
  setErrorState,
  resetErrorState
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserDetails)
);
