import React from 'react';
import { connect } from 'react-redux';
import { get, find } from 'lodash';
import { toastr } from 'react-redux-toastr';
import { Section } from 'components/basic/InfoSection';

import { UpdateOrder } from 'store/actions/orders';
import { simpleProviderLocationSelector } from 'store/selectors/providerLocation';
import ProviderInfo from './ProviderInfo';
import TeamMemberInfo from './TeamMemberInfo';
import ProviderSelector from './ProviderSelector';
import AssigneeSelector from './AssigneeSelector';

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

  updateOrder = (fieldName, value) => {
    const { currentOrder: {id: orderId} } = this.props;
    const data = {};
    data[fieldName] = value;
    if (fieldName === 'provider_location_id') {
      data['assigned_team_member_id'] = null;
    }

    this.props.UpdateOrder({
      orderId,
      data,
      success: () => toastr.success('Success', "Successfully assigned!"),
      error: (e) => {
        toastr.error('Error', e.message);
      }
    });
  };

  renderDropdownButton = () => {
    const { dispatchIds } = this.state;
    const { privilege, currentOrder, providerLocationId, providerLocations, teamMemberData } = this.props;
    const providerId = get(currentOrder, 'attributes.providerId');
    if (privilege === 'admin') {
      return <ProviderSelector dispatchIds={providerId ? [providerId] : dispatchIds} onChange={this.updateDispatchIds} />
    } else if ( privilege === 'provider') {
      let options = providerLocations;
      let value = get(currentOrder, 'attributes.providerLocationId');
      let labelField = 'name';
      if (providerLocationId) {
        options = teamMemberData;
        value = get(currentOrder, 'attributes.assignedTeamMemberId');
        labelField = 'fullName';
      }
      return <AssigneeSelector
        value={value}
        options={options}
        labelField={labelField}
        onChange={
          value => this.updateOrder(
            labelField === 'name' ? 'provider_location_id' : 'assigned_team_member_id',
            value
          )
        }
      />
    }
  };

  render() {
    // const { dispatchIds } = this.state;
    const { privilege, teamMemberData, providerLocations, currentOrder: {attributes: {providerLocationId, assignedTeamMemberId}} } = this.props;
    console.log(providerLocations);
    const providerLocationInfo = find(providerLocations, {id: `${providerLocationId}`});
    const teamMemberInfo = find(teamMemberData, {id: `${assignedTeamMemberId}`});
    return (
      <Section title="Assignee" mode="view" editComponent={this.renderDropdownButton()}>
          {privilege === 'admin' && <ProviderInfo/>}
          {privilege === 'provider' && <TeamMemberInfo providerLocationInfo={providerLocationInfo} teamMemberInfo={teamMemberInfo} />}
      </Section>
    );
  }
}

const mapStateToProps = (state) => ({
  currentOrder: state.order.currentOrder,
  teamMemberData: state.order.teamMemberData,
  privilege: state.auth.privilege,
  providerLocationId: state.auth.providerLocationId,
  providerLocations: simpleProviderLocationSelector(state),
})

const mapDispatchToProps = { UpdateOrder };

export default connect(mapStateToProps, mapDispatchToProps)(OrderAssignment);
