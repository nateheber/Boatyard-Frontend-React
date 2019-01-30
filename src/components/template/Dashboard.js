import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { GetNewOrders, GetOpenOrders } from 'store/actions/orders';
import { AssignedOrders, ScheduledOrders, MonthlyRevenue } from 'components/compound/SubSections';
import NewOrders from 'components/compound/SubSections/NewOrders';
import OpenInvoices from 'components/compound/SubSections/OpenInvoices';
import { DashboardHeader } from 'components/compound/SectionHeader';
import NewOrderModal from 'components/template/Orders/NewOrderModal';

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
  setNewOrderModalRef = (ref) => {
    if (ref) {
      this.orderCreation = ref.getWrappedInstance();
    }
  };

  creationFinished = () => {
    const { privilege } = this.props;
    if (privilege === 'admin') {
    } else {
      this.props.GetNewOrders({
        params: {
          page: 1,
          per_page: 5,
          'order[state]': 'draft',
          'order[sort]': 'desc',
          'order[order]': 'created_at'
        }
      });
      this.props.GetOpenOrders({
        params: {
          page: 1,
          per_page: 5,
          'order[state]': 'invoiced',
          'order[sort]': 'desc',
          'order[order]': 'created_at'  
        }
      });    
    }
  };

  newOrder = () => {
    this.orderCreation.createOrder();
  };

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
        <NewOrderModal ref={this.setNewOrderModalRef} onFinishCreation={this.creationFinished} />
      </Container>
    );
  }
}

const mapStateToProps = ({ auth: { privilege } }) => ({
  privilege
});

const mapDispatchToProps = {
  GetNewOrders,
  GetOpenOrders
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
