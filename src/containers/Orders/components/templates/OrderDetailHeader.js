import React from 'react'
import { connect } from 'react-redux'
import AsyncSelect from 'react-select/lib/Async'
import { Row, Col } from 'react-flexbox-grid'
import { withRouter } from 'react-router-dom'
import { get } from 'lodash'
import styled from 'styled-components'

import { FilterProviders } from 'store/actions/providers'
import { UpdateOrder, DeleteOrder } from 'store/actions/orders'
import { getCustomerName } from 'utils/order'

import { ActionDropdown } from 'components/basic/Dropdown'
import { PageTitle } from 'components/basic/Typho'
import ProviderOption from 'components/basic/ProviderOption';
import ProviderOptionValue from 'components/basic/ProviderOptionValue';
import OrderStatus from './OrderStatus'


const SectionHeaderWrapper = styled.div`
  box-sizing: border-box;
  background-color: #fff;
  width: 100%;
`;

class OrderHeader extends React.Component {

  loadOptions = val => {
    return this.onChangeProviderFilter(val)
      .then(
        (filtered) => filtered.map(({ id, attributes }) => ({id, ...attributes })),
        () => {
          return [];
        }
      )
  }

  onChangeProviderFilter = val => {
    return new Promise((resolve, reject) => {
      this.props.FilterProviders({
        params : {
          'provider[name]': val,
        },
        success: resolve,
        error: reject
      });
    })
  };

  onChangeProvider = val => {
    const { order } = this.props
    this.props.UpdateOrder({ orderId: order.id, data: { providerId: val.id } })
  }

  cancelOrder = () => {
    const { order } = this.props;
    this.props.UpdateOrder({ orderId: order.id, data: { state: 'canceled' } })
  }

  deleteOrder = () => {
    const { order } = this.props;
    this.props.DeleteOrder({ orderId: order.id });
    this.props.history.push('/orders/');
  }

  getOrderStatus = () => {
    const { order } = this.props;
    const customerName = getCustomerName(order);
    const id = get(order, 'id', 'Unknown');
    const time = get(order, 'attributes.createdAt', new Date());
    const total = get(order, 'attributes.total');
    const scheduledAt = get(order, 'attributes.scheduledAt');
    const status = get(order, 'attributes.state');
    return ({
      id,
      time,
      customerName,
      total,
      scheduledAt,
      status,
    })
  }

  renderStatus = () => {
    const orderStatus = this.getOrderStatus();
    console.log()
    return (
      <OrderStatus {...orderStatus} />
    )
  }

  render() {
    const { order, privilege } = this.props;
    return (
      <SectionHeaderWrapper>
        <Row style={{ width: '100%', padding: '0px 30px', alignItems: 'center' }}>
          <PageTitle>Orders #{order.id}</PageTitle>
          <ActionDropdown
            items={[
              {
                title: 'Delete Order',
                action: this.deleteOrder
              },
              {
                title: 'Cancel Order',
                action: this.cancelOrder,
              }
            ]}
          />
          <Col sm={6} md={3} lg={3}>
            {privilege === 'admin' && <AsyncSelect
              components={{
                Option: ProviderOption,
                SingleValue: ProviderOptionValue
              }}
              defaultOptions
              placeholder="Search & Assign Provider"
              loadOptions={this.loadOptions}
              onChange={this.onChangeProvider}
            />}
          </Col>
        </Row>
        {
          this.renderStatus()
        }
      </SectionHeaderWrapper>
    )
  }
}

const mapStateToProps = state => ({
  privilege: state.auth.privilege,
})

const mapDispatchToProps = {
  FilterProviders,
  UpdateOrder,
  DeleteOrder,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderHeader));
