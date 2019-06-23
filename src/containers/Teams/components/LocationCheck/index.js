import React from 'react';
import { connect } from 'react-redux';

import { CheckField } from 'components/basic/Input';
import { GetProvider } from 'store/actions/providers';

class LocationCheck extends React.Component {

  render() {
    const { checked, title, onClick } = this.props;
    return (
      <CheckField title={title} checked={checked} onClick={onClick}/>
    );
  }
}

const mapDispatchToProps = {
  GetProvider
};

export default connect(null, mapDispatchToProps)(LocationCheck);
