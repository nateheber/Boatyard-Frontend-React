import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import { actionTypes as childActions, UpdateChildAccount } from 'store/actions/child-accounts';
import { actionTypes as userActions, UpdateUser } from 'store/actions/users';
import InfoSection from './InfoSection';
import CustomerModal from './CustomerModal';

class CustomerInfoSection extends React.Component {
  state = {
    edit: false,
  }
  onSave = (data) => {
    const { customerInfo: { id, type }, refreshInfo, UpdateChildAccount, UpdateUser } = this.props;
    if (type === 'users') {
      const user = data.user;
      if (user.hasOwnProperty('locations_attributes')) {
        delete user['locations_attributes'];
      }
      UpdateUser({
        userId: id, data: { user },
        success: (currentUser) => {
          this.hideModal();
          refreshInfo(currentUser);
        },
        error: (e) => {
          toastr.error('Error', e.message);
        }
      });  
    } else {
      UpdateChildAccount({
        childAccountId: id, data: { child_account: { ...data.user } },
        success: () => {
          this.hideModal();
          refreshInfo();
        },
        error: (e) => {
          toastr.error('Error', e.message);
        }
      });  
    }
  };

  showModal = () => {
    this.setState({
      edit: true,
    })
  };

  hideModal = () => {
    this.setState({
      edit: false,
    })
  };

  render() {
    const { type, customerInfo, childStatus, userStatus } = this.props;
    const { edit } = this.state;
    return (
      <React.Fragment>
        <InfoSection {...customerInfo} onEdit={this.showModal} />
        <CustomerModal
          title={type === 'user' ? 'Edit User' : 'Edit Customer'}
          open={edit}
          loading={childStatus === childActions.UPDATE_CHILD_ACCOUNT || userStatus === userActions.UPDATE_USER}
          customerInfo={customerInfo}
          onClose={this.hideModal}
          onSave={this.onSave}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  childStatus: state.childAccount.currentStatus,
  userStatus: state.user.currentStatus
});

const mapDispatchToProps = {
  UpdateChildAccount,
  UpdateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerInfoSection);