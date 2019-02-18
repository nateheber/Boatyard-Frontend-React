import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { findIndex } from 'lodash';
import { toastr } from 'react-redux-toastr';
import { decamelize } from '@ridi/object-case-converter';

import { UserEditor } from './Editors';

import { UpdateUser, CreateUser } from 'store/actions/users';

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
    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      phoneNumber === ''
    ) {
      toastr.clean()
      toastr.error('Please fill out all the required fields')
    } else {
      let userData = decamelize(data, { recursive: true });
      if (this.state.userId) {
        this.props.UpdateUser({
          userId: this.state.userId,
          data: {
            user: userData
          }
        });
        this.props.history.goBack();
      } else {
        this.props.CreateUser({ data: { user: userData } });
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
  UpdateUser,
  CreateUser
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserDetails)
);
