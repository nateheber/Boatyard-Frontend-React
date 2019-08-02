import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { Section } from 'components/basic/InfoSection';

import { DispatchOrder, SetDispatchedFlag } from 'store/actions/orders';
import ProviderInfo from './ProviderInfo';
import TeamMemberInfo from './TeamMemberInfo';
import ProviderSelector from './ProviderSelector';
import TeamMemberSelector from './TeamMemberSelector';

class OrderAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dispatchIds: []
    };
  }

  static getDerivedStateFromProps(props) {
    const providerId = get(props, 'currentOrder.attributes.providerId');
    const orderState = get(props, 'currentOrder.attributes.state');
    const { privilege } = props;
    if (privilege === 'admin') {
      if (orderState !== 'dispatched' && providerId) {
        return { dispatchIds: [providerId] };
      }
      const dispatchIds = get(props, 'currentOrder.dispatchIds', []);
      return { dispatchIds };
    } else {
      return { dispatchIds: [] };
    }
  }

  updateDispatchIds = (dispatchIds) => {
    const { privilege, currentOrder } = this.props;
    const orderId = currentOrder.id;
    const orderState = get(currentOrder, 'attributes.state');
    if (privilege === 'admin') {
      this.props.DispatchOrder({
        orderId,
        dispatchIds,
        orderState,
        success: () => { this.props.SetDispatchedFlag(true) }
      });
    } else {
    }
  };

  renderDropdownButton = () => {
    const { dispatchIds } = this.state;
    const { privilege, currentOrder } = this.props;
    const providerId = get(currentOrder, 'attributes.providerId');
    if (privilege === 'admin') {
      return <ProviderSelector dispatchIds={providerId ? [providerId] : dispatchIds} onChange={this.updateDispatchIds} />
    } else if ( privilege === 'provider') {
      return <TeamMemberSelector dispatchIds={[]} onChange={this.updateDispatchIds} />
    }
  };

  render() {
    const { dispatchIds } = this.state;
    const { privilege } = this.props;
    return (
      <Section title="Assignees" mode="view" editComponent={this.renderDropdownButton()} noPadding>
        {
          dispatchIds.map((id) => (
            <React.Fragment key={`assignee_${id}`}>
              {privilege === 'admin' && <ProviderInfo id={id} />}
              {privilege === 'provider' && <TeamMemberInfo id={id} />}
            </React.Fragment>
          ))
        }
      </Section>
    );
  }
}

const mapStateToProps = (state) => ({
  currentOrder: state.order.currentOrder,
  privilege: state.auth.privilege
})

const mapDispatchToProps = { DispatchOrder, SetDispatchedFlag };

export default connect(mapStateToProps, mapDispatchToProps)(OrderAssignment);