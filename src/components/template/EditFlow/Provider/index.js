import React from 'react';
import { connect } from 'react-redux';

import ProfileStep from './ProfileStep';

import { createProvider } from '../../../../reducers/providers';

class CreateProvider extends React.Component {
  onSave = data => {
    this.props.createProvider(data);
  };
  render() {
    return <ProfileStep onSave={this.onSave} />;
  }
}

const mapDispatchToProps = {
  createProvider
};

export default connect(
  null,
  mapDispatchToProps
)(CreateProvider);
