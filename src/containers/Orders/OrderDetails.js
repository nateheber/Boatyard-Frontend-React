import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Row, Col } from 'react-flexbox-grid';
import styled from 'styled-components';
import { get } from 'lodash';

import { actionTypes, GetOrder, UpdateOrder } from 'store/actions/orders';
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
import LineItemSection from './components/templates/LineItemSection';
import OrderSummarySection from './components/templates/OrderSummarySection';
import OrderReviewSection from './components/templates/OrderReviewSection';
import OrderDetailHeader from './components/templates/OrderDetailHeader';
import Scheduler from './components/templates/Scheduler';
import PaymentSection from './components/templates/PaymentSection';
import Timeline from './components/templates/Timeline';
import OrderAssignment from './components/templates/OrderAssignment';
import BoatModal from 'components/template/BoatInfoSection/BoatModal';

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
    visibleOfBoatModal: false
  };

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    const orderId = query.order;
    const { GetOrder } = this.props;
    this.setState({ orderId }, () => {
      GetOrder({
        orderId,
        success: () => {
          this.setState({ isFirstLoad: false });
        }
      });
    });
  }

  getOrderInfo = () => {
    const { currentOrder } = this.props;
    const customerInfo = getUserFromOrder(currentOrder);
    const boatInfo = getBoatFromOrder(currentOrder);
    return { boatInfo, customerInfo };
  };

  getProviderId = () => {
    const { currentOrder } = this.props;
    return get(getProviderFromOrder(currentOrder), 'id', '');
  };

  getSummaryInfo = () => {
    const { currentOrder } = this.props;
    const total = get(currentOrder, 'attributes.total');
    const subtotal = get(currentOrder, 'attributes.subTotal');
    const taxRate = get(currentOrder, 'attributes.taxRate');
    const taxAmount = get(currentOrder, 'attributes.taxAmount');
    const discount = get(currentOrder, 'attributes.discount');
    const deposit = get(currentOrder, 'attributes.deposit');
    const comments = get(currentOrder, 'attributes.comments');
    return {
      total,
      subtotal,
      taxRate,
      discount,
      deposit,
      taxAmount,
      comments
    };
  };

  getSpecialInstructions = () => {
    const { currentOrder } = this.props;
    return get(currentOrder, 'attributes.specialInstructions');
  };

  getSlipNumber = () => {
    const { currentOrder } = this.props;
    return get(currentOrder, 'attributes.slipNumber');
  };

  getUdpatedDate = () => {
    const { currentOrder } = this.props;
    const updatedAt = get(currentOrder, 'attributes.updatedAt');
    return updatedAt;
  };

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

  render() {
    const { boatInfo, customerInfo } = this.getOrderInfo();
    const updatedDate = this.getUdpatedDate();
    const { orderId, isFirstLoad, visibleOfBoatModal } = this.state;
    const providerId = this.getProviderId();
    const { currentOrder, currentStatus, boatStatus, privilege } = this.props;
    const lineItems = get(currentOrder, 'lineItems', []);
    const summaryInfo = this.getSummaryInfo();
    const loading = currentStatus === actionTypes.GET_ORDER;

    return (
      <React.Fragment>
        {loading && isFirstLoad ? (
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
                      specialInstructions={this.getSpecialInstructions()}
                      slipNumber={this.getSlipNumber()}
                    />
                    <LineItemSection
                      updatedAt={updatedDate}
                      orderId={orderId}
                      providerId={providerId}
                    />
                    <OrderReviewSection
                      {...summaryInfo}
                      updateOrder={this.updateOrder}
                    />
                  </SectionGroup>
                  <SectionGroup>
                    <PaymentSection order={currentOrder} />
                  </SectionGroup>
                  <SectionGroup>
                    <Scheduler orderId={orderId} />
                  </SectionGroup>
                </Column>
                <Column md={12} sm={12} xs={12} lg={4} xl={4}>
                  {privilege === 'admin' &&
                    !providerId && (
                      <SectionGroup>
                        <OrderAssignment />
                      </SectionGroup>
                    )}
                  <SectionGroup>
                    <CustomerBoat
                      boatInfo={boatInfo}
                      customerInfo={customerInfo}
                      onEditBoat={() => this.showBoatModal()}
                    />
                  </SectionGroup>
                  <SectionGroup>
                    <Timeline order={currentOrder} />
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
  privilege: state.auth.privilege
});

const mapDispatchToProps = {
  GetOrder,
  UpdateOrder,
  UpdateBoat
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetails);
