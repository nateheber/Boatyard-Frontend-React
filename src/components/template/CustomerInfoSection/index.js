import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import {isNumber } from 'lodash';

import { actionTypes, UpdateChildAccount } from 'store/actions/child-accounts'
import InfoSection from './InfoSection';
import CustomerModal from './CustomerModal';

class CustomerInfoSection extends React.Component {
  state = {
    edit: false,
  }
  onSave = (data) => {
    const { customerInfo: { id }, refreshInfo, UpdateChildAccount } = this.props;
    UpdateChildAccount({
      childAccountId: id, data: { child_account: { ...data.user } },
      success: () => {
        this.hideModal();
        refreshInfo();
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
    })
  }
  showModal = () => {
    this.setState({
      edit: true,
    })
  }
  hideModal = () => {
    this.setState({
      edit: false,
    })
  }
  render() {
    const { customerInfo, currentStatus } = this.props;
    const { edit } = this.state;
    return (
      <React.Fragment>
        <InfoSection {...customerInfo} onEdit={this.showModal} />
        <CustomerModal
          title="Edit Customer"
          open={edit}
          loading={currentStatus === actionTypes.UPDATE_CHILD_ACCOUNT}
          customerInfo={customerInfo}
          onClose={this.hideModal}
          onSave={this.onSave}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  currentStatus: state.childAccount.currentStatus,
  errors: state.childAccount.errors
});

const mapDispatchToProps = {
  UpdateChildAccount
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerInfoSection);