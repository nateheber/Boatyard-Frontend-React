import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { find } from 'lodash';
import styled from 'styled-components';
import { GetManagements } from 'store/actions/managements';
import { SetWorkOrder, UpserWorkOrder, ResetWorkOrder, ServicesValidation } from 'store/actions/workorders';
import { refinedManagementsSelector } from 'store/selectors/managements';
import { getUserFromOrder, getBoatFromOrder } from 'utils/order';
import { OrangeButton, HollowButton /*, GradientButton*/ } from 'components/basic/Buttons'
import Modal from 'components/compound/Modal';
import {
  /*Image, */ JobTitleSection, JobSummarySection, CustomerInfoSection,
  LocationInfoSection, BoatInfoSection, AttachmentSection, NotesSection
} from './components';
import { dueTypes } from './components/JobSummarySection/components/SummaryEditView';

//import PrintIcon from '../../../../../resources/job/print.png';

// const mainFields = ['first_name', 'last_name', 'phone_number', 'email', 'notes'];
// const locationFields = ['street', 'city', 'state', 'zip'];

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const Title = styled.div`
  font-weight: bold;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  padding-right: 40px;
`;

class JobModal extends React.Component {
  constructor(props) {
    super(props);
    const { SetWorkOrder, workorder: { services }, order } = props;
    if (services.length > 0 && order.lineItems.length > 0 && !services[0].service) {
      services[0].service = order.lineItems[0].relationships.service.attributes.name;
      SetWorkOrder({services: [...services]});
    }
  }

  componentDidMount() {
    const { GetManagements } = this.props;
    GetManagements({ params: { page: 1, per_page: 1000 } });

  }

  getScheduleText = ({due_type, due_date, due_time, due_time_range }) => {
    if (!due_type) {
      return false;
    }
    const dueTypeLabel = find(dueTypes, {value: due_type});
    due_date = due_date && moment(due_date).format("MM/DD/YYYY");
    due_time = due_time && due_time.value;
    due_time_range = due_time_range && `${due_time_range.from_time.value} ~ ${due_time_range.to_time.value}`;

    if (due_type === 'specific_date') {
      return due_date ? due_date : false;
    }
    if (due_type === 'specific_date_time') {
      return (due_date && due_time) ? `${due_date} ${due_time}` : false;
    }
    if (due_type === 'date_time_range') {
      return (due_date && due_time_range) ? `${due_date} ${due_time_range}` : false;
    }

    return dueTypeLabel.label;
  }

  handlePrint = () => {
  };

  handleTeamMemberChange = (member) => {
    this.props.SetWorkOrder({ assignee: member });
  };

  handleChangeNotes = notes => {
    const {SetWorkOrder} = this.props;
    SetWorkOrder({ notes });
  };

  handleVisibleChange = (fieldName, value) => {
    const { workorder: {settings}} = this.props;
    const newSettings = {...settings};
    newSettings[fieldName] = value;
    this.props.SetWorkOrder({settings: newSettings});
  }

  handleAddAttachment = (attachment, resolve) => {
    const { workorder: {file_attachments_attributes}} = this.props;
    const attachments = file_attachments_attributes.slice(0);
    attachments.push(attachment);
    this.props.SetWorkOrder({file_attachments_attributes: attachments});
    window.setTimeout(() => resolve(), 10);
  };

  handleDeleteAttachment = (index) => {
    const { workorder: {file_attachments_attributes}} = this.props;
    const attachments = file_attachments_attributes.slice(0);
    attachments.splice(index, 1);
    this.props.SetWorkOrder({file_attachments_attributes: attachments});
  }

  getOptions = () => {
    const { managements } = this.props;
    const { selectedTeamMembers } = this.state;
    if (managements) {
      const options = managements.map(management => (
        {
          value: management.id,
          label: `${management.relationships.user.attributes.firstName} ${management.relationships.user.attributes.lastName}`
        }
      ));
      return options.filter(o1 => selectedTeamMembers.filter(o2 => o2.value === o1.value).length === 0);
    }
    return [];
  };

  getOrderInfo = () => {
    const { order, privilege } = this.props;
    const customerInfo = getUserFromOrder(order, privilege);
    const boatInfo = getBoatFromOrder(order);
    return { boatInfo, customerInfo };
  };

  render() {
    const { open, onClose, loading, services,
      workorder: {
        id,
        jobNumber,
        assignee,
        state,
        settings: {
          notes, customer_info, boat_info, location
        },
        file_attachments_attributes: attachments
      }
    } = this.props;
    const showSendBtn = !state || state === 'draft';
    const showDeleteBtn = !!id;
    const { boatInfo, customerInfo } = this.getOrderInfo();
    const action = [
      showDeleteBtn ? <HollowButton onClick={this.props.onDelete} key='modal_btn_delete'>Delete</HollowButton> : <div/>,
      showSendBtn ? <OrangeButton onClick={this.props.onSend} key='modal_btn_save'>Send</OrangeButton> : <div/>
    ];
    const headers = (
      <ModalHeader>
        <Title>{id ? `Job #${jobNumber}` : 'New Job'}</Title>
        <Actions>
          {/*<GradientButton onClick={this.handlePrint}>
            <Image className='print' src={PrintIcon} />
          </GradientButton>
          */}
          { showSendBtn && <OrangeButton style={{ marginLeft: 30 }} onClick={this.props.onSend} key='modal_btn_save'>Send</OrangeButton> }
        </Actions>
      </ModalHeader>
    );
    return (
      <Modal
        customHeader={headers}
        actions={action}
        open={open}
        onClose={onClose}
        large
        classes='space-between'
        loading={loading}
      >
        <JobTitleSection
          assignee={assignee}
          onChange={this.handleTeamMemberChange}
        />
        <JobSummarySection
          services={services}
          workorder={this.props.workorder}
          SetWorkOrder={this.props.SetWorkOrder}
          servicesValidationCnt={this.props.servicesValidationCnt}
        />
        <NotesSection
          contentVisible={notes}
          notes={this.props.workorder.notes}
          onChangeVisible={notes => this.handleVisibleChange('notes', notes)}
          onChange={this.handleChangeNotes}
        />
        <CustomerInfoSection
          contentVisible={customer_info}
          customerInfo={customerInfo}
          onChangeVisible={customer_info => this.handleVisibleChange('customer_info', customer_info)}
        />
        <BoatInfoSection
          contentVisible={boat_info}
          boatInfo={boatInfo}
          onChangeVisible={boat_info => this.handleVisibleChange('boat_info', boat_info)}
        />
        <LocationInfoSection
          contentVisible={location}
          boatInfo={boatInfo}
          onChangeVisible={location => this.handleVisibleChange('location', location)}
        />
        <AttachmentSection
          attachments={attachments}
          onAdd={this.handleAddAttachment}
          onDelete={this.handleDeleteAttachment}
          disabled={!showSendBtn}
        />
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  privilege: state.auth.privilege,
  order: state.order.currentOrder,
  managements: refinedManagementsSelector(state),
  services: state.service.services,
  workorder: state.workorders.workorder,
  loading: state.workorders.loading,
  servicesValidationCnt: state.workorders.servicesValidationCnt,
});

const mapDispatchToProps = {
  GetManagements,
  SetWorkOrder,
  UpserWorkOrder,
  ResetWorkOrder,
  ServicesValidation
};

export default connect(mapStateToProps, mapDispatchToProps)(JobModal);
