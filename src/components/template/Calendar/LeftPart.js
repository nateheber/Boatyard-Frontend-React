import React from 'react';
import styled from 'styled-components';

import { CalendarDropdown } from '../../basic/Dropdown';
import { DatePicker, TeamMembers } from '../../compound/Calendar';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  align-items: center;
  background-color: #f2f2f2;
  padding: 0px 15px;
`;

export default class LeftPart extends React.Component {
  render() {
    const members = [
      { name: 'Detailer Brock Boatyard', color: 'rgb(254, 195, 80)' },
      { name: 'Daniel Zheng', color: 'rgb(247, 154, 67)' }
    ];
    const { onChange } = this.props;
    return (
      <Wrapper>
        <CalendarDropdown onChange={onChange} />
        <DatePicker />
        <TeamMembers members={members} />
      </Wrapper>
    );
  }
}
