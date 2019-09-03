import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { Row, Col } from 'react-flexbox-grid';
import styled from 'styled-components';
import { get, findIndex } from 'lodash';
import { toastr } from 'react-redux-toastr';

import { actionTypes, GetOrder, UpdateOrder, SetDispatchedFlag } from 'store/actions/orders';
import { GetServices } from 'store/actions/services';
import { GetGlobalTemplates, GetLocalTemplates } from 'store/actions/messageTemplates';
import { orderSelector } from 'store/selectors/orders';
import {
  getUserFromOrder,
  getBoatFromOrder,
  getProviderFromOrder
} from 'utils/order';
import { actionTypes as boatActions, UpdateBoat } from 'store/actions/boats';

import { SectionGroup } from 'components/basic/InfoSection';
import LoadingSpinner from 'components/basic/LoadingSpinner';
import CustomerBoat from './components/templates/CustomerBoat';
import JobSection from './components/templates/JobSection';
import LineItemSection from './components/templates/LineItemSection';
import OrderSummarySection from './components/templates/OrderSummarySection';
import OrderReviewSection from './components/templates/OrderReviewSection';
import OrderDetailHeader from './components/templates/OrderDetailHeader';
import Scheduler from './components/templates/Scheduler';
import PaymentSection from './components/templates/PaymentSection';
import TimeLineSection from './components/templates/TimeLineSection';
import OrderAssignment from './components/templates/OrderAssignment';
import BoatModal from 'components/template/BoatInfoSection/BoatModal';
import JobModal from './components/modals/JobModal';

const Wrapper = styled.div`
  padding: 30px 25px;
`;

const Column = styled(Col)`
  padding-right: 15px !important;
  padding-left: 15px !important;
`;

class OrderDetails extends React.Component {
  state = {
    orderId: -1,
    isFirstLoad: true,
    visibleOfBoatModal: false,
    visibleOfJobModal: false
  };

