import React from 'react';
import { get } from 'lodash';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-family: 'Montserrat',sans-serif !important;
  font-size: 16px;
  font-weight: 600;
  padding: 10.5px 25.5px;
  border: 1px solid #F5F5F5;
  background-color: #FFFFFF;
  color: #184961;
`

export default class AssigneeInfo extends React.Component {
  render() {
    const { providerLocationInfo, teamMemberInfo, isLocationSelected } = this.props;
    console.log(providerLocationInfo);
    const locationName = get(providerLocationInfo, 'name', '-');
    const teamMemberName = get(teamMemberInfo, 'fullName', '-');
    const assignee = isLocationSelected ? teamMemberName : locationName;
    return (
      <Wrapper>{assignee}</Wrapper>
    )
  }
}
