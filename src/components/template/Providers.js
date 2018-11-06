import React from 'react';
import styled from 'styled-components';

import Table from '../basic/Table';
import { ProviderHeader } from '../compound/SectionHeader';

const Wrapper = styled.div`
  height: 100%;
  background-color: white;
`;

export default class Providers extends React.Component {
  render() {
    const columns = [
      { label: 'provider name', value: 'provider_name' },
      { label: 'contact name', value: 'contact_name' },
      { label: 'phone', value: 'phone' },
      { label: 'email', value: 'email' },
      { label: 'location', value: 'location' }
    ];
    const records = [
      {
        provider_name: '181 Degree Unlimited',
        contact_name: 'Desire Radford',
        phone: '(555) 555-5555',
        email: 'testdireeradford@test.com',
        location: 'North Miami, Fl'
      },
      {
        provider_name: 'A1 Marine Services',
        contact_name: 'Nathan Heber',
        phone: '(305) 479-7794',
        email: 'nathan+a1service@boatyard.com',
        location: 'Fort Lauderdale, Fl'
      },
      {
        provider_name: 'Account Owner Testing',
        contact_name: 'Brock Account Owner Donnelly',
        phone: '(954) 330-6449',
        email: 'brock+accountowner@boatyard.com',
        location: 'Fort Lauderdale, Florida'
      },
      {
        provider_name: 'Admiral Oil',
        contact_name: 'Kathleen Marrero',
        phone: '(305) 371-3835',
        email: 'nathan+admiral_oil@boatyard.com',
        location: 'Coral Gables, Fl'
      }
    ];
    return (
      <Wrapper>
        <ProviderHeader />
        <Table columns={columns} records={records} sortColumn="order" />
      </Wrapper>
    );
  }
}
