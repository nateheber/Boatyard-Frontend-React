import React from 'react';
import { connect } from 'react-redux';

import InfoSection from './InfoSection';
import CustomerInfoModal from './CustomerInfoModal';

import { updateUsers } from 'reducers/users'

class CustomerInfoSection extends React.Component {
  state = {
    edit: false,
  }
  onSave = (data) => {
    const { customerInfo: { id }, refreshInfo } = this.props;
    this.props.updateUsers({
      id, data,
      callback: refreshInfo,
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
  updateUsers
}

export default connect(null, mapDispatchToProps)(CustomerInfoSection)