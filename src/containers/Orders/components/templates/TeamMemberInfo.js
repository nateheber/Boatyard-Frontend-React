import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { GetManagement } from 'store/actions/managements';

const Wrapper = styled.div`
  box-sizing: border-box;
  height: 44px;
  background-color: white;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 16px;
  font-weight: 400;
  padding: 10px 15px;
  color: #004258;
`

class TeamMemberInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      managementName: null //`Management #${props.id}`
    };
    this._isMounted = false;
  }

  componentDidMount() {
    const { id } = this.props;
    this.props.GetManagement({ managementId: id, success: this.onFetchSucceed })
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onFetchSucceed = (management) => {
    if (this._isMounted) {
      this.setState({ managementName: management.name })
    }
  }

  render() {
    const { managementName } = this.state;;
    return (
      <div>
        {managementName && <Wrapper>
          {managementName}
        </Wrapper>}
      </div>
    )
  }
}

const mapDispatchToProps = {
  GetManagement
}

export default connect(null, mapDispatchToProps)(TeamMemberInfo);