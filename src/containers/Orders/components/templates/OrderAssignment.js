import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { Section } from 'components/basic/InfoSection'

import { UpdateOrder, SetDispatchedFlag } from 'store/actions/orders';

import ProviderInfo from './ProviderInfo';
import ProviderSelector from './ProviderSelector'

class OrderAssignment extends React.Component {
  state = {
    dispatchIds: []
  }

  static getDerivedStateFromProps(props) {
    const providerId = get(props, 'currentOrder.attributes.providerId');
    if (providerId) {
      return { dispatchIds: [providerId] };
    }
    const dispatchIds = get(props, 'currentOrder.dispatchIds', []);
    return { dispatchIds };
  }

  updateDispatchIds = (dispatchIds) => {
    const { currentOrder } = this.props;
    const orderId = currentOrder.id;
    this.props.UpdateOrder({
      orderId,
      data: { order: { dispatchIds }},
      dispatched: true,
      success: () => { this.props.SetDispatchedFlag(true) }
    });
  }

  renderDropdownButton = () => {
    const { dispatchIds } = this.state;
    return <ProviderSelector dispatchIds={dispatchIds} onChange={this.updateDispatchIds} />
  }

  render() {
    const { dispatchIds } = this.state;
    return (
      <Section title="Assignees" mode="view" editComponent={this.renderDropdownButton()} noPadding>
        {
          dispatchIds.map((id, key) => (
            <ProviderInfo id={id} key={`provider_${key}`} />
          ))
        }
      </Section>
    );
  }
}

const mapStateToProps = (state) => ({
  currentOrder: state.order.currentOrder
})

const mapDispatchToProps = { UpdateOrder, SetDispatchedFlag };

export default connect(mapStateToProps, mapDispatchToProps)(OrderAssignment);