import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import Table from 'components/basic/Table';
import { CustomersHeader } from 'components/compound/SectionHeader';

const Wrapper = styled.div`
  height: 100%;
  background-color: white;
`;

class Customers extends React.Component {
  toDetails = customerId => {
    this.props.history.push(`/customer-details/${customerId}/`);
  };
  render() {
    const columns = [
      { label: 'name', value: 'name' },
      { label: 'phone', value: 'phone' },
      { label: 'email', value: 'email' },
      { label: 'location', value: 'location' },
      { label: 'last order', value: 'last_order' },
      { label: 'orders', value: 'orders' },
      { label: 'total spent', value: 'total_spent' }
    ];
    const records = [
      {
        name: 'Brock Prod Test 9 Donnelly',
        phone_number: '(555) 555-555',
        email: 'brock+pt9@boatyard.com',
        location: '',
        last_order: '9-26-2018',
        orders: 1,
        total_spent: '$0.00'
      },
      {
        name: 'Brock Prod Test 9 Donnelly',
        phone_number: '(555) 555-555',
        email: 'brock+pt8@boatyard.com',
        location: '',
        last_order: '9-26-2018',
        orders: 1,
        total_spent: '$0.00'
      }
    ];
    return (
      <Wrapper>
        <CustomersHeader />
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

export default withRouter(Customers);
