import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { Section } from 'components/basic/InfoSection'

import { UpdateOrder } from 'store/actions/orders';

import ProviderInfo from './ProviderInfo';
import ProviderSelector from './ProviderSelector'

class OrderAssignmentSection extends React.Component {
  state = {
    dispatchIds: []
  }

  static getDervidedStateFromProps(props) {
    const { dispatchIds } = get(props, 'currentOrder.data.attributes.dispatchIds', [])
    return { dispatchIds }
  }

  renderDropdownButton = () => {
    const { dispatchIds } = this.props;
    return <ProviderSelector dispatchIds={dispatchIds} />
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

const mapDispatchToProps = { UpdateOrder };

export default connect(mapStateToProps, mapDispatchToProps)(OrderAssignmentSection);