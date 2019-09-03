import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { get, filter, find } from 'lodash';
import styled from 'styled-components';
import { toastr } from 'react-redux-toastr';
import { getWhenValue } from 'utils/lineitem';
import { GetManagements } from 'store/actions/managements';
import { SetWorkOrder, AddNewWorkOrder, ResetWorkOrder, ServicesValidation } from 'store/actions/workorders';
import { refinedManagementsSelector } from 'store/selectors/managements';
import { getUserFromOrder, getBoatFromOrder } from 'utils/order';
import { OrangeButton, GradientButton } from 'components/basic/Buttons'
import Modal from 'components/compound/Modal';
import {
  Image, JobTitleSection, JobSummarySection, CustomerInfoSection,
  LocationInfoSection, BoatInfoSection, AttachmentSection, NotesSection
} from './components';
import { dueTypes } from './components/JobSummarySection/components/SummaryEditView';

import PrintIcon from '../../../../../resources/job/print.png';

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
    this.state = {
      specialInstructions: get(props.order, 'attributes.specialInstructions') || '',
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
    if (due_type === 'data_time_range') {
      return (due_date && due_time_range) ? `${due_date} ${due_time_range}` : false;
    }

    return dueTypeLabel.label;
  }

  onSend = () => {
    this.props.ServicesValidation();
    const { workorder: {services, selectedTeamMembers, job_number} } = this.props;
    if (services.length === 0) {
      toastr.error('Error', "Please add at least one service!");
    } else if (selectedTeamMembers.length === 0) {
      toastr.error('Error', "Please add at least one team member!");
    } else if (!job_number) {
      toastr.error('Error', "Please input job title!");
    } else {
        const newServices = services.map(service => {
          return {
            name: service.service,
            scheduled_text: this.getScheduleText(service),
            notes: service.notes,
          }
        });
        if (filter(newServices, s => !s.name || !s.scheduled_text).length === 0) {
          this.props.AddNewWorkOrder({
            services: newServices,
            success: () => {
              toastr.success('Success', "Successfully added!");
              this.props.ResetWorkOrder();
              this.props.onClose();
            },
            error: (e) => {
              toastr.error('Error', e.message);
            }
          });
        }
      // }
    }
  };

  handlePrint = () => {
  };

  handleTeamMemberChange = (member, isDeleting = false) => {
    const { selectedTeamMembers } = this.props.workorder;

    let selected = selectedTeamMembers.slice(0);
    if (isDeleting) {
      selected = selected.filter(item => item.value !== member.value);
    } else {
      selected.push(member);
    }

    this.props.SetWorkOrder({ selectedTeamMembers: selected });
  };

  handleChangeNotes = specialInstructions => {
    this.setState({ specialInstructions });
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

  getOrderService = () => {
    const { order: { attributes: {specialInstructions}, lineItems } } = this.props;
    if (lineItems.length > 0) {
      // orderService = {
      //   name: get(lineItems[0], 'relationships.service')
      // }
      const { name, subtitle, description, secondary_description, cost, cost_type, delivery_fee, position } =  get(lineItems[0], 'relationships.service.attributes');
      return { name, subtitle, description, secondary_description, cost, cost_type, delivery_fee, position,
        scheduled_text: getWhenValue(lineItems[0]),
        notes: specialInstructions
      };
    }
  }

  render() {
    const { open, onClose, loading, services,
      workorder: {
        selectedTeamMembers,
        settings: {
          notes, customer_info, boat_info, location
        },
        file_attachments_attributes: attachments
      }
    } = this.props;
    const { specialInstructions } = this.state;

    const { boatInfo, customerInfo } = this.getOrderInfo();
    const action = [
      <OrangeButton onClick={this.onSend} key='modal_btn_save'>Send</OrangeButton>
    ];
    const headers = (
      <ModalHeader>
        <Title>{'Job #1234-1'}</Title>
        <Actions>
          <GradientButton onClick={this.handlePrint}>
            <Image className='print' src={PrintIcon} />
          </GradientButton>
          <OrangeButton style={{ marginLeft: 30 }} onClick={this.onSend} key='modal_btn_save'>Send</OrangeButton>
        </Actions>
      </ModalHeader>
    );
    return (
      <Modal
        customHeader={headers}
        loading={loading}
        actions={action}
        open={open}
        onClose={onClose}
        large
      >
        <JobTitleSection
          selected={selectedTeamMembers}
          onChange={this.handleTeamMemberChange}
        />
        <JobSummarySection
          orderService = {this.getOrderService()}
          services={services}
          workorder={this.props.workorder}
          SetWorkOrder={this.props.SetWorkOrder}
          servicesValidationCnt={this.props.servicesValidationCnt}
        />
        <NotesSection
          contentVisible={notes}
          notes={specialInstructions}
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
  servicesValidationCnt: state.workorders.servicesValidationCnt,
});

const mapDispatchToProps = {
  GetManagements,
  SetWorkOrder,
  AddNewWorkOrder,
  ResetWorkOrder,
  ServicesValidation
};

export default connect(mapStateToProps, mapDispatchToProps)(JobModal);
