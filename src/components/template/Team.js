import React from 'react';
import styled from 'styled-components';

import Table from '../basic/Table';
import { TeamMemberHeader } from '../compound/SectionHeader';

const Wrapper = styled.div`
  height: 100%;
  background-color: white;
`;

export default class Team extends React.Component {
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
        <TeamMemberHeader />
        <Table columns={columns} records={records} sortColumn="order" />
      </Wrapper>
    );
  }
}
