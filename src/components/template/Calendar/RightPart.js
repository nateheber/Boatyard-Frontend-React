import React from 'react';
import styled from 'styled-components';

import Table from 'components/basic/Table';
import { CalendarList } from 'components/compound/Calendar';
import { ColumnFilter } from 'components/basic/Dropdown';

const Wrapper = styled.div`
  flex: 4;
  background-color: white;
`;

const ActionWrapper = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export default class RightPart extends React.Component {
  render() {
    const { type } = this.props;
    if (type === 'calendar') {
      return (
        <Wrapper>
          <CalendarList />
        </Wrapper>
      );
    } else {
      const columns = [
        { label: 'date', title: 'Date', value: 'date' },
        { label: 'est', title: 'EST', value: 'est' },
        { label: 'employee', title: 'Employee', value: 'employee' },
        { label: 'order', title: 'Order', value: 'order' },
        { label: 'boat name', title: 'Boat Name', value: 'boat_name' }
      ];
      const records = [
        {
          date: 'Sep 7, 2018 ',
          est: '9:00 PM - 11:00 PM',
          employee: 'Detailer Brock Boatyard',
          order: 'Order #3923',
          boat_name: 'Blubes'
        }
      ];
      return (
        <Wrapper>
          <ActionWrapper>
            <ColumnFilter items={columns} />
          </ActionWrapper>
          <Table columns={columns} records={records} sortColumn="date" />
        </Wrapper>
      );
    }
  }
}