  componentDidMount() {
    const { services, providerId, GetServices, GetGlobalTemplates, GetLocalTemplates, privilege, SetDispatchedFlag, location, match: {params: {id}} } = this.props;
    // load services if empty
    if (services.length === 0) {
      GetServices({ params: { per_page: 1000, 'service[provider_id]': providerId } });
    }
    let orderId = id;
    if (!orderId) {
      const query = queryString.parse(location.search);
      orderId = query.order;
    }
    const state = location.state;
    if (state && state.hasOwnProperty('dispatched')) {
      SetDispatchedFlag(state.dispatched);
    }
    // this.setState({ orderId }, () => {
    this.loadOrder(orderId);
    // });
    if (privilege === 'admin') {
      GetGlobalTemplates({ params: { 'per_page': 200 } });
    } else {
      GetLocalTemplates({
        params: { 'per_page': 200 },
        success: () => {
          const { localTemplates } = this.props;
          const idx = findIndex(localTemplates, template => template.triggerKey === 'quote_for_customer');
          if (idx < 0) {
            GetGlobalTemplates({ params: { 'per_page': 200 } });
          }
        }
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { match: {params: {id}} } = nextProps;
    if (id !== this.props.match.params.id) {
      this.loadOrder(id);
    }
    return true;
  }

  componentWillUnmount() {
    this.props.SetDispatchedFlag(false);
  }

  loadOrder = (orderId) => {
    const { GetOrder } = this.props;
    this.state.orderId !== orderId && this.setState({orderId});
    GetOrder({
      orderId,
      success: () => {
        this.setState({ isFirstLoad: false });
      },
      error: (e) => {
        toastr.error('Error', e.message);
        this.props.history.push('/');
      }
    });
  }

  getOrderInfo = () => {
    const { currentOrder, privilege } = this.props;
    const customerInfo = getUserFromOrder(currentOrder, privilege);
    const boatInfo = getBoatFromOrder(currentOrder);
    return { boatInfo, customerInfo };
  };

  getProviderId = () => {
    const { currentOrder } = this.props;
    return get(getProviderFromOrder(currentOrder), 'id', '');
  };

  getUdpatedDate = () => {
    const { currentOrder } = this.props;
    const updatedAt = get(currentOrder, 'attributes.updatedAt');
    return updatedAt;
  };

  getCustomerInfoCondition = () => {
    // const { currentOrder, privilege, provider } = this.props;
    const { currentOrder, privilege } = this.props;
    if (privilege === 'admin') {
      return true;
    }
    // const providerId = get(currentOrder, 'attributes.providerId');
    // const myProviderId = get(provider, 'data.id');
    // if (providerId === parseInt(myProviderId)) {
    //   return true;
    // }
    const orderStatus = get(currentOrder, 'attributes.state' );
    if (orderStatus === 'assigned' || orderStatus === 'dispatched') {
      return false;
    }
    return true;
  }

  showBoatModal = () => {
    this.setState({ visibleOfBoatModal: true });
  };

  hideBoatModal = () => {
    this.setState({ visibleOfBoatModal: false });
  };

  updateBoat = data => {
    const { UpdateBoat, GetOrder } = this.props;
    const {
      boatInfo: { id }
    } = this.getOrderInfo();
    const { orderId } = this.state;
    UpdateBoat({
      boatId: id,
      data,
      success: () => {
        this.hideBoatModal();
        GetOrder({ orderId });
      }
    });
  };

  updateOrder = data => {
    const { orderId } = this.state;
    this.props.UpdateOrder({ orderId, data });
  };

  showJobModal = () => {
    this.setState({ visibleOfJobModal: true });
  };

  hideJobModal = () => {
    this.setState({ visibleOfJobModal: false });
  };

  render() {
    const { boatInfo, customerInfo } = this.getOrderInfo();
    const updatedDate = this.getUdpatedDate();
    const { orderId, isFirstLoad, visibleOfBoatModal, visibleOfJobModal } = this.state;
    const providerId = this.getProviderId();
    const { currentOrder, currentStatus, boatStatus, privilege, workorders } = this.props;
    const lineItems = get(currentOrder, 'lineItems', []);
    const loading = currentStatus === actionTypes.GET_ORDER;
    const orderStatus = get(currentOrder, 'attributes.state' );
    const canAssignOrder = orderStatus !== 'invoiced' && orderStatus !== 'canceled';
    const canShowCustomerInfo = this.getCustomerInfoCondition();
    return (
      <React.Fragment>
        {loading || isFirstLoad ? (
          <LoadingSpinner loading={true} />
        ) : (
          <React.Fragment>
            <OrderDetailHeader order={currentOrder} />
            <Wrapper>
              <Row>
                <Column md={12} sm={12} xs={12} lg={8} xl={8}>
                  <SectionGroup>
                    <OrderSummarySection
                      lineItem={get(lineItems, '0', {})}
                      order={currentOrder}
                    />
                    <LineItemSection
                      updatedAt={updatedDate}
                      orderId={orderId}
                      providerId={providerId}
                    />
                    <OrderReviewSection
                      order={currentOrder}
                      updateOrder={this.updateOrder}
                    />
                  </SectionGroup>
                  <SectionGroup>
                    <PaymentSection order={currentOrder} onFinished={() => this.loadOrder(orderId)} />
                  </SectionGroup>
                  <SectionGroup>
                    <Scheduler order={currentOrder} />
                  </SectionGroup>
                </Column>
                <Column md={12} sm={12} xs={12} lg={4} xl={4}>
                  {canAssignOrder && <SectionGroup>
                    <OrderAssignment />
                  </SectionGroup>}
                  <SectionGroup>
                    <CustomerBoat
                      canShowCustomerInfo={canShowCustomerInfo}
                      boatInfo={boatInfo}
                      customerInfo={customerInfo}
                      onEditBoat={() => this.showBoatModal()}
                    />
                  </SectionGroup>
                  {privilege === 'provider' && <SectionGroup>
                    <JobSection workorders={workorders} addJob={this.showJobModal} />
                  </SectionGroup>}
                  <SectionGroup>
                    <TimeLineSection order={currentOrder} />
                  </SectionGroup>
                </Column>
              </Row>
            </Wrapper>
            {visibleOfBoatModal && (
              <BoatModal
                open={visibleOfBoatModal}
                loading={boatStatus === boatActions.UPDATE_BOAT}
                user={customerInfo}
                onClose={this.hideBoatModal}
                onSave={this.updateBoat}
                boatInfo={boatInfo}
              />
            )}
            {visibleOfJobModal && <JobModal
              order={currentOrder}
              open={visibleOfJobModal}
              customerInfo={customerInfo}
              onClose={this.hideJobModal}
              onSave={this.onSaveJob}
            />}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ...orderSelector(state),
  currentStatus: state.order.currentStatus,
  boatStatus: state.boat.currentStatus,
  privilege: state.auth.privilege,
  globalTemplates: state.messageTemplate.globalTemplates,
  localTemplates: state.messageTemplate.localTemplates,
  providerId: state.auth.providerId,
  services: state.service.services,
  workorders: state.workorders.workorders
});

const mapDispatchToProps = {
  GetOrder,
  GetServices,
  UpdateOrder,
  UpdateBoat,
  SetDispatchedFlag,
  GetGlobalTemplates,
  GetLocalTemplates
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetails));
