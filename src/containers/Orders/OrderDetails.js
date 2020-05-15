import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { Row, Col } from 'react-flexbox-grid';
import styled from 'styled-components';
import { get, findIndex, filter, find, isEmpty } from 'lodash';
import { toastr } from 'react-redux-toastr';
import { SetWorkOrder, UpserWorkOrder, ServicesValidation, ResetWorkOrder, DeleteWorkOrder } from 'store/actions/workorders';
import { actionTypes, GetOrder, UpdateOrder } from 'store/actions/orders';
import { GetServices } from 'store/actions/services';
import { GetProviderLocationServices } from 'store/actions/providerLocations';
import { GetGlobalTemplates, GetLocalTemplates } from 'store/actions/messageTemplates';
import { orderSelector } from 'store/selectors/orders';
import { withAssignmentSelector } from 'store/selectors/workorders';
import {
  getUserFromOrder,
  getBoatFromOrder
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
// import Scheduler from './components/templates/Scheduler';
import PaymentSection from './components/templates/PaymentSection';
// import OrderAcceptedSection from './components/templates/OrderAcceptedSection';
import TimeLineSection from './components/templates/TimeLineSection';
import OrderAssignment from './components/templates/OrderAssignment';
import BoatModal from 'components/template/BoatInfoSection/BoatModal';
import JobModal from './components/modals/JobModal';
import JobModalCloseConfirm from './components/modals/JobModalCloseConfirm';
import JobDeleteConfirmModal from './components/modals/JobDeleteConfirmModal';
import { dueTypes } from './components/modals/JobModal/components/JobSummarySection/components/SummaryEditView';

const Wrapper = styled.div`
  padding: 30px 25px;
  @media (max-width: 470px) {
    padding: 0;
  }
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
    visibleOfJobModal: false,
    visibleOfConfirm: false,
    visibleOfJobDeleteConfirm: false
  };

  componentDidMount() {
    const { GetGlobalTemplates, GetLocalTemplates, privilege, location, match: {params: {id}} } = this.props;
    let orderId = id;
    if (!orderId) {
      const query = queryString.parse(location.search);
      orderId = query.order;
    }
    this.loadOrder(orderId);

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

  loadOrder = (orderId) => {
    const { GetOrder, GetServices, GetProviderLocationServices } = this.props;
    this.state.orderId !== orderId && this.setState({orderId});
    GetOrder({
      orderId,
      success: () => {
        const { currentOrder } = this.props;
        const providerId = get(currentOrder, 'attributes.providerId');
        const providerLocationId = get(currentOrder, 'attributes.providerLocationId');
        if (providerLocationId) {
          GetProviderLocationServices({
            providerId,
            providerLocationId,
            params: {
              per_page: 1000,
              all: true,
              'service[discarded_at]': null,
              'service[order]': 'name',
              'service[sort]': 'asc'
            }
          });
        } else {
          GetServices({
            params: {
              per_page: 1000,
              all: true,
              'service[provider_id]': providerId,
              'service[discarded_at]': null,
              'service[order]': 'name',
              'service[sort]': 'asc'
            }
          });
        }
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
    return get(currentOrder, 'attributes.providerId');
  };

  getProviderLocationId = () => {
    const { currentOrder } = this.props;
    return get(currentOrder, 'attributes.providerLocationId');
  }
  getUdpatedDate = () => {
    const { currentOrder } = this.props;
    const updatedAt = get(currentOrder, 'attributes.updatedAt');
    return updatedAt;
  };

  getCustomerInfoCondition = () => {
    // const { currentOrder, privilege, provider } = this.props;
    const { /*currentOrder,*/ privilege } = this.props;
    if (privilege === 'admin') {
      return true;
    }
    // const providerId = get(currentOrder, 'attributes.providerId');
    // const myProviderId = get(provider, 'data.id');
    // if (providerId === parseInt(myProviderId)) {
    //   return true;
    // }

    // const orderStatus = get(currentOrder, 'attributes.state' );
    // if (orderStatus === 'assigned' || orderStatus === 'dispatched') {
    //   return false;
    // }
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
    this.props.SetWorkOrder({modalShow: true});
  };

  hideJobModal = () => {
    const { workorder } = this.props;
    if (!workorder.id) {
      this.setState({visibleOfConfirm: true});
    } else {
      if (workorder.state === 'draft') {
        this.onSaveJob();
      }
      this.props.SetWorkOrder({modalShow: false, reset: !!workorder.id});
    }
  };

  hideConfirm = () => {
    const { workorder } = this.props;
    this.setState({visibleOfConfirm: false});
    this.props.SetWorkOrder({modalShow: false, reset: !!workorder.id});
  }

  onSaveJob = () => {
    const confirmShown = this.state.visibleOfConfirm;
    this.setState({visibleOfConfirm: false});
    const { workorder } = this.props;
    const newServices = workorder.services.map(service => {
      return {
        name: service.service,
        ...this.getDueDateAndTime(service),
        special_instructions: service.notes,
      }
    });
    // if (filter(newServices, s => !s.name || !s.scheduled_text).length === 0) {
      this.props.UpserWorkOrder({
        services: newServices,
        success: () => {
          confirmShown && toastr.success('Success', "Successfully added!");
          this.props.ResetWorkOrder();
          this.props.SetWorkOrder({modalShow: false, reset: !!workorder.id});
        },
        error: (e) => {
          console.log("onSaveJob");
          // toastr.error('Error', e.message);
        }
      });

    // }
  }

  getDueDateAndTime = ({due_type, due_date, due_time, due_time_range }) => {
    if (!due_type) {
      return false;
    }
    const scheduled_text = find(dueTypes, {value: due_type}).label;
    due_date = due_date && moment(due_date).format("MMM D, YYYY");
    due_time = due_time && due_time.value;
    due_time_range = due_time_range && `${due_time_range.from_time.value} ~ ${due_time_range.to_time.value}`;

    if (due_type === 'specific_date') {
      return { due_date };
    }
    if (due_type === 'specific_date_time') {
      return { due_date, time: due_time };
    }
    if (due_type === 'date_time_range') {
      return { due_date,  time: due_time_range };
    }

    return {due_date: scheduled_text};
  }

  onJobSend = () => {
    this.props.ServicesValidation();
    setTimeout(() => {
      const { workorder: {services, assignee, title} } = this.props;
      const invalidServiceCount = filter(services, {validateResult: false}).length;
      if (services.length === 0) {
        toastr.error('Error', "Please add at least one service!");
      } else if (invalidServiceCount > 0) {
        toastr.error('Error', "Please check invalid service fields!");
      } else if (!assignee || !assignee.value) {
        toastr.error('Error', "Please select team member or contractor!");
      } else if (!title) {
        toastr.error('Error', "Please input job title!");
      } else {
        const newServices = services.map(service => {
          return {
            name: service.service,
            ...this.getDueDateAndTime(service),
            special_instructions: service.special_instructions,
          }
        });

        this.props.UpserWorkOrder({
          services: newServices,
          transition: 'dispatch',
          success: () => {
            toastr.success('Success', "Successfully Sent!");
            this.props.ResetWorkOrder();
            this.props.SetWorkOrder({modalShow: false, reset: true});
          },
          error: (e) => {
            console.log("onJobSend");
            toastr.error('Error', e.message);
          }
        });

      }
    });

  };

  onConfirmDelete = () => {
    this.setState({visibleOfJobDeleteConfirm: false});
    this.handleJobDelete();
  }
  handleJobDelete = () => {
    const { workorder: {id} } = this.props;
    this.props.DeleteWorkOrder({
      id,
      success: () => {
        toastr.success('Success', "Successfully Deleted!");
        this.props.ResetWorkOrder();
        this.props.SetWorkOrder({modalShow: false, reset: true});
      },
      error: (e) => {
        console.log("handleJobDelete");
        toastr.error('Error', e.message);
      }
    });
  }

  render() {
    const { boatInfo, customerInfo } = this.getOrderInfo();
    const updatedDate = this.getUdpatedDate();
    const { orderId, isFirstLoad, visibleOfBoatModal, visibleOfConfirm, visibleOfJobDeleteConfirm } = this.state;
    const providerId = this.getProviderId();
    const providerLocationId = this.getProviderLocationId();
    const { currentOrder, currentStatus, boatStatus, privilege, workorders, workorder } = this.props;
    const memorialization = Object.values(get(this.props.currentOrder, 'attributes.memorialization'))[0]
    const lineItems = get(currentOrder, 'lineItems', []);
    const loading = currentStatus === actionTypes.GET_ORDER;
    const orderStatus = get(currentOrder, 'attributes.state');
    //const canAssignOrder = orderStatus !== 'invoiced' && orderStatus !== 'canceled';
    const canAssignOrder = orderStatus !== 'canceled';
    const canShowCustomerInfo = this.getCustomerInfoCondition();
    return (
      <React.Fragment>
        {loading || isFirstLoad || !currentOrder || isEmpty(currentOrder) ? (
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
                      memorialization={memorialization}
                    />
                    <LineItemSection
                      order={currentOrder}
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
                  {/*<SectionGroup>
                    <Scheduler order={currentOrder} />
                  </SectionGroup>*/}
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
                  {privilege === 'provider' && providerId && providerLocationId && <SectionGroup>
                    <JobSection workorders={workorders} addJob={this.showJobModal} SetWorkOrder={this.props.SetWorkOrder} />
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
            {workorder.modalShow &&
              <JobModal
                order={currentOrder}
                open={workorder.modalShow}
                customerInfo={customerInfo}
                onClose={this.hideJobModal}
                onSend={this.onJobSend}
                onDelete={ev => this.setState({visibleOfJobDeleteConfirm: true})}
              />
            }
            {
              visibleOfConfirm &&
              (
                <JobModalCloseConfirm
                  open={visibleOfConfirm}
                  onClose={this.hideConfirm}
                  onConfirm={this.onSaveJob}
                />
              )
            }
            {
              visibleOfJobDeleteConfirm &&
              (
                <JobDeleteConfirmModal
                  open={visibleOfJobDeleteConfirm}
                  onClose={ev => this.setState({visibleOfJobDeleteConfirm: false})}
                  onConfirm={this.onConfirmDelete}
                />
              )
            }
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
  workorders: withAssignmentSelector(state),
  workorder: state.workorders.workorder
});

const mapDispatchToProps = {
  GetOrder,
  GetServices,
  UpdateOrder,
  UpdateBoat,
  GetGlobalTemplates,
  GetLocalTemplates,
  SetWorkOrder,
  ServicesValidation,
  UpserWorkOrder,
  ResetWorkOrder,
  DeleteWorkOrder,
  GetProviderLocationServices
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetails));
