import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {
  AssignedOrders,
  ScheduledOrders,
  MonthlyRevenue
} from 'components/compound/SubSections';

import NewOrders from 'components/compound/SubSections/NewOrders';
import OpenInvoices from 'components/compound/SubSections/OpenInvoices';


import { DashboardHeader } from 'components/compound/SectionHeader';

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 15px 10px 30px;
  @media (max-width: 991px) {
    flex-direction: column;
  }
`;

const LeftPart = styled.div`
  flex-grow: 2;
  @media (max-width: 991px) {
    flex-grow: none;
  }
`;

const RightPart = styled.div`
  flex-grow: 1;
  @media (max-width: 991px) {
    flex-grow: none;
  }
`;

class Dashboard extends React.Component {
  render() {
    const { privilege } = this.props;
    return (
      <Container>
        <DashboardHeader onNewOrder={this.newOrder} />
        <Wrapper>
          <LeftPart>
            {privilege === 'provider' && <NewOrders />}
            <ScheduledOrders />
            <AssignedOrders />
          </LeftPart>
          <RightPart>
            <MonthlyRevenue />
            {privilege === 'provider' && <OpenInvoices />}
          </RightPart>
        </Wrapper>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth: { privilege } }) => ({
  privilege
});

export default connect(mapStateToProps)(Dashboard);
