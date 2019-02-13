import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { Section } from 'components/basic/InfoSection'

import { DispatchOrder, SetDispatchedFlag } from 'store/actions/orders';

import ProviderInfo from './ProviderInfo';
import ProviderSelector from './ProviderSelector'

class OrderAssignment extends React.Component {
  state = {
    dispatchIds: []
  }

  static getDerivedStateFromProps(props) {
    const providerId = get(props, 'currentOrder.attributes.providerId');
    const orderState = get(props, 'currentOrder.attributes.state');
    if (orderState !== 'dispatched' && providerId) {
      return { dispatchIds: [providerId] };
    }
    const dispatchIds = get(props, 'currentOrder.dispatchIds', []);
    return { dispatchIds };
  }

  updateDispatchIds = (dispatchIds) => {
    const { currentOrder } = this.props;
    const orderId = currentOrder.id;
    const orderState = get(currentOrder, 'attributes.state');
    this.props.DispatchOrder({
      orderId,
      dispatchIds,
      orderState,
      success: () => { this.props.SetDispatchedFlag(true) }
    });
  }

  renderDropdownButton = () => {
    const { dispatchIds } = this.state;
    const providerId = get(this.props, 'currentOrder.attributes.providerId');
    return <ProviderSelector dispatchIds={providerId ? [] : dispatchIds} onChange={this.updateDispatchIds} />
  }

  render() {
    const { dispatchIds } = this.state;
    return (
      <Section title="Assignees" mode="view" editComponent={this.renderDropdownButton()} noPadding>
        {
          dispatchIds.map((id) => (
            <ProviderInfo id={id} key={`provider_${id}`} />
          ))
        }
      </Section>
    );
  }
}

const mapStateToProps = (state) => ({
  currentOrder: state.order.currentOrder
})

const mapDispatchToProps = { DispatchOrder, SetDispatchedFlag };

export default connect(mapStateToProps, mapDispatchToProps)(OrderAssignment);