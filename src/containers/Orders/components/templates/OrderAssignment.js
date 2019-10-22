import React from 'react';
import { connect } from 'react-redux';
import { get, find } from 'lodash';
import { toastr } from 'react-redux-toastr';
import { Section } from 'components/basic/InfoSection';
import { GetProviderLocations } from 'store/actions/providerLocations';
import { UpdateOrder, DispatchOrder } from 'store/actions/orders';
import { simpleProviderLocationSelector } from 'store/selectors/providerLocation';
import AssigneeInfo from './AssigneeInfo';
import ProviderInfo from './ProviderInfo';
import ProviderSelector from './ProviderSelector';
import AssigneeSelector from './AssigneeSelector';

class OrderAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dispatchIds: []
    };
  }

  componentDidMount() {
    const { providerId, providerLocations } = this.props;
    if (providerLocations.length === 0 || find(providerLocations, pl => `${pl.providerId}` !== `${providerId}` )) {
      this.props.GetProviderLocations({providerId, params:{ page: 1, per_page: 1000}});
    }
  }

  static getDerivedStateFromProps(props) {
    const providerLocationId = get(props, 'currentOrder.attributes.providerId');
    const orderState = get(props, 'currentOrder.attributes.state');
    const { privilege } = props;
    if (privilege === 'admin') {
      if (orderState !== 'dispatched' && providerLocationId) {
        return { dispatchIds: [providerLocationId] };
      }
      const dispatchIds = get(props, 'currentOrder.dispatchIds', []);
      return { dispatchIds };
    } else {
      return { dispatchIds: [] };
    }
  }

  updateOrder = (fieldName, value) => {
    const { currentOrder: {id: orderId}, UpdateOrder } = this.props;
    const data = {};
    data[fieldName] = value;
    if (fieldName === 'provider_location_id') {
      data['assigned_team_member_id'] = null;
    }

    UpdateOrder({
      orderId,
      data,
      success: () => toastr.success('Success', "Successfully assigned!"),
      error: (e) => {
        toastr.error('Error', e.message);
      }
    });
  };

  updateDispatchIds = (dispatchIds) => {
    const { currentOrder, DispatchOrder } = this.props;
    const orderId = currentOrder.id;
    const orderState = get(currentOrder, 'attributes.state');
    DispatchOrder({
      orderId,
      dispatchIds,
      orderState,
      success: () => { this.props.SetDispatchedFlag(true) }
    });
  };

  renderDropdownButton = () => {
    const { dispatchIds } = this.state;
    const { privilege, currentOrder, providerLocationId, providerLocations, teamMemberData } = this.props;
    const plID = get(currentOrder, 'attributes.providerLocationId');
    if (privilege === 'admin') {
      return <ProviderSelector dispatchIds={plID ? [plID] : dispatchIds} onChange={this.updateDispatchIds} />
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
    const { dispatchIds } = this.state;
    const { teamMemberData, providerLocations, currentOrder: {attributes: {providerLocationId, assignedTeamMemberId}}, privilege } = this.props;
    const providerLocationInfo = find(providerLocations, {id: `${providerLocationId}`});
    const teamMemberInfo = find(teamMemberData, {id: `${assignedTeamMemberId}`});
    const isLocationSelected = !!this.props.providerLocationId;
    return (
      <Section title="Assignee" mode="view" editComponent={this.renderDropdownButton()} noPadding>
        {privilege === 'admin' ?
          <React.Fragment>
          {
            dispatchIds.map((id) => (
              <React.Fragment key={`assignee_${id}`}>
                <ProviderInfo id={id} />
              </React.Fragment>
            ))
          }
          </React.Fragment>
        : <AssigneeInfo
          teamMemberInfo={teamMemberInfo}
          providerLocationInfo={providerLocationInfo}
          isLocationSelected={isLocationSelected}
        />}
      </Section>
    );
  }
}

const mapStateToProps = (state) => ({
  currentOrder: state.order.currentOrder,
  teamMemberData: state.order.teamMemberData,
  privilege: state.auth.privilege,
  providerId: state.auth.providerId,
  providerLocationId: state.auth.providerLocationId,
  providerLocations: simpleProviderLocationSelector(state),
})

const mapDispatchToProps = { UpdateOrder, DispatchOrder, GetProviderLocations };

export default connect(mapStateToProps, mapDispatchToProps)(OrderAssignment);
