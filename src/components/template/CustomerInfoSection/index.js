import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import {isNumber } from 'lodash';

import { actionTypes, UpdateUser } from 'store/actions/users'
import InfoSection from './InfoSection';
import CustomerModal from './CustomerModal';

class CustomerInfoSection extends React.Component {
  state = {
    edit: false,
  }
  onSave = (data) => {
    const { customerInfo: { id }, refreshInfo, UpdateUser } = this.props;
    UpdateUser({
      userId: id, data,
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
          loading={currentStatus === actionTypes.UPDATE_USER}
          customerInfo={customerInfo}
          onClose={this.hideModal}
          onSave={this.onSave}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  currentStatus: state.user.currentStatus,
  errors: state.user.errors
});

const mapDispatchToProps = {
  UpdateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerInfoSection);