import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import Table from 'components/basic/Table';
import { TeamListHeader } from '../../components';

const Wrapper = styled.div`
  height: 100%;
  background-color: white;
`;

class TeamList extends React.Component {
  toDetails = member => {
    this.props.history.push(`/team-details/${member.id}/`);
  };
  render() {
    const columns = [
      { label: 'name', value: 'name' },
      { label: 'phone number', value: 'phone_number' },
      { label: 'email', value: 'email' },
      { label: 'permissions', value: 'permissions' }
    ];
    const records = [
      {
        name: 'Detailer Brock Boatyard',
        phone_number: '(555) 555-555',
        email: 'brock+180_unlimited@boatyard',
        permissions: 'Provider Admin'
      },
      {
        name: 'Daniel Zheng',
        phone_number: '(555) 555-555',
        email: 'dannyzheng1993@gmail.com',
        permissions: 'Provider Admin'
      }
    ];
    return (
      <Wrapper>
        <TeamListHeader />
        <Table
          columns={columns}
          records={records}
          sortColumn="order"
          toDetails={this.toDetails}
        />
      </Wrapper>
    );
  }
}

export default withRouter(TeamList);
