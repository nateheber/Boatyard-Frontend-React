import React from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';

import { CheckField } from 'components/basic/Input';
import { GetManagement } from 'store/actions/managements';

class TeamMemberCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      managementName: `TeamMember #${props.managementId}`
    };
    this._isMounted = false;
  }

  componentDidMount() {
    const { managementId } = this.props;
    if (managementId) {
      this.props.GetManagement({ managementId, success: this.onFetchSucceed })
    }
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getManagementName = () => {
    const { management } = this.props;
    const firstName = get(management, 'relationships.user.attributes.firstName');
    const lastName = get(management, 'relationships.user.attributes.lastName');
    const name = (`${firstName || ''} ${lastName || ''}`).trim();
    return name.length > 0 ? name : this.state.managementName;
  }

  onFetchSucceed = (management) => {
    if (this._isMounted) {
      this.setState({ managementName: management.name })
    }
  }

  render() {
    const { checked, onClick } = this.props;
    return (
      <CheckField title={this.getManagementName()} checked={checked} onClick={onClick}/>
    )
  }
}

const mapDispatchToProps = {
  GetManagement
}

export default connect(null, mapDispatchToProps)(TeamMemberCheck);