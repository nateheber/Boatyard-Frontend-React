import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { actionTypes, GetServices, UpdateService } from 'store/actions/services';


class ServiceSelector extends React.Component {
  componentDidMount() {
    const { currentProvider } = this.props;
    console.log(currentProvider);
  }

  render() {
    return false;
  }
}

const mapStateToProps = ({
  service: { services, currentStatus, page, perPage, total },
  provider: { currentProvider },
}) => ({
  services,
  currentStatus,
  page,
  perPage,
  total,
  currentProvider,
});

const mapDispatchToProps = {
  GetServices,
  UpdateService,
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceSelector);
