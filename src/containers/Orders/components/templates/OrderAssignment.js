import React from 'react';
import { connect } from 'react-redux';
import { get, find } from 'lodash';
import { toastr } from 'react-redux-toastr';
import { Section } from 'components/basic/InfoSection';
import { GetProviderLocations, SearchProviderLocations } from 'store/actions/providerLocations';
import { UpdateOrder, DispatchOrder } from 'store/actions/orders';
import { simpleProviderLocationSelector } from 'store/selectors/providerLocation';
import AssigneeInfo from './AssigneeInfo';
import ProviderLocationInfo from './ProviderLocationInfo';
import ProviderLocationSelector from './ProviderLocationSelector';
import AssigneeSelector from './AssigneeSelector';

class OrderAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dispatchIds: []
    };
  }

  componentDidMount() {
    const { privilege, providerId, GetProviderLocations, SearchProviderLocations } = this.props;
    if (privilege === 'admin') {
      SearchProviderLocations({
        params: {
          search: '',
          page: 1,
          per_page: 1000
        }
      });
    } else {
      GetProviderLocations({
        providerId,
        params: { page: 1, per_page: 1000 }
      });
    }
  }

  static getDerivedStateFromProps(props) {
    const providerLocationId = get(props, 'currentOrder.attributes.providerLocationId');
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
      data: {
        order: data
      },
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
    const orderState = get(currentOrder, 'state');
    const isDispatched = orderState === 'dispatched';// || orderState === 'assigned';
    if (privilege === 'admin') {
      return <ProviderLocationSelector dispatchIds={isDispatched ? [plID] : dispatchIds} onChange={this.updateDispatchIds} />
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
    const providerLocationInfo = find(providerLocations, {id: `${providerLocationId}`}) || providerLocations[0];
    const teamMemberInfo = find(teamMemberData, {id: `${assignedTeamMemberId}`});
    const isLocationSelected = !!this.props.providerLocationId;
    return (
      <Section title="Assignee" mode="view" editComponent={this.renderDropdownButton()} noPadding>
        {privilege === 'admin' ?
          <React.Fragment>
          {
            dispatchIds.map((id) => (
              <React.Fragment key={`assignee_${id}`}>
                <ProviderLocationInfo id={id} />
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
  providerLocations: simpleProviderLocationSelector(state)
})

const mapDispatchToProps = {
  UpdateOrder,
  DispatchOrder,
  GetProviderLocations,
  SearchProviderLocations
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderAssignment);
