import React from 'react';
import { connect } from 'react-redux';

import InfoSection from './InfoSection';
import CustomerInfoModal from './CustomerInfoModal';

import { UpdateUser } from 'store/actions/users'

class CustomerInfoSection extends React.Component {
  state = {
    edit: false,
  }
  onSave = (data) => {
    const { customerInfo: { id }, refreshInfo, UpdateUser } = this.props;
    UpdateUser({
      userId: id, data,
      success: refreshInfo
    })
    this.hideModal();
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
    const { customerInfo } = this.props;
    const { edit } = this.state;
    return (
      <React.Fragment>
        <InfoSection {...customerInfo} onEdit={this.showModal} />
        <CustomerInfoModal open={edit} customerInfo={customerInfo} onClose={this.hideModal} onSave={this.onSave} />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  UpdateUser
}

export default connect(null, mapDispatchToProps)(CustomerInfoSection)