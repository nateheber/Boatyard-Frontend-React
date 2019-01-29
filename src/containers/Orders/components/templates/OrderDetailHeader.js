import React from 'react'
import { connect } from 'react-redux'
import AsyncSelect from 'react-select/lib/Async'
import { Row, Col } from 'react-flexbox-grid'
import { withRouter } from 'react-router-dom'
import { get, findIndex } from 'lodash'
import styled from 'styled-components'

import { ActionDropdown } from 'components/basic/Dropdown'
import { PageTitle } from 'components/basic/Typho'
import ProviderOption from 'components/basic/ProviderOption';
import ProviderOptionValue from 'components/basic/ProviderOptionValue';

import { FilterProviders } from 'store/actions/providers'
import { UpdateOrder, DeleteOrder } from 'store/actions/orders'

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
    const { orderId } = this.props
    this.props.UpdateOrder({ orderId, data: { providerId: val.id } })
  }

  cancelOrder = () => {
    const { orderId } = this.props
    this.props.UpdateOrder({ orderId, data: { state: 'canceled' } })
  }

  deleteOrder = () => {
    const { orderId } = this.props
    this.props.DeleteOrder(orderId)
    this.props.history.push('/orders/')
  }

  getCustomerName = () => {
    const included = get(this.props.currentOrder, 'included', [])
    const idx = findIndex(included, item => item.type === 'users');
    return `${get(included, `[${idx}].attributes.firstName`)} ${get(included, `[${idx}].attributes.lastName`)}`;
  }

  getOrderStatus = () => {
    const { currentOrder: { data } } = this.props
    const id = get(data, 'id', 'Unknown');
    const attributes = get(data, 'attributes')
    const time = get(attributes, 'createdAt', new Date())
    const customerName = this.getCustomerName()
    const total = get(attributes, 'total')
    const scheduledAt = get(attributes, 'scheduledAt')
    const status = get(attributes, 'state')
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
    return (
      <OrderStatus {...orderStatus} />
    )
  }

  render() {
    const { orderId } = this.props;
    return (
      <SectionHeaderWrapper>
        <Row style={{ width: '100%', padding: '0px 30px', alignItems: 'center' }}>
          <PageTitle>Orders #{orderId}</PageTitle>
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
            <AsyncSelect
              components={{
                Option: ProviderOption,
                SingleValue: ProviderOptionValue
              }}
              defaultOptions
              placeholder="Search & Assign Provider"
              loadOptions={this.loadOptions}
              onChange={this.onChangeProvider}
            />
          </Col>
        </Row>
        {
          this.renderStatus()
        }
      </SectionHeaderWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  currentOrder: state.order.currentOrder
})

const mapDispatchToProps = {
  FilterProviders,
  UpdateOrder,
  DeleteOrder,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderHeader));
