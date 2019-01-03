import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import styled from 'styled-components';

import { getOrder } from 'reducers/orders';

class OrderDetails extends React.Component {
  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    const orderId = query.order;
    this.props.getOrder(orderId);
  }
  render() {
    return false;
  }
}

const mapStateToProps = ({ order: { currentOrder } }) => ({
  currentOrder
});

const mapDispatchToProps = {
  getOrder
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetails);
