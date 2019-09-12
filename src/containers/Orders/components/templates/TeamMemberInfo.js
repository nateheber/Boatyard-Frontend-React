import React from 'react';
import { get } from 'lodash';
import styled from 'styled-components';

const Wrapper = styled.div`
  .title {
    font-family: 'Montserrat',sans-serif !important;
    font-size: 12px;
    font-weight: bold;
    color: #004258;
    margin-bottom: 5px;
  }
  .content {
    color: #898889;
    font-size: 14px;
    line-height: 1.42857;
    margin-bottom: 30px;
  }
`

export default class TeamMemberInfo extends React.Component {
  render() {
    const { providerLocationInfo, teamMemberInfo } = this.props;
    console.log(providerLocationInfo);
    const locationName = get(providerLocationInfo, 'name', '-');
    const teamMemberName = get(teamMemberInfo, 'fullName', '-');
    return (
      <div>
        <Wrapper>
          <div className="title">Provider Location</div>
          <div className="content">{locationName}</div>
          <div className="title">Team Member</div>
          <div className="content">{teamMemberName}</div>
        </Wrapper>
      </div>
    )
  }
}
